/**
 * Gets a random item from an Array.
 * @param {Array} array The array to get random items from.
 * @returns {*} A random item from the provided array.
 */
export function get_random_item(array) {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * Gets a random number in a range.
 * @param {number} min The minimum number to generate.
 * @param {number} max The maximum number to generate.
 * @returns {number} A random number between min and max.
 */
export function get_random_between(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Gets a random string.
 * @param {number} length How long the string should be.
 * @returns A random alphanumeric string.
 */
export function get_random_string(length) {
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

export let Var = initial_value => new Reactive(initial_value)

export let subscribe = (maybe_reactive, handler) =>
    maybe_reactive instanceof Reactive
        ? maybe_reactive.subscribe(handler)
        : handler(maybe_reactive, maybe_reactive)

/**
 * Generates a tag for use with tagged templates from a function.
 * @param {function} handler A function that takes a string and returns something else.
 * @returns Whatever the handler returns.
 */
export function Tag(handler) {
    return (strings, ...values) => {
        return handler(String.raw(strings, ...values))
    }
}
