import { MaybeReactive, Reactive, ReactiveSubscription } from './reactivity.js'

/**
 * Gets a random item from an Array.
 * @typeparam T The type the array holds.
 * @param array The array to get random items from.
 * @returns A random item from the provided array.
 */
export function get_random_item<T>(array: Array<T>): T {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * Gets a random number in a range.
 * @param min The minimum number to generate.
 * @param max The maximum number to generate.
 * @returns A random number between min and max.
 */
export function get_random_between(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Gets a random string.
 * @param length How long the string should be.
 * @returns A random alphanumeric string.
 */
export function get_random_string(length: number): string {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}

/**
 * Creates a new {@link Reactive} if the provided one isn't already one.
 * @param initial_value The initial value to set it to.
 * @returns A new reactive wrapping the provided value, or the provided value if it is a {@link Reactive}.
 */
export let Variable = <T>(initial_value: T): Reactive<T> =>
    initial_value instanceof Reactive
        ? initial_value
        : new Reactive(initial_value)

/**
 * Subscribe to changes to a value that may or may not be a {@link Reactive}.
 * @param maybe_reactive A value that may or may not be a {@link Reactive}.
 * @param handler Called when first subscribing to the value, and if the value is reactive, when it is changed.
 */
export let subscribe = <T>(
    maybe_reactive: MaybeReactive<T>,
    handler: ReactiveSubscription<T>
): any =>
    maybe_reactive instanceof Reactive
        ? maybe_reactive.subscribe(handler)
        : handler(maybe_reactive, maybe_reactive)

/**
 * Determines whether a value is a {@link Reactive} or not.
 * @param maybe_reactive Something that may or may not be a {@link Reactive}.
 * @returns Whether the argument is a {@link Reactive} or not.
 */
export let is_reactive = <T>(
    maybe_reactive: MaybeReactive<T>
): maybe_reactive is Reactive<T> => maybe_reactive instanceof Reactive

/**
 * Does absolutely nothing.
 *
 * Name short for "No operation".
 */
export let noop = (): void => {}
