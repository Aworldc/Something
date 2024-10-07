/**
 * A chainable builder class for DOM elements.
 */
class elementBuilder {
    /**
     * @hideconstructor
     * @see {@link _} for the function to create an instance of this class.
     * @param {string} type The type of DOM element to create. div by default.
     */
    constructor(type = 'div') {
        this._domEl = document.createElement(type)
    }

    /**
     * Sets the text content of this element.
     * @param {string} content The content to be set.
     * @returns The same elementBuilder it was called on.
     */
    text(content) {
        this._domEl.innerText = content
        return this
    }

    /**
     * Inserts another elementBuilder as a child of this element.
     * @param {elementBuilder} element The elementBuilder to insert.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    insert(element) {
        this._domEl.appendChild(element.toDom())
        return this
    }

    /**
     * Adds an event listener to this element.
     * @param {string} type The event to listen for.
     * @param {function} handler The function to handle the event.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    handle(type, handler) {
        this._domEl.addEventListener(type, event => {
            handler(type, this.get(), event)
        })
        return this
    }

    /**
     * Sets a css style propery on this element.
     * @param {string} property The css property to set.
     * @param {*} value The value to set it to.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    style(property, value) {
        this._domEl.style[property] = value
        return this
    }

    /**
     * Sets a html attribute on this element.
     * @param {string} property The property to set.
     * @param {*} value The value to set it to.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    prop(property, value) {
        this._domEl.setAttribute(property, value)
        return this
    }

    /**
     * Gets the value of a html attribute on this element.
     * @param {*} property The property of who's value to get.
     * @returns The value of the specified property.
     */
    val(property) {
        return this._domEl.getAttribute(property)
    }

    /**
     * Subscribe to an arbitrary somethingjs reactive value but get this element as an argument to the callback as well.
     * @param {*} variable The reactive value to subscribe to.
     * @param {*} callback The callback to subscribe with.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    sub(variable, callback) {
        variable.subscribe((newValue, oldValue) => {
            callback(newValue, oldValue, this.get())
        })
        return this
    }

    /**
     * Sets the id of this element.
     * @param {string} id The id to set on the element.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    id(id) {
        this._domEl.setAttribute(id, identifier)
        return this
    }

    /**
     * Adds a class to this element.
     * @param {string} name The classname to add.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    addClass(name) {
        this._domEl.classList.add(name)
        return this
    }

    /**
     * Removes a class from this element.
     * @param {string} name The name of the class to remove.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    removeClass(name) {
        this._domEl.classList.remove(name)
        return this
    }

    /**
     * Replaces a class on this element.
     * @param {string} oldClass The class to be replaced.
     * @param {string} newClass The class to replace with.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    replaceClass(oldClass, newClass) {
        this._domEl.classList.replace(oldClass, newClass)
        return this
    }

    /**
     * Toggles a class on this element.
     * @param {string} name The class to be toggled
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    toggleClass(name) {
        this._domEl.classList.toggle(name)
        return this
    }

    /**
     * Runs different code based on whether a class exists on this element.
     * @param {string} name The class to check.
     * @param {*} yescb Code to run if the class is present.
     * @param {*} nocb Code to run if the class is not present.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    ifClass(name, yescb, nocb) {
        if (this._domEl.classList.contains(name)) {
            yescb()
        } else {
            nocb()
        }
        return this
    }

    /**
     * Completely clears the contents of this element.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    clear() {
        this._domEl.innerHTML = ''
        return this
    }

    /**
     * Loops over an array and adds children to this element.
     * @param {Array<*>} list The array to iterate over.
     * @param {*} itemcallback A callback to call for each item, which returns an elementBuilder to be inserted.
     * @param {*} blankcallback A callback to call in the case of the array having 0 items, which returns an elementBuilder to be inserted.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
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

    /**
     * Checks whether this element has a class.
     * @param {string} name The class to check for the presence of.
     * @returns {boolean} Whether this element has that class
     */
    hasClass(name) {
        return this._domEl.classList.contains(name)
    }

    /**
     * Gets the list of all classes on this element.
     * @returns {DOMTokenList} All the classes on this element.
     */
    classes() {
        return this._domEl.classList
    }

    /**
     * Gets a copy of this element.
     * @returns {elementBuilder} A copy of this element
     */
    get() {
        return this
    }

    /**
     * Attaches this elementBuilder to another dom element.
     * @param {*} element The DOM element to attach to.
     * @returns {elementBuilder} The same elementBuilder it was called on.
     */
    fromDom(element) {
        this._domEl = element
        return this
    }

    /**
     * Gets the underlying DOM element of this elementBuilder.
     * @returns The underlying DOM element of this elementBuilder.
     */
    toDom() {
        return this._domEl
    }
}

export { elementBuilder }
