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
        this._domEl.addEventListener(type, event => {
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

export { elementBuilder }
