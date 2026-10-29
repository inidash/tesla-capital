<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreWithdrawalRequest;
use App\Models\Transaction;
use App\Services\WalletService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class WithdrawalController extends Controller
{
    public function __construct(
        protected WalletService $walletService
    ) {
    }

    public function index(Request $request): Response 
    { 
        $user = $request->user(); $query = Transaction::query() 
        ->where('user_id', $user->id) 
        ->where('type', 'withdrawal'); 
        // Filter by status. 
        if ($request->filled('status')) { 
            $query->where('status', $request->input('status')); 
        } 
        // Search by withdrawal reference or description.
         if ($request->filled('search')) { 
            $search = trim($request->input('search')); 
            $query->where(function ($q) use ($search) { 
                $q->where('reference', 'like', "%{$search}%") 
                ->orWhere('description', 'like', "%{$search}%") 
                ->orWhere( 'gateway_reference', 'like', "%{$search}%" ); }); 
        } 
        $withdrawals = $query ->latest('created_at') 
        ->paginate(15) ->withQueryString(); 
        return Inertia::render('Withdrawals/Index', [ 
            'withdrawals' => $withdrawals, 
            'filters' => [ 'status' => $request->input('status'), 'search' => $request->input('search'), ], 
            'balance' => $user->wallet?->available_balance ?? 0, 
            'currency' => $user->wallet?->currency ?? 'USD', 
            ]); 
        }
    /**
     * Show the withdrawal form.
     */
    public function create(Request $request): Response
    {
        $user = $request->user();

        $wallet = $user->wallet;

        $recentWithdrawals = Transaction::query()
            ->where('user_id', $user->id)
            ->where('type', 'withdrawal')
            ->latest()
            ->limit(5)
            ->get([
                'id',
                'reference',
                'amount',
                'currency',
                'status',
                'description',
                'processed_at',
                'created_at',
            ]);

        return Inertia::render('Withdrawals/Create', [
            'balance' => $wallet?->available_balance ?? 0,
            'currency' => $wallet?->currency ?? 'USD',
            'recentWithdrawals' => $recentWithdrawals,
        ]);
    }

    /**
     * Submit a withdrawal request.
     */
   public function store(
    StoreWithdrawalRequest $request
): RedirectResponse {
    $user = $request->user();

    $amount = round(
        (float) $request->validated('amount'),
        2
    );

    try {
        $transaction = $this->walletService->requestWithdrawal(
            $user,
            $amount,
            [
                'currency' => $user->wallet?->currency ?? 'USD',
                'description' => 'Withdrawal request',
                'gateway_meta' => [
                    'method' => $request->validated('method'),
                    'account_name' => $request->validated('account_name'),
                    'account_number' => $request->validated('account_number'),
                    'bank_name' => $request->validated('bank_name'),
                ],
            ]
        );
    } catch (RuntimeException $exception) {
        return back()
            ->withInput()
            ->withErrors([
                'amount' => $exception->getMessage(),
            ]);
    }

    return redirect()
        ->route('transactions.show', $transaction)
        ->with(
            'success',
            'Your withdrawal request has been submitted successfully.'
        );
}
}
