import { Reactive } from './reactivity.js'

export function get_random_item(array) {
    return array[Math.floor(Math.random() * array.length)]
}

export function get_random_between(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function get_random_string(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return result
}

export let Variable = initial_value =>
    initial_value instanceof Reactive ? initial_value : new Reactive(initial_value)

export let subscribe = (maybe_reactive, handler) =>
    maybe_reactive instanceof Reactive
        ? maybe_reactive.subscribe(handler)
        : handler(maybe_reactive, maybe_reactive)

export let is_reactive = maybe_reactive => maybe_reactive instanceof Reactive

export let noop = () => {}

export function Tag(handler) {
    return (strings, ...values) => {
        return handler(String.raw(strings, ...values))
    }
}
