export type ReactiveFormatter<T, O> = (current_value: T) => O
export type ReactiveSubscription<T> = (old_value: T, new_value: T) => void

/**
 * A value which can be subscribed to.
 */
export class Reactive<T> {
    /**
     * Sets the value and calls handlers.
     * @param new_value the new value to set this reactive to.
     */
    set value(new_value: T)

    /**
     * Gets the current value of the reactive
     * @returns the current value of this reactive, possibly processed through a formatter.
     */
    get value(): T

    /**
     * Subscribe to updates to this reactive.
     * @param handler Called immediately on subscription, then called whenever the value is changed.
     */
    subscribe(handler: ReactiveSubscription<T>): void

    /**
     * Calls the function provided, then calls all subscriptions.
     *
     * Intended for modifying the value using methods that don't return the new value, such as `Array.push()`.
     * @param updater A callback that may mutate the value.
     */
    update(updater: (this: this) => void): void

    /**
     * Creates a new reactive that follows the value of this one, but has it's value modified by a function.
     * @param formatter A function that formats the value of the reactive
     * @returns A new reactive that follows changes to this one, but returns values formatted by the provided function.
     */
    as<O>(formatter: ReactiveFormatter<T, O>): Reactive<O>
}
