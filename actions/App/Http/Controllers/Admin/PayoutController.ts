import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/payouts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\PayoutController::index
 * @see app/Http/Controllers/Admin/PayoutController.php:16
 * @route '/admin/payouts'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\PayoutController::approve
 * @see app/Http/Controllers/Admin/PayoutController.php:36
 * @route '/admin/payouts/{payout}/approve'
 */
export const approve = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

approve.definition = {
    methods: ["patch"],
    url: '/admin/payouts/{payout}/approve',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\PayoutController::approve
 * @see app/Http/Controllers/Admin/PayoutController.php:36
 * @route '/admin/payouts/{payout}/approve'
 */
approve.url = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payout: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    payout: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payout: args.payout,
                }

    return approve.definition.url
            .replace('{payout}', parsedArgs.payout.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayoutController::approve
 * @see app/Http/Controllers/Admin/PayoutController.php:36
 * @route '/admin/payouts/{payout}/approve'
 */
approve.patch = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: approve.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\PayoutController::approve
 * @see app/Http/Controllers/Admin/PayoutController.php:36
 * @route '/admin/payouts/{payout}/approve'
 */
    const approveForm = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approve.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PayoutController::approve
 * @see app/Http/Controllers/Admin/PayoutController.php:36
 * @route '/admin/payouts/{payout}/approve'
 */
        approveForm.patch = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approve.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    approve.form = approveForm
/**
* @see \App\Http\Controllers\Admin\PayoutController::disburse
 * @see app/Http/Controllers/Admin/PayoutController.php:47
 * @route '/admin/payouts/{payout}/disburse'
 */
export const disburse = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburse.url(args, options),
    method: 'post',
})

disburse.definition = {
    methods: ["post"],
    url: '/admin/payouts/{payout}/disburse',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayoutController::disburse
 * @see app/Http/Controllers/Admin/PayoutController.php:47
 * @route '/admin/payouts/{payout}/disburse'
 */
disburse.url = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payout: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    payout: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payout: args.payout,
                }

    return disburse.definition.url
            .replace('{payout}', parsedArgs.payout.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayoutController::disburse
 * @see app/Http/Controllers/Admin/PayoutController.php:47
 * @route '/admin/payouts/{payout}/disburse'
 */
disburse.post = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburse.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PayoutController::disburse
 * @see app/Http/Controllers/Admin/PayoutController.php:47
 * @route '/admin/payouts/{payout}/disburse'
 */
    const disburseForm = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disburse.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PayoutController::disburse
 * @see app/Http/Controllers/Admin/PayoutController.php:47
 * @route '/admin/payouts/{payout}/disburse'
 */
        disburseForm.post = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disburse.url(args, options),
            method: 'post',
        })
    
    disburse.form = disburseForm
/**
* @see \App\Http\Controllers\Admin\PayoutController::disburseAllApproved
 * @see app/Http/Controllers/Admin/PayoutController.php:58
 * @route '/admin/payouts/disburse-all'
 */
export const disburseAllApproved = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburseAllApproved.url(options),
    method: 'post',
})

disburseAllApproved.definition = {
    methods: ["post"],
    url: '/admin/payouts/disburse-all',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PayoutController::disburseAllApproved
 * @see app/Http/Controllers/Admin/PayoutController.php:58
 * @route '/admin/payouts/disburse-all'
 */
disburseAllApproved.url = (options?: RouteQueryOptions) => {
    return disburseAllApproved.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PayoutController::disburseAllApproved
 * @see app/Http/Controllers/Admin/PayoutController.php:58
 * @route '/admin/payouts/disburse-all'
 */
disburseAllApproved.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: disburseAllApproved.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\PayoutController::disburseAllApproved
 * @see app/Http/Controllers/Admin/PayoutController.php:58
 * @route '/admin/payouts/disburse-all'
 */
    const disburseAllApprovedForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disburseAllApproved.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\PayoutController::disburseAllApproved
 * @see app/Http/Controllers/Admin/PayoutController.php:58
 * @route '/admin/payouts/disburse-all'
 */
        disburseAllApprovedForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disburseAllApproved.url(options),
            method: 'post',
        })
    
    disburseAllApproved.form = disburseAllApprovedForm
const PayoutController = { index, approve, disburse, disburseAllApproved }

export default PayoutController