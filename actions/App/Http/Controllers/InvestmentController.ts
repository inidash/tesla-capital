import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/investments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InvestmentController::index
 * @see app/Http/Controllers/InvestmentController.php:13
 * @route '/investments'
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
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
export const show = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/investments/{investment}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
show.url = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { investment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { investment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    investment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        investment: typeof args.investment === 'object'
                ? args.investment.id
                : args.investment,
                }

    return show.definition.url
            .replace('{investment}', parsedArgs.investment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
show.get = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
show.head = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
    const showForm = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
        showForm.get = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InvestmentController::show
 * @see app/Http/Controllers/InvestmentController.php:37
 * @route '/investments/{investment}'
 */
        showForm.head = (args: { investment: number | { id: number } } | [investment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\InvestmentController::store
 * @see app/Http/Controllers/InvestmentController.php:29
 * @route '/investments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/investments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvestmentController::store
 * @see app/Http/Controllers/InvestmentController.php:29
 * @route '/investments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvestmentController::store
 * @see app/Http/Controllers/InvestmentController.php:29
 * @route '/investments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InvestmentController::store
 * @see app/Http/Controllers/InvestmentController.php:29
 * @route '/investments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InvestmentController::store
 * @see app/Http/Controllers/InvestmentController.php:29
 * @route '/investments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const InvestmentController = { index, show, store }

export default InvestmentController