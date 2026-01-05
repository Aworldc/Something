import { Reactive } from './reactivity.js'

/**
 * A value that may or may not be wrapped in a Reactive
 */
export type MaybeReactive<T> = T | Reactive<T>
