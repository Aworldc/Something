import {
    reactiveVariable,
    reactiveNumber,
    reactiveList,
    reactiveQueue,
    reactiveObject
} from './reactivity.js'

/**
 * Gets a random item from an Array.
 * @param {Array} array The array to get random items from.
 * @returns {*} A random item from the provided array.
 */
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * Gets a random number in a range.
 * @param {number} min The minimum number to generate.
 * @param {number} max The maximum number to generate.
 * @returns {number} A random number between min and max.
 */
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Gets a random string.
 * @param {number} length How long the string should be.
 * @returns A random alphanumeric string.
 */
function randomString(length) {
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
 * Generates a tag for use with tagged templates from a function.
 * @param {function} handler A function that takes a string and returns something else.
 * @returns Whatever the handler returns.
 */
function $tag(handler) {
    return (strings, ...values) => {
        return handler(String.raw(strings, ...values))
    }
}

/**
 * Creates a {@link reactiveVariable} object.
 * @param {*} initialValue The initial value.
 * @returns A {@link reactiveVariable} object.
 */
function _var(initialValue = null) {
    return new reactiveVariable(initialValue)
}

/**
 * Creates a {@link reactiveNumber} object.
 * @param {Number} initialValue The initial value.
 * @returns A {@link reactiveNumber} object.
 */
function _num(initialValue = 0) {
    return new reactiveNumber(initialValue)
}

/**
 * Creates a {@link reactiveList} object.
 * @param {Array<*>} initialValue The initial value.
 * @returns A {@link reactiveList} object.
 */
function _list(initialValue = []) {
    return new reactiveList(initialValue)
}

/**
 * Creates a {@link reactiveQueue} object.
 * @param {Array<*>} initialValue The initial value.
 * @returns A {@link reactiveQueue} object.
 */
function _queue(initialValue = []) {
    return new reactiveQueue(initialValue)
}

/**
 * Creates a {@link reactiveObject} object.
 * @param {*} initialValue The initial value.
 * @returns A {@link reactiveObject} object.
 */
function _object(initialValue = {}) {
    return new reactiveObject(initialValue)
}

/**
 * Adds some extra utilities to other types,
 * including Math.randomString, which is an alias for {@link randomString},
 * Math.randomBetween, Which is an alias for {@link randomBetween},
 * and Array.prototype.random,
 * which returns a random item of the array it's called on.
 */
function neutral_impurities() {
    Array.prototype.random = () => {
        return randomItem(this)
    }

    Math.randomString = randomString
    Math.randomBetween = randomBetween
}

export {
    randomItem,
    randomBetween,
    randomString,
    $tag,
    _var,
    _num,
    _list,
    _queue,
    _object,
    neutral_impurities
}
