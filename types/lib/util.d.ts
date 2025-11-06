import { Reactive, ReactiveSubscription } from './reactivity.js'

/**
 * Gets a random item from an Array.
 * @typeparam T The type the array holds
 * @param {Array<T>} array The array to get random items from.
 * @returns {*} A random item from the provided array.
 */
export function get_random_item<T>(array: Array<T>): T

/**
 * Gets a random number in a range.
 * @param {number} min The minimum number to generate.
 * @param {number} max The maximum number to generate.
 * @returns {number} A random number between min and max.
 */
export function get_random_between(min: number, max: number): number

/**
 * Gets a random string.
 * @param {number} length How long the string should be.
 * @returns A random alphanumeric string.
 */
export function get_random_string(length: number): string

/**
 * Generates a tag for use with tagged templates from a function.
 * @param {function} handler A function that takes a string and returns something else.
 * @returns Whatever the handler returns.
 */
export function Tag(handler: Function): (strings: any, ...values: Array<any>) => any

export function Variable<T>(initial_value: T): Reactive<T>
export function subscribe<T>(maybe_reactive: T | Reactive<T>, handler: ReactiveSubscription<T>): any
export function is_reactive<T>(maybe_reactive: T | Reactive<T>): maybe_reactive is Reactive<T>

/**
 * Does f**k all.
 *
 * Name short for "No operation".
 */
export function noop(): void
