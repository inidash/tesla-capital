<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\InvestmentController as AdminInvestmentsController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\PlanController as AdminPlanController;
use App\Http\Controllers\Admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\ProfitController as AdminProfitController;
use App\Http\Controllers\Admin\WithdrawalController as AdminWithdrawalController;
use App\Http\Controllers\Admin\DepositController as AdminDepositController;
use App\Http\Controllers\Admin\InvestmentCategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\InvestmentController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WithdrawalController;
use App\Http\Controllers\ProfitController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public marketing pages
|--------------------------------------------------------------------------
*/

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');

Route::get('/contact', [ContactController::class, 'create'])
    ->name('contact');

Route::post('/contact', [ContactController::class, 'store'])
    ->name('contact.store');


/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
|
| /dashboard is the main authenticated entry point.
|
| Investor:
|   /dashboard
|
| Admin:
|   /dashboard -> redirects to /admin
|
*/

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');


    /*
    |--------------------------------------------------------------------------
    | Investor routes
    |--------------------------------------------------------------------------
    */

    Route::get('/plans', [PlanController::class, 'index'])
        ->name('plans.index');

    /*
    |--------------------------------------------------------------------------
    | Investments
    |--------------------------------------------------------------------------
    */

    Route::get('/investments', [InvestmentController::class, 'index'])
        ->name('investments.index');

    Route::get('/investments/create', [InvestmentController::class, 'create'])
        ->name('investments.create');

    Route::post('/investments', [InvestmentController::class, 'store'])
        ->name('investments.store');

    Route::get('/investments/{investment}', [InvestmentController::class, 'show'])
        ->name('investments.show');


    /*
    |--------------------------------------------------------------------------
    | Wallet / Deposits
    |--------------------------------------------------------------------------
    */

    Route::get('/wallet/deposit', [DepositController::class, 'create'])
        ->name('wallet.deposit');

    Route::post('/wallet/deposit', [DepositController::class, 'store'])
        ->name('wallet.deposit.store');


    /*
    |--------------------------------------------------------------------------
    | Transactions
    |--------------------------------------------------------------------------
    */

    Route::get('/transactions', [TransactionController::class, 'index'])
        ->name('transactions.index');

    Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])
        ->name('transactions.show');


    /*
    |--------------------------------------------------------------------------
    | ROI Payments
    |--------------------------------------------------------------------------
    */

    Route::get('/payments', [PaymentController::class, 'index'])
        ->name('payments.index');

    Route::get('/payments/{payment}', [PaymentController::class, 'show'])
        ->name('payments.show');

     /*
    |--------------------------------------------------------------------------
    | Withdrawals
    |--------------------------------------------------------------------------
    */

    Route::get('/wallet/withdraw', [WithdrawalController::class, 'create'])
    ->name('wallet.withdraw');

    Route::post('/wallet/withdraw', [WithdrawalController::class, 'store'])
    ->name('wallet.withdraw.store');

    Route::get('/wallet/withdrawals', [WithdrawalController::class, 'index'])
    ->name('wallet.withdrawals.index');

    Route::get('/wallet/withdrawals/{transaction}', [WithdrawalController::class, 'show'])
    ->name('wallet.withdrawals.show');

     /*
    |--------------------------------------------------------------------------
    | Profits
    |--------------------------------------------------------------------------
    */
     Route::get('/profits', [ProfitController::class, 'index'])->name('profits.index');
});


