class Reactive {
    #value
    #listeners

    constructor(default_value) {
        this.#value = default_value
        this.#listeners = []
    }

    get value() {
        return this.#value
    }

    set value(new_value) {
        let old_value = this.value
        this.#value = new_value
        this.#listeners.forEach(listener => listener(this.value, old_value))
    }

    subscribe(handler) {
        this.#listeners.push(handler)
        handler(this.value, this.value)
    }

    update(updater) {
        let new_value = updater(this.value)
        this.value = new_value
    }
}

export let Variable = initial_value => new Reactive(initial_value)

export let subscribe = (maybe_reactive, handler) =>
    maybe_reactive instanceof Reactive
        ? maybe_reactive.subscribe(handler)
        : handler(maybe_reactive, maybe_reactive)
