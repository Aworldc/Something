import {
    reactiveVariable,
    reactiveNumber,
    reactiveList,
    reactiveQueue,
    reactiveObject
} from './reactivity.js'

function stash(key, value) {
    _globalData[key] = value
}

function grab(key) {
    return _globalData[key]
}

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

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

function $tag(handler) {
    return (strings, ...values) => {
        return handler(String.raw(strings, ...values))
    }
}

function _var(initialValue = null) {
    return new reactiveVariable(initialValue)
}

function _num(initialValue = 0) {
    return new reactiveNumber(initialValue)
}

function _list(initialValue = []) {
    return new reactiveList(initialValue)
}

function _queue(initialValue = []) {
    return new reactiveQueue(initialValue)
}

function _object(initialValue = {}) {
    return new reactiveObject(initialValue)
}

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
    stash,
    grab,
    neutral_impurities
}
