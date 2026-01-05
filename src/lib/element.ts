import { get_random_string, is_reactive, subscribe, Variable } from './util.js'
import { MaybeReactive, Reactive } from './reactivity.js'

/**
 * A chainable builder class for DOM elements.
 */
export class ElementBuilder {
    _domEl: HTMLElement

    constructor(type: string = 'div') {
        this._domEl = document.createElement(type)
    }

    /**
     * Sets the text content of this element.
     * @param content The content to be set.
     * @returns The same elementBuilder it was called on.
     */
    text(content: MaybeReactive<string>): this {
        subscribe(content, value => {
            this._domEl.textContent = value
        })

        return this
    }

    /**
     * Inserts another elementBuilder as a child of this element.
     * @param element The elementBuilder to insert.
     * @returns The same elementBuilder it was called on.
     */
    insert(element: MaybeReactive<ElementBuilder>): this {
        if (is_reactive(element)) {
            let the_element = element.value.to_dom()

            this._domEl.appendChild(the_element)

            element.subscribe(element => {
                the_element.replaceWith(element.to_dom())
            })
        } else {
            this._domEl.appendChild(element.to_dom())
        }

        return this
    }

    /**
     * Adds an event listener to this element.
     * @param type The event to listen for.
     * @param handler The function to handle the event.
     * @returns The same elementBuilder it was called on.
     */
    handle(
        type: string,
        handler: MaybeReactive<
            (type: string, self: ElementBuilder, event: Event) => void
        >
    ): this {
        let todo_name_this_better: EventListener

        subscribe(handler, value => {
            if (todo_name_this_better) {
                this._domEl.removeEventListener(type, todo_name_this_better)
            }

            todo_name_this_better = (event: Event) => {
                value(type, this.get(), event)
            }

            this._domEl.addEventListener(type, todo_name_this_better)
        })

        return this
    }

    /**
     * Sets a css style property on this element.
     * @param property The css property to set.
     * @param value The value to set it to.
     * @returns The same elementBuilder it was called on.
     */
    style(property: string, value: any): this {
        subscribe(value, value => {
            this._domEl.style[property] = value
        })

        return this
    }

    set_cssvar(property: any, value: any): this {
        subscribe(value, value => {
            this._domEl.style.setProperty(`--${property}`, value)
        })

        return this
    }

    get_cssvar(property: any): string {
        return this._domEl.style.getPropertyValue(`--${property}`)
    }

    /**
     * Sets a html attribute on this element.
     * @param property The property to set.
     * @param value The value to set it to.
     * @returns The same elementBuilder it was called on.
     */
    set_prop(property: string, value: any | Reactive<any>): this {
        subscribe(value, value => {
            this._domEl.setAttribute(property, value)
        })

        return this
    }

    /**
     * Gets the value of a html attribute on this element.
     * @param property The property of who's value to get.
     * @returns The value of the specified property.
     */
    get_prop(property: any): string {
        return this._domEl.getAttribute(property)
    }

    bind_prop(property: any, variable: any, event: any): this {
        subscribe(variable, variable => {
            this._domEl.setAttribute(property, variable)
        })

        this._domEl.addEventListener(event, () => {
            variable.value = this._domEl[property]
        })

        return this
    }

    /**
     * Subscribe to an arbitrary reactive value but get this element as an argument to the callback as well.
     * @param variable The reactive value to subscribe to.
     * @param callback The callback to subscribe with.
     * @returns The same elementBuilder it was called on.
     */
    sub<T>(
        variable: Reactive<T>,
        callback: (new_value: T, old_value: T, self: ElementBuilder) => void
    ): this {
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
    id(id: string): ElementBuilder {
        this._domEl.setAttribute('id', id)
        return this
    }

    /**
     * Adds a class to this element.
     * @param {string | Reactive} name The classname to add.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    add_class(name: MaybeReactive<string>): ElementBuilder {
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
    remove_class(name: string): ElementBuilder {
        this._domEl.classList.remove(name)
        return this
    }

    /**
     * Replaces a class on this element.
     * @param {string} oldClass The class to be replaced.
     * @param {string} newClass The class to replace with.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    replace_class(oldClass: string, newClass: string): ElementBuilder {
        this._domEl.classList.replace(oldClass, newClass)
        return this
    }

    /**
     * Toggles a class on this element.
     * @param {string} name The class to be toggled
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    toggle_class(name: string): ElementBuilder {
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
    if_class(name: string, yescb: any, nocb: any): ElementBuilder {
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
    clear(): ElementBuilder {
        this._domEl.innerHTML = ''
        return this
    }

    /**
     * Loops over an array and adds children to this element.
     * @param {Array<*> | Reactive} list The array to iterate over.
     * @param {*} itemcallback A callback to call for each item, which returns an elementBuilder to be inserted.
     * @param {*} blankcallback A callback to call in the case of the array having 0 items, which returns an elementBuilder to be inserted.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    loop(
        list: MaybeReactive<Array<any>>,
        itemcallback: any,
        blankcallback: any,
        some_wrapper?: (() => ElementBuilder) | false
    ): ElementBuilder {
        let items_container = new ElementBuilder().style('display', 'contents')

        subscribe(list, list => {
            items_container.clear()
            if (list.length == 0) {
                items_container.insert(blankcallback())
            } else {
                if (some_wrapper) {
                    let sw = some_wrapper()

                    list.forEach((item, index) => {
                        sw.insert(itemcallback(item, index))
                    })

                    items_container.insert(sw)
                } else {
                    list.forEach((item, index) => {
                        items_container.insert(itemcallback(item, index))
                    })
                }
            }
        })

        this.insert(items_container)

        return this
    }

    /**
     * Checks whether this element has a class.
     * @param {string} name The class to check for the presence of.
     * @returns {boolean} Whether this element has that class
     */
    has_class(name: string): boolean {
        return this._domEl.classList.contains(name)
    }

    /**
     * Gets the list of all classes on this element.
     * @returns {Array} All the classes on this element.
     */
    classes(): Array<string> {
        return Array.from(this._domEl.classList)
    }

    /**
     * Gets a copy of this element.
     * @returns {ElementBuilder} A copy of this element
     */
    get(): ElementBuilder {
        return this
    }

    /**
     * Attaches this elementBuilder to another dom element.
     * @param {*} element The DOM element to attach to.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    from_dom(element: any): ElementBuilder {
        this._domEl = element
        return this
    }

    /**
     * Gets the underlying DOM element of this elementBuilder.
     * @returns The underlying DOM element of this elementBuilder.
     */
    to_dom(): HTMLElement {
        return this._domEl
    }

    if(condition: any, handler: any): this {
        if (condition) {
            handler(this.get())
        }

        return this
    }

    process(handler: any): this {
        handler(this)

        return this
    }
}
