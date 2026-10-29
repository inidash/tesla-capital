<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
// use App\Http\Controllers\Admin\InvestorController;
use App\Http\Controllers\Admin\InvestmentController as AdminInvestorsController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\PlanController as AdminPlanController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\InvestmentController;
use App\Http\Controllers\Admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\PageController; 
use App\Http\Controllers\PlanController;
use App\Http\Controllers\Admin\InvestmentCategoryController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public marketing pages
|--------------------------------------------------------------------------
*/ 
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/contact', [ContactController::class, 'create'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

/*
|--------------------------------------------------------------------------
| Authenticated investor routes
|--------------------------------------------------------------------------
| Assumes the starter kit's auth scaffolding (login/register/etc.) is
| already wired up separately -- these just add the investment-platform
| specific pages behind the same 'auth' + 'verified' middleware.
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');

    // Route::get('/investments', [InvestmentController::class, 'index'])->name('investments.index');
    // Route::get('/investments/{investment}', [InvestmentController::class, 'show'])->name('investments.show');
    // Route::post('/investments', [InvestmentController::class, 'store'])->name('investments.store');

    Route::get('/investments', [InvestmentController::class, 'index'])->name('investments.index');
    Route::get('/investments/create', [InvestmentController::class, 'create'])->name('investments.create');
    Route::post('/investments', [InvestmentController::class, 'store'])->name('investments.store');
    Route::get('/investments/{investment}', [InvestmentController::class, 'show'])->name('investments.show');

    Route::get('/wallet/deposit', [DepositController::class, 'create'])->name('wallet.deposit');
    Route::post('/wallet/deposit', [DepositController::class, 'store'])->name('wallet.deposit.store');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');


    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');

    Route::get('/payments/{payment}', [PaymentController::class, 'show'])->name('payments.show');

});

/*
|--------------------------------------------------------------------------
| Admin routes
|--------------------------------------------------------------------------
| 'admin' middleware alias is registered in bootstrap/app.php, pointing
| to App\Http\Middleware\EnsureUserIsAdmin.
*/
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

   Route::prefix('users')->name('users.')->controller(AdminUserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{user}', 'show')->name('show');

        Route::patch('/{user}/toggle-admin')->name('toggle-admin');

        Route::delete('/{user}', 'destroy')->name('destroy');
    });

     Route::resource('plans', AdminPlanController::class)->except(['show']);

    
    Route::patch('investment-categories/{investmentCategory}/toggle-status',[InvestmentCategoryController::class, 'toggleStatus']
    )->name('investment-categories.toggle-status');
    
    Route::resource('investment-categories', InvestmentCategoryController::class);
    // Route::resource('plans',PlanController::class);

    Route::patch('plans/{plan}/toggle-status', [PlanController::class, 'toggleStatus'])->name('plans.toggle-status');

    // Route::get('/investors', [InvestorController::class, 'index'])->name('investors.index');
    // Route::get('/investors/{investor}', [InvestorController::class, 'show'])->name('investors.show');
    // Route::patch('/investors/{investor}/kyc', [InvestorController::class, 'updateKyc'])->name('investors.kyc');

    Route::get('/investments', [AdminInvestorsController::class, 'index'])->name('investments.index');

    Route::get('/investments/{investment}', [AdminInvestorsController::class, 'show'])->name('investments.show');
    Route::post('/investments/{investment}/cancel',[AdminInvestorsController::class, 'cancel'])->name('investments.cancel');
    Route::post('/investments/{investment}/mature',[AdminInvestorsController::class, 'mature'])->name('investments.mature');

    Route::get('/payments', [AdminPaymentController::class, 'index'])->name('payments.index');
    Route::patch('/payments/{payment}/approve', [AdminPaymentController::class, 'approve'])->name('payments.approve');
    Route::post('/payments/{payment}/disburse', [AdminPaymentController::class, 'disburse'])->name('payments.disburse');
    Route::post('/payments/disburse-all', [AdminPaymentController::class, 'disburseAllApproved'])->name('payments.disburse-all');

    Route::get('/transactions', [AdminTransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/{transaction}', [AdminTransactionController::class, 'show'])->name('transactions.show');
});


require __DIR__.'/settings.php';