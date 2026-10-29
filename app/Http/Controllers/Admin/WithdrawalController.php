<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Services\WalletService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class WithdrawalController extends Controller
{
    public function __construct(
        protected WalletService $walletService
    ) {
    }

    /**
     * Display all withdrawal requests.
     */
    public function index(Request $request): Response
    {
        $withdrawals = Transaction::query()
            ->with('user')
            ->where('type', 'withdrawal')

            ->when(
                $request->filled('status'),
                fn ($query) =>
                    $query->where(
                        'status',
                        $request->input('status')
                    )
            )

            ->when(
                $request->filled('search'),
                function ($query) use ($request) {
                    $search = trim(
                        $request->input('search')
                    );

                    $query->where(function ($q) use ($search) {
                        $q->where(
                            'reference',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'description',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhere(
                            'gateway_reference',
                            'like',
                            "%{$search}%"
                        )
                        ->orWhereHas(
                            'user',
                            function ($userQuery) use ($search) {
                                $userQuery
                                    ->where(
                                        'name',
                                        'like',
                                        "%{$search}%"
                                    )
                                    ->orWhere(
                                        'email',
                                        'like',
                                        "%{$search}%"
                                    );
                            }
                        );
                    });
                }
            )

            ->latest('created_at')
            ->paginate(15)
            ->withQueryString();

        $pendingCount = Transaction::query()
            ->where('type', 'withdrawal')
            ->where('status', 'pending')
            ->count();

        $pendingAmount = Transaction::query()
            ->where('type', 'withdrawal')
            ->where('status', 'pending')
            ->sum('amount');

        $successfulAmount = Transaction::query()
            ->where('type', 'withdrawal')
            ->where('status', 'successful')
            ->sum('amount');

        return Inertia::render('Admin/Withdrawals/Index', [
            'withdrawals' => $withdrawals,

            'filters' => [
                'status' => $request->input('status'),
                'search' => $request->input('search'),
            ],

            'statistics' => [
                'pending_count' => $pendingCount,
                'pending_amount' => $pendingAmount,
                'successful_amount' => $successfulAmount,
            ],
        ]);
    }

    /**
     * Display a withdrawal request.
     */
    public function show(
        Request $request,
        Transaction $transaction
    ): Response {
        abort_unless(
            $transaction->type === 'withdrawal',
            404
        );

        $transaction->load('user');

        return Inertia::render(
            'Admin/Withdrawals/Show',
            [
                'transaction' => $transaction,
            ]
        );
    }

    /**
     * Approve/complete a withdrawal.
     */
    public function approve(
        Request $request,
        Transaction $transaction
    ) {
        abort_unless(
            $transaction->type === 'withdrawal',
            404
        );

        try {
            $this->walletService->completeWithdrawal(
                $transaction
            );

            return back()->with(
                'success',
                'Withdrawal has been approved and marked as successful.'
            );

        } catch (RuntimeException $e) {
            return back()->withErrors([
                'withdrawal' => $e->getMessage(),
            ]);

        } catch (\Throwable $e) {
            Log::error(
                'Admin withdrawal approval failed.',
                [
                    'transaction_id' => $transaction->id,
                    'admin_id' => $request->user()->id,
                    'error' => $e->getMessage(),
                ]
            );

            return back()->withErrors([
                'withdrawal' =>
                    'Unable to approve this withdrawal at this time.',
            ]);
        }
    }

    /**
     * Reject/fail a withdrawal.
     */
    public function reject(
        Request $request,
        Transaction $transaction
    ) {
        abort_unless(
            $transaction->type === 'withdrawal',
            404
        );

        try {
            $this->walletService->failWithdrawal(
                $transaction
            );

            return back()->with(
                'success',
                'Withdrawal has been rejected and the reserved funds have been returned to the user.'
            );

        } catch (RuntimeException $e) {
            return back()->withErrors([
                'withdrawal' => $e->getMessage(),
            ]);

        } catch (\Throwable $e) {
            Log::error(
                'Admin withdrawal rejection failed.',
                [
                    'transaction_id' => $transaction->id,
                    'admin_id' => $request->user()->id,
                    'error' => $e->getMessage(),
                ]
            );

            return back()->withErrors([
                'withdrawal' =>
                    'Unable to reject this withdrawal at this time.',
            ]);
        }
    }
}
