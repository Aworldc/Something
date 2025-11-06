export type ReactiveFormatter<T> = (current_value: T) => any
export type ReactiveSubscription<T> = (old_value: T, new_value: T) => void

export class Reactive<T> {
    constructor(default_value: T, formatter?: ReactiveFormatter<T>)
    set value(new_value: T)
    get value(): T
    subscribe(handler: ReactiveSubscription<T>): void
    update(updater: (this: this) => void): void
    as<O>(formatter: ReactiveFormatter<T>): Reactive<O>
}
