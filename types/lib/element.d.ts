import { Reactive } from './reactivity.js'
import { MaybeReactive } from './types.js'

/**
 * A chainable builder class for DOM elements.
 */
export class ElementBuilder {
    /**
     * Sets the text content of this element.
     * @param content The content to be set.
     * @returns The same elementBuilder it was called on.
     */
    text(content: MaybeReactive<string>): this

    /**
     * Inserts another elementBuilder as a child of this element.
     * @param element The elementBuilder to insert.
     * @returns The same elementBuilder it was called on.
     */
    insert(element: MaybeReactive<ElementBuilder>): this

    /**
     * Adds an event listener to this element.
     * @param type The event to listen for.
     * @param handler The function to handle the event.
     * @returns The same elementBuilder it was called on.
     */
    handle(
        type: string,
        handler: MaybeReactive<(type: string, self: this, event) => void>
    ): this

    /**
     * Sets a css style property on this element.
     * @param property The css property to set.
     * @param value The value to set it to.
     * @returns The same elementBuilder it was called on.
     */
    style(property: string, value: any): this
    set_cssvar(property: any, value: any): this
    get_cssvar(property: any): string

    /**
     * Sets a html attribute on this element.
     * @param property The property to set.
     * @param value The value to set it to.
     * @returns The same elementBuilder it was called on.
     */
    set_prop(property: string, value: any | Reactive<any>): this

    /**
     * Gets the value of a html attribute on this element.
     * @param property The property of who's value to get.
     * @returns The value of the specified property.
     */
    get_prop(property: any): string
    bind_prop(property: any, variable: any, event: any): this

    /**
     * Subscribe to an arbitrary reactive value but get this element as an argument to the callback as well.
     * @param variable The reactive value to subscribe to.
     * @param callback The callback to subscribe with.
     * @returns The same elementBuilder it was called on.
     */
    sub<T>(
        variable: Reactive<T>,
        callback: (new_value: T, old_value: T, self: this) => void
    ): this

    /**
     * Sets the id of this element.
     * @param {string} id The id to set on the element.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    id(id: string): ElementBuilder
    /**
     * Adds a class to this element.
     * @param {string | Reactive} name The classname to add.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    add_class(name: string | Reactive): ElementBuilder
    /**
     * Removes a class from this element.
     * @param {string} name The name of the class to remove.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    remove_class(name: string): ElementBuilder
    /**
     * Replaces a class on this element.
     * @param {string} oldClass The class to be replaced.
     * @param {string} newClass The class to replace with.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    replace_class(oldClass: string, newClass: string): ElementBuilder
    /**
     * Toggles a class on this element.
     * @param {string} name The class to be toggled
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    toggle_class(name: string): ElementBuilder
    /**
     * Runs different code based on whether a class exists on this element.
     * @param {string} name The class to check.
     * @param {*} yescb Code to run if the class is present.
     * @param {*} nocb Code to run if the class is not present.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    if_class(name: string, yescb: any, nocb: any): ElementBuilder
    /**
     * Completely clears the contents of this element.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    clear(): ElementBuilder
    /**
     * Loops over an array and adds children to this element.
     * @param {Array<*> | Reactive} list The array to iterate over.
     * @param {*} itemcallback A callback to call for each item, which returns an elementBuilder to be inserted.
     * @param {*} blankcallback A callback to call in the case of the array having 0 items, which returns an elementBuilder to be inserted.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    loop(
        list: Array<any> | Reactive,
        itemcallback: any,
        blankcallback: any,
        some_wrapper?: boolean
    ): ElementBuilder
    /**
     * Checks whether this element has a class.
     * @param {string} name The class to check for the presence of.
     * @returns {boolean} Whether this element has that class
     */
    has_class(name: string): boolean
    /**
     * Gets the list of all classes on this element.
     * @returns {Array} All the classes on this element.
     */
    classes(): any[]
    /**
     * Gets a copy of this element.
     * @returns {ElementBuilder} A copy of this element
     */
    get(): ElementBuilder
    /**
     * Attaches this elementBuilder to another dom element.
     * @param {*} element The DOM element to attach to.
     * @returns {ElementBuilder} The same elementBuilder it was called on.
     */
    from_dom(element: any): ElementBuilder

    /**
     * Gets the underlying DOM element of this elementBuilder.
     * @returns The underlying DOM element of this elementBuilder.
     */
    to_dom(): HTMLElement
    if(condition: any, handler: any): this
    process(handler: any): this
}
