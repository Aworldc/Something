import { subscribe } from './util.js'
import { Reactive } from './reactivity.js'

/**
 * A chainable builder class for DOM elements.
 */
export class ElementBuilder {
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
     * @param {string | Reactive} content The content to be set.
     * @returns The same elementBuilder it was called on.
     */
    text(content) {
        subscribe(content, value => {
            this._domEl.textContent = value
        })

        return this
    }

    /**
     * Inserts another elementBuilder as a child of this element.
     * @param {ElementBuilder} element The elementBuilder to insert.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    insert(element) {
        this._domEl.appendChild(element.to_dom())
        return this
    }

    /**
     * Adds an event listener to this element.
     * @param {string} type The event to listen for.
     * @param {function | Reactive} handler The function to handle the event.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    handle(type, handler) {
        let todo_name_this_better

        subscribe(handler, value => {
            if (todo_name_this_better) {
                this._domEl.removeEventListener(type, todo_name_this_better)
            }

            this._domEl.addEventListener(type, event => {
                value(type, this.get(), event)
            })

            todo_name_this_better = value
        })

        return this
    }

    /**
     * Sets a css style property on this element.
     * @param {string} property The css property to set.
     * @param {*} value The value to set it to.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    style(property, value) {
        subscribe(value, value => {
            this._domEl.style[property] = value
        })

        return this
    }

    set_cssvar(property, value) {
        subscribe(value, value => {
            this._domEl.style.setProperty(`--${property}`, value)
        })

        return this
    }

    get_cssvar(property) {
        subscribe(value, value => {
            this._domEl.style.getPropertyValue(`--${property}`)
        })

        return this
    }

    /**
     * Sets a html attribute on this element.
     * @param {string} property The property to set.
     * @param {* | Reactive} value The value to set it to.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    set_prop(property, value) {
        subscribe(value, value => {
            this._domEl.setAttribute(property, value)
        })

        return this
    }

    /**
     * Gets the value of a html attribute on this element.
     * @param {*} property The property of who's value to get.
     * @returns The value of the specified property.
     */
    get_prop(property) {
        return this._domEl.getAttribute(property)
    }

    /**
     * Subscribe to an arbitrary somethingjs reactive value but get this element as an argument to the callback as well.
     * @param {*} variable The reactive value to subscribe to.
     * @param {*} callback The callback to subscribe with.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
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
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    id(id) {
        this._domEl.setAttribute(id, identifier)
        return this
    }

    /**
     * Adds a class to this element.
     * @param {string | Reactive} name The classname to add.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    add_class(name) {
        let temp

        subscribe(name, value => {
            if (temp) {
                this.remove_class(temp)
            }

            this._domEl.classList.add(value)
            temp = value
        })

        return this
    }

    /**
     * Removes a class from this element.
     * @param {string} name The name of the class to remove.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    remove_class(name) {
        this._domEl.classList.remove(name)
        return this
    }

    /**
     * Replaces a class on this element.
     * @param {string} oldClass The class to be replaced.
     * @param {string} newClass The class to replace with.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    replace_class(oldClass, newClass) {
        this._domEl.classList.replace(oldClass, newClass)
        return this
    }

    /**
     * Toggles a class on this element.
     * @param {string} name The class to be toggled
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    toggle_class(name) {
        this._domEl.classList.toggle(name)
        return this
    }

    /**
     * Runs different code based on whether a class exists on this element.
     * @param {string} name The class to check.
     * @param {*} yescb Code to run if the class is present.
     * @param {*} nocb Code to run if the class is not present.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    if_class(name, yescb, nocb) {
        if (this._domEl.classList.contains(name)) {
            yescb()
        } else {
            nocb()
        }
        return this
    }

    /**
     * Completely clears the contents of this element.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
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
     * @returns {ElementBuilder} The same elementBuilder it was called on.
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
    has_class(name) {
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
     * @returns {ElementBuilder} A copy of this element
     */
    get() {
        return this
    }

    /**
     * Attaches this elementBuilder to another dom element.
     * @param {*} element The DOM element to attach to.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    from_dom(element) {
        this._domEl = element
        return this
    }

    /**
     * Gets the underlying DOM element of this elementBuilder.
     * @returns The underlying DOM element of this elementBuilder.
     */
    to_dom() {
        return this._domEl
    }

    if(condition, handler) {
        if (condition) {
            handler(this.get())
        }

        return this
    }

    process(handler) {
        handler(this)

        return this
    }
}
