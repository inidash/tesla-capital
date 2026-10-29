import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/wallet/deposit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DepositController::create
 * @see app/Http/Controllers/DepositController.php:21
 * @route '/wallet/deposit'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\DepositController::store
 * @see app/Http/Controllers/DepositController.php:29
 * @route '/wallet/deposit'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/wallet/deposit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DepositController::store
 * @see app/Http/Controllers/DepositController.php:29
 * @route '/wallet/deposit'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DepositController::store
 * @see app/Http/Controllers/DepositController.php:29
 * @route '/wallet/deposit'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DepositController::store
 * @see app/Http/Controllers/DepositController.php:29
 * @route '/wallet/deposit'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DepositController::store
 * @see app/Http/Controllers/DepositController.php:29
 * @route '/wallet/deposit'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const DepositController = { create, store }

export default DepositController