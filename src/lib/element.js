import { get_random_string, is_reactive, subscribe, Variable } from './util.js'
import { Reactive } from './reactivity.js'

export class ElementBuilder {
    constructor(type = 'div') {
        this._domEl = document.createElement(type)
    }

    text(content) {
        subscribe(content, value => {
            this._domEl.textContent = value
        })

        return this
    }

    insert(element) {
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

    handle(type, handler) {
        let todo_name_this_better

        subscribe(handler, value => {
            if (todo_name_this_better) {
                this._domEl.removeEventListener(type, todo_name_this_better)
            }

            todo_name_this_better = event => {
                value(type, this.get(), event)
            }

            this._domEl.addEventListener(type, todo_name_this_better)
        })

        return this
    }

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
        return this._domEl.style.getPropertyValue(`--${property}`)
    }

    set_prop(property, value) {
        subscribe(value, value => {
            this._domEl.setAttribute(property, value)
        })

        return this
    }

    get_prop(property) {
        return this._domEl.getAttribute(property)
    }

    bind_prop(property, variable, event) {
        subscribe(variable, variable => {
            this._domEl.setAttribute(property, variable)
        })

        this._domEl.addEventListener(event, () => {
            variable.value = this._domEl[property]
        })

        return this
    }

    sub(variable, callback) {
        variable.subscribe((newValue, oldValue) => {
            callback(newValue, oldValue, this.get())
        })
        return this
    }

    id(id) {
        this._domEl.setAttribute('id', id)
        return this
    }

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

    remove_class(name) {
        this._domEl.classList.remove(name)
        return this
    }

    replace_class(oldClass, newClass) {
        this._domEl.classList.replace(oldClass, newClass)
        return this
    }

    toggle_class(name) {
        this._domEl.classList.toggle(name)
        return this
    }

    if_class(name, yescb, nocb) {
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

    loop(list, itemcallback, blankcallback, some_wrapper = false) {
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

    has_class(name) {
        return this._domEl.classList.contains(name)
    }

    classes() {
        return Array.from(this._domEl.classList)
    }

    get() {
        return this
    }

    from_dom(element) {
        this._domEl = element
        return this
    }

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