/*
|--------------------------------------------------------------------------
| Admin routes
|--------------------------------------------------------------------------
|
| All routes in this group require:
|
| 1. Authentication
| 2. Email verification
| 3. Admin privileges
|
| The 'admin' middleware alias is registered in bootstrap/app.php
| and points to App\Http\Middleware\EnsureUserIsAdmin.
|
| Admin dashboard:
|
|   /admin
|
*/

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Admin Dashboard
        |--------------------------------------------------------------------------
        */

        Route::get('/', [AdminDashboardController::class, 'index'])
            ->name('dashboard');


        /*
        |--------------------------------------------------------------------------
        | Admin Users
        |--------------------------------------------------------------------------
        */

        Route::prefix('users')
            ->name('users.')
            ->controller(AdminUserController::class)
            ->group(function () {

                Route::get('/', 'index')
                    ->name('index');

                Route::get('/{user}', 'show')
                    ->name('show');

                Route::patch('/{user}/toggle-admin', 'toggleAdmin')
                    ->name('toggle-admin');

                Route::delete('/{user}', 'destroy')
                    ->name('destroy');
            });

            

        /*
        |--------------------------------------------------------------------------
        | Admin Investment Plans
        |--------------------------------------------------------------------------
        */

        Route::resource('plans', AdminPlanController::class)
            ->except(['show']);

        Route::patch(
            'plans/{plan}/toggle-status',
            [AdminPlanController::class, 'toggleStatus']
        )->name('plans.toggle-status');



        /*
        |--------------------------------------------------------------------------
        | Admin Deposit
        |--------------------------------------------------------------------------
        */
        Route::get('/deposits', [ AdminDepositController::class, 'index',])->name('deposits.index');

        Route::get('/deposits/{deposit}', [ AdminDepositController::class,'show',])->name('deposits.show');

        Route::patch('/deposits/{deposit}/confirm', [
            AdminDepositController::class,
            'confirm',
        ])->name('deposits.confirm');

        Route::patch('/deposits/{deposit}/reject', [
            AdminDepositController::class,
            'reject',
        ])->name('deposits.reject');


        /*
        |--------------------------------------------------------------------------
        | Admin Investment Categories
        |--------------------------------------------------------------------------
        */

        Route::patch(
            'investment-categories/{investmentCategory}/toggle-status',
            [InvestmentCategoryController::class, 'toggleStatus']
        )->name('investment-categories.toggle-status');

        Route::resource(
            'investment-categories',
            InvestmentCategoryController::class
        );


        /*
        |--------------------------------------------------------------------------
        | Admin Investments
        |--------------------------------------------------------------------------
        */

        Route::get('/investments', [AdminInvestmentsController::class, 'index'])
            ->name('investments.index');

        Route::get(
            '/investments/{investment}',
            [AdminInvestmentsController::class, 'show']
        )->name('investments.show');

        Route::post(
            '/investments/{investment}/cancel',
            [AdminInvestmentsController::class, 'cancel']
        )->name('investments.cancel');

        Route::post(
            '/investments/{investment}/mature',
            [AdminInvestmentsController::class, 'mature']
        )->name('investments.mature');


        /*
        |--------------------------------------------------------------------------
        | Admin ROI Payments / Payouts
        |--------------------------------------------------------------------------
        */

        Route::get('/payments', [AdminPaymentController::class, 'index'])
            ->name('payments.index');

        Route::patch(
            '/payments/{payment}/approve',
            [AdminPaymentController::class, 'approve']
        )->name('payments.approve');

        Route::post(
            '/payments/{payment}/disburse',
            [AdminPaymentController::class, 'disburse']
        )->name('payments.disburse');

        Route::post(
            '/payments/disburse-all',
            [AdminPaymentController::class, 'disburseAllApproved']
        )->name('payments.disburse-all');


        /*
        |--------------------------------------------------------------------------
        | Admin Transactions
        |--------------------------------------------------------------------------
        */

        Route::get(
            '/transactions',
            [AdminTransactionController::class, 'index']
        )->name('transactions.index');

        Route::get(
            '/transactions/{transaction}',
            [AdminTransactionController::class, 'show']
        )->name('transactions.show');

        /*
        |--------------------------------------------------------------------------
        | Admin Profit
        |--------------------------------------------------------------------------
        */

        Route::get('/profits', [AdminProfitController::class, 'index'])
            ->name('profits.index');

        Route::get('/profits/create', [AdminProfitController::class, 'create'])
            ->name('profits.create');

        Route::get('/profits/{profit}', [AdminProfitController::class, 'show'])
            ->name('profits.show');

        Route::get('/profits/{profit}/edit', [AdminProfitController::class, 'edit'])
            ->name('profits.edit');

        Route::post('/profits', [AdminProfitController::class, 'store'])
            ->name('profits.store');

        Route::put('/profits/{profit}', [AdminProfitController::class, 'update'])
            ->name('profits.update');

        Route::delete('/profits/{profit}', [AdminProfitController::class, 'destroy'])
            ->name('profits.destroy');

        Route::get('/users/{user}/investments', [
            AdminProfitController::class,
            'investments',
        ])->name('users.investments');



        




        Route::get('/withdrawals', [AdminWithdrawalController::class, 'index'])
            ->name('withdrawals.index');

        Route::get('/withdrawals/{transaction}', [AdminWithdrawalController::class, 'show'])
            ->name('withdrawals.show');

        Route::post('/withdrawals/{transaction}/approve', [AdminWithdrawalController::class, 'approve'])
            ->name('withdrawals.approve');

        Route::post('/withdrawals/{transaction}/reject', [AdminWithdrawalController::class, 'reject'])
            ->name('withdrawals.reject');

    });


require __DIR__ . '/settings.php';