export class Reactive {
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
