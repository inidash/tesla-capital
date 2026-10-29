import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/investors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvestorController::index
 * @see app/Http/Controllers/Admin/InvestorController.php:15
 * @route '/admin/investors'
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
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
export const show = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/investors/{investor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
show.url = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { investor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { investor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    investor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        investor: typeof args.investor === 'object'
                ? args.investor.id
                : args.investor,
                }

    return show.definition.url
            .replace('{investor}', parsedArgs.investor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
show.get = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
show.head = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
    const showForm = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
        showForm.get = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\InvestorController::show
 * @see app/Http/Controllers/Admin/InvestorController.php:33
 * @route '/admin/investors/{investor}'
 */
        showForm.head = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\InvestorController::updateKyc
 * @see app/Http/Controllers/Admin/InvestorController.php:44
 * @route '/admin/investors/{investor}/kyc'
 */
export const updateKyc = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateKyc.url(args, options),
    method: 'patch',
})

updateKyc.definition = {
    methods: ["patch"],
    url: '/admin/investors/{investor}/kyc',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\InvestorController::updateKyc
 * @see app/Http/Controllers/Admin/InvestorController.php:44
 * @route '/admin/investors/{investor}/kyc'
 */
updateKyc.url = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { investor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { investor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    investor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        investor: typeof args.investor === 'object'
                ? args.investor.id
                : args.investor,
                }

    return updateKyc.definition.url
            .replace('{investor}', parsedArgs.investor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\InvestorController::updateKyc
 * @see app/Http/Controllers/Admin/InvestorController.php:44
 * @route '/admin/investors/{investor}/kyc'
 */
updateKyc.patch = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateKyc.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\InvestorController::updateKyc
 * @see app/Http/Controllers/Admin/InvestorController.php:44
 * @route '/admin/investors/{investor}/kyc'
 */
    const updateKycForm = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateKyc.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\InvestorController::updateKyc
 * @see app/Http/Controllers/Admin/InvestorController.php:44
 * @route '/admin/investors/{investor}/kyc'
 */
        updateKycForm.patch = (args: { investor: number | { id: number } } | [investor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateKyc.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateKyc.form = updateKycForm
const InvestorController = { index, show, updateKyc }

export default InvestorController