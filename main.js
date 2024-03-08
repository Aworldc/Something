let _globalData = {}

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

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    notify() {
        this._subscribers.forEach((subscriber) => {
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

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    increment(amount = 1) {
        let oldValue = this._value
        this._value = this._value + amount
        let newValue = this._value

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    decrement(amount = 1) {
        let oldValue = this._value
        this._value = this._value - amount
        let newValue = this._value

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    notify() {
        this._subscribers.forEach((subscriber) => {
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

        this._subscribers.forEach((subscriber) => {
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

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    notify() {
        this._subscribers.forEach((subscriber) => {
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

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })

        return val
    }

    set(newValue) {
        let oldValue = this._value
        this._value = newValue

        this._subscribers.forEach((subscriber) => {
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

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    notify() {
        this._subscribers.forEach((subscriber) => {
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

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    setKey(key, value) {
        let oldValue = this._value
        this._value[key] = value
        let newValue = this._value

        this._subscribers.forEach((subscriber) => {
            subscriber(newValue, oldValue)
        })
    }

    subscribe(notificationHandler) {
        this._subscribers.push(notificationHandler)
    }

    notify() {
        this._subscribers.forEach((subscriber) => {
            subscriber(this._value, this._value)
        })
    }
}

class elementBuilder {
    constructor(type = 'div') {
        this._domEl = document.createElement(type)
    }

    text(content) {
        this._domEl.innerText = content
        return this
    }

    insert(element) {
        this._domEl.appendChild(element.toDom())
        return this
    }

    handle(type, handler) {
        this._domEl.addEventListener(type, (event) => {
            handler(type, this.get(), event)
        })
        return this
    }

    style(property, value) {
        this._domEl.style[property] = value
        return this
    }

    prop(property, value) {
        this._domEl.setAttribute(property, value)
        return this
    }

    val(property) {
        return this._domEl.getAttribute(property)
    }

    sub(variable, callback) {
        variable.subscribe((newValue, oldValue) => {
            callback(newValue, oldValue, this.get())
        })
        return this
    }

    id(id) {
        this._domEl.setAttribute(id, identifier)
        return this
    }

    addClass(name) {
        this._domEl.classList.add(name)
        return this
    }

    removeClass(name) {
        this._domEl.classList.remove(name)
        return this
    }

    replaceClass(name) {
        this._domEl.classList.replace(name)
        return this
    }

    toggleClass(name) {
        this._domEl.classList.toggle(name)
        return this
    }

    ifClass(name, yescb, nocb) {
        if (this._domEl.classList.contains(name)) {
            yescb()
        } else {
            nocb()
        }
        return this
    }

    clear() {
        this._domEl.innerHTML = ''
        return this
    }

    loop(list, itemcallback, blankcallback) {
        if (list.length == 0) {
            this.insert(blankcallback())
        } else {
            list.forEach(item => {
                this.insert(itemcallback(item))
            })
        }

        return this
    }

    hasClass(name) {
        return this._domEl.classList.contains(name)
    }

    classes() {
        return this._domEl.classList
    }

    get() {
        return this
    }

    fromDom(element) {
        this._domEl = element
        return this
    }

    toDom() {
        return this._domEl
    }
}

function $(selector) {
    return new elementBuilder().fromDom(document.querySelector(selector))
}

function $all(selector) {
    let els = []

    document.querySelectorAll(selector).forEach((el) => {
        els.push(new elementBuilder().fromDom(el))
    })

    return els
}

function $css(css) {
    document.head.appendChild(document.createElement('style')).innerHTML = css
}

function $tag(handler) {
    return (strings, ...values) => {
        return handler(String.raw(strings, ...values))
    }
}

function _(type) {
    return new elementBuilder(type)
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

export {
    $,
    $all,
    $css,
    $tag,
    _,
    _var,
    _num,
    _list,
    _queue,
    _object,
    stash,
    grab,
    randomItem,
    randomBetween,
    randomString
}
