import { is_reactive, subscribe } from './util.js'
import { MaybeReactive, Reactive } from './reactivity.js'
import { _ } from './domutil.js'

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
    style(property: string, value: MaybeReactive<string>): this {
        subscribe(value, value => {
            this._domEl.style[property] = value
        })

        return this
    }

    /**
     * Sets a css custom property on this element.
     * @param property The name of the custom property, without the two leading hyphens.
     * @param value The value to set it to.
     * @returns The same elementBuilder it was called on.
     */
    set_cssvar(property: string, value: MaybeReactive<string>): this {
        subscribe(value, value => {
            this._domEl.style.setProperty(`--${property}`, value)
        })

        return this
    }

    /**
     * Gets the value of a css custom property on this element.
     * @param property The name of the custom property, without the two leading hyphens.
     * @returns The value of the custom property.
     */
    get_cssvar(property: string): string {
        return this._domEl.style.getPropertyValue(`--${property}`)
    }

    /**
     * Sets a html attribute on this element.
     * @param property The property to set.
     * @param value The value to set it to.
     * @returns The same elementBuilder it was called on.
     */
    set_prop(property: string, value: MaybeReactive<string>): this {
        subscribe(value, value => {
            this._domEl[property] = value
        })

        return this
    }

    /**
     * Gets the value of a html attribute on this element.
     * @param property The property of who's value to get.
     * @returns The value of the specified property.
     */
    get_prop(property: string): string {
        return this._domEl[property]
    }

    /**
     * Links up a reactive to the value of a property on this element.
     * @param property The property to get and set the value of
     * @param variable The reactive that should be linked to the property
     * @param event An event that will be fired when the property is changed
     * @returns The same elementBuilder it was called on.
     */
    bind_prop(
        property: string,
        variable: Reactive<string>,
        event: string
    ): this {
        subscribe(variable, variable => {
            this.set_prop(property, variable)
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
     * @param id The id to set on the element.
     * @returns The same elementBuilder it was called on.
     */
    id(id: string): ElementBuilder {
        this._domEl.setAttribute('id', id)
        return this
    }

    /**
     * Adds a class to this element.
     * @param name The classname to add.
     * @returns The same elementBuilder it was called on.
     */
    add_class(name: MaybeReactive<string>): ElementBuilder {
        let temp: string

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
     * @param name The name of the class to remove.
     * @returns The same elementBuilder it was called on.
     */
    remove_class(name: string): ElementBuilder {
        this._domEl.classList.remove(name)
        return this
    }

    /**
     * Replaces a class on this element.
     * @param oldClass The class to be replaced.
     * @param newClass The class to replace with.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    replace_class(oldClass: string, newClass: string): ElementBuilder {
        this._domEl.classList.replace(oldClass, newClass)
        return this
    }

    /**
     * Toggles a class on this element.
     * @param name The class to be toggled
     * @returns The same elementBuilder it was called on.
     */
    toggle_class(name: string): ElementBuilder {
        this._domEl.classList.toggle(name)
        return this
    }

    /**
     * Runs different code based on whether a class exists on this element.
     * @param name The class to check.
     * @param yescb Code to run if the class is present.
     * @param nocb Code to run if the class is not present.
     * @returns The same elementBuilder it was called on.
     */
    if_class(
        name: string,
        yescb: () => void,
        nocb: () => void
    ): ElementBuilder {
        if (this._domEl.classList.contains(name)) {
            yescb()
        } else {
            nocb()
        }
        return this
    }

    /**
     * Completely clears the contents of this element.
     * @returns The same elementBuilder it was called on.
     */
    clear(): ElementBuilder {
        this._domEl.innerHTML = ''
        return this
    }

    /**
     * Loops over an array and adds children to this element.
     * @param list The array to iterate over.
     * @param itemcallback A callback to call for each item, which returns an elementBuilder to be inserted.
     * @param blankcallback A callback to call in the case of the array having 0 items, which returns an elementBuilder to be inserted.
     * @returns The same elementBuilder it was called on.
     */
    loop<T>(
        list: MaybeReactive<Array<T>>,
        itemcallback: (item: T, index: number) => ElementBuilder,
        blankcallback: () => ElementBuilder,
        some_wrapper?: (() => ElementBuilder) | false
    ): ElementBuilder {
        let items_container = _().style('display', 'contents')

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
     * @param name The class to check for the presence of.
     * @returns Whether this element has that class
     */
    has_class(name: string): boolean {
        return this._domEl.classList.contains(name)
    }

    /**
     * Gets the list of all classes on this element.
     * @returns All the classes on this element.
     */
    classes(): Array<string> {
        return Array.from(this._domEl.classList)
    }

    /**
     * Gets a copy of this element.
     * @returns A copy of this element
     */
    get(): ElementBuilder {
        return this
    }

    /**
     * Attaches this elementBuilder to another dom element.
     * @param element The DOM element to attach to.
     * @returns The same elementBuilder it was called on.
     */
    from_dom(element: HTMLElement): ElementBuilder {
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

    /**
     * Calls the handler function with this element if the provided condition is true.
     * @param condition The condition to check for.
     * @param handler The function to run if the condition is true.
     * @returns The same elementBuilder it was called on.
     * @deprecated for now because I'm not sure if it's necessary. Will either remove it or undeprecate it.
     */
    if(condition: boolean, handler: (self: ElementBuilder) => void): this {
        if (condition) {
            handler(this.get())
        }

        return this
    }

    /**
     * Calls a function with this element as an argument.
     * @param handler A function to do something with this element.
     * @returns The same elementBuilder it was called on.
     */
    process(handler: (self: ElementBuilder) => void): this {
        handler(this)

        return this
    }
}
