export type ReactiveFormatter<T, O> = (current_value: T) => O
export type ReactiveSubscription<T> = (old_value: T, new_value: T) => void

/**
 * A value that may or may not be wrapped in a Reactive
 */
export type MaybeReactive<T> = T | Reactive<T>

export class Reactive<T> {
    #value: T
    #listeners: Array<ReactiveSubscription<T>>
    #formatter?: ReactiveFormatter<any, T> | null

    constructor(
        default_value: T,
        formatter: ReactiveFormatter<any, T> | null = null
    ) {
        this.#value = default_value
        this.#listeners = []
        this.#formatter = formatter
    }

    /**
     * Gets the current value of the reactive
     * @returns the current value of this reactive, possibly processed through a formatter.
     */
    get value(): T {
        return this.#formatter != null
            ? this.#formatter(this.#value)
            : this.#value
    }

    /**
     * Sets the value and calls handlers.
     * @param new_value the new value to set this reactive to.
     */
    set value(new_value: T) {
        let old_value = this.value
        this.#value = new_value
        this.#listeners.forEach(listener => listener(this.value, old_value))
    }

    /**
     * Subscribe to updates to this reactive.
     * @param handler Called immediately on subscription, then called whenever the value is changed.
     */
    subscribe(handler: ReactiveSubscription<T>): void {
        this.#listeners.push(handler)
        handler(this.value, this.value)
    }

    /**
     * Calls the function provided, then calls all subscriptions.
     *
     * Intended for modifying the value using methods that don't return the new value, such as `Array.push()`.
     * @param updater A callback that may mutate the value.
     */
    update(updater: (self: this) => void): void {
        let old_value = this.value
        updater(this)
        this.#listeners.forEach(listener => listener(this.value, old_value))
    }

    /**
     * Creates a new reactive that follows the value of this one, but has it's value modified by a function.
     * @param formatter A function that formats the value of the reactive
     * @returns A new reactive that follows changes to this one, but returns values formatted by the provided function.
     */
    as<O>(formatter: ReactiveFormatter<T, O>): Reactive<O> {
        // @ts-ignore the internal value will be the wrong type but the formatter will publicly return the correct value
        let new_thing = new Reactive<O>(this.value, formatter)

        // @ts-ignore the internal value will be the wrong type but the formatter will publicly return the correct value
        this.subscribe(new_value => (new_thing.value = new_value))

        return new_thing
    }
}
