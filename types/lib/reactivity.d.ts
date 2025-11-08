export type ReactiveFormatter<T, O> = (current_value: T) => O
export type ReactiveSubscription<T> = (old_value: T, new_value: T) => void

export class Reactive<T> {
    set value(new_value: T)
    get value(): T
    subscribe(handler: ReactiveSubscription<T>): void
    update(updater: (this: this) => void): void
    as<O>(formatter: ReactiveFormatter<T, O>): Reactive<O>
}
