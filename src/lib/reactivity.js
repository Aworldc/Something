import { noop } from './util.js'

export class Reactive {
    #value
    #listeners
    #formatter

    constructor(default_value, formatter = noop) {
        this.#value = default_value
        this.#listeners = []
        this.#formatter = formatter
    }

    get value() {
        if (this.#formatter != noop) {
            return this.#formatter(this.#value)
        } else {
            return this.#value
        }
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

    as(formatter) {
        let new_thing = new Reactive(this.value, formatter)

        this.subscribe(new_value => (new_thing.value = new_value))

        return new_thing
    }
}
