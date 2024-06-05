class reactiveVariable {
    constructor(initialValue = '') {
        this._value = initialValue
        this._subscribers = []
    }

    get() {
        return this._value
    }

    set(newValue) {
        let oldValue = this._value
        this._value = newValue

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    notify() {
        this._subscribers.forEach(subscriber => {
            subscriber(this._value, this._value)
        })
    }
}

class reactiveNumber {
    constructor(initialValue = 0) {
        this._value = initialValue
        this._subscribers = []
    }

    get() {
        return this._value
    }

    set(newValue) {
        let oldValue = this._value
        this._value = newValue

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    increment(amount = 1) {
        let oldValue = this._value
        this._value = this._value + amount
        let newValue = this._value

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    decrement(amount = 1) {
        let oldValue = this._value
        this._value = this._value - amount
        let newValue = this._value

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    notify() {
        this._subscribers.forEach(subscriber => {
            subscriber(this._value, this._value)
        })
    }
}

class reactiveList {
    constructor(initialValue = []) {
        this._value = initialValue
        this._subscribers = []
    }

    get() {
        return this._value
    }

    set(newValue) {
        let oldValue = this._value
        this._value = newValue

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    push(item) {
        let oldValue = this._value
        this._value.push(item)
        let newValue = this._value

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    notify() {
        this._subscribers.forEach(subscriber => {
            subscriber(this._value, this._value)
        })
    }
}

class reactiveQueue {
    constructor(initialValue = []) {
        this._value = initialValue
        this._subscribers = []
    }

    get() {
        return this._value
    }

    getNext() {
        let oldValue = this._value
        let val = this._value[0]
        this._value.splice(0, 1)
        let newValue = this._value

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })

        return val
    }

    set(newValue) {
        let oldValue = this._value
        this._value = newValue

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    push(item) {
        let oldValue = this._value
        this._value.push(item)
        let newValue = this._value

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    notify() {
        this._subscribers.forEach(subscriber => {
            subscriber(this._value, this._value)
        })
    }
}

class reactiveObject {
    constructor(initialValue = {}) {
        this._value = initialValue
        this._subscribers = []
    }

    get() {
        return this._value
    }

    getKey(key) {
        return this._value[key]
    }

    set(newValue) {
        let oldValue = this._value
        this._value = newValue

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    setKey(key, value) {
        let oldValue = this._value
        this._value[key] = value
        let newValue = this._value

        this._subscribers.forEach(subscriber => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    notify() {
        this._subscribers.forEach(subscriber => {
            subscriber(this._value, this._value)
        })
    }
}

export {
    reactiveVariable,
    reactiveNumber,
    reactiveList,
    reactiveQueue,
    reactiveObject
}
