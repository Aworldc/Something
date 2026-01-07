# Something Documentation

<kbd><a href="/docs/README.md">Home</a></kbd> / <kbd>Api
Documetation</kbd><br><br>

<!-- TSDOC_START -->

## Functions

- [get_random_item](#get_random_item)
- [get_random_between](#get_random_between)
- [get_random_string](#get_random_string)
- [Variable](#variable)
- [subscribe](#subscribe)
- [is_reactive](#is_reactive)
- [$](#$)
- [$all](#$all)
- [$css](#$css)
- [_](#_)

### get_random_item

Gets a random item from an Array.

| Function | Type |
| ---------- | ---------- |
| `get_random_item` | `<T>(array: T[]) => T` |

Parameters:

* `array`: The array to get random items from.


Returns:

A random item from the provided array.

### get_random_between

Gets a random number in a range.

| Function | Type |
| ---------- | ---------- |
| `get_random_between` | `(min: number, max: number) => number` |

Parameters:

* `min`: The minimum number to generate.
* `max`: The maximum number to generate.


Returns:

A random number between min and max.

### get_random_string

Gets a random string.

| Function | Type |
| ---------- | ---------- |
| `get_random_string` | `(length: number) => string` |

Parameters:

* `length`: How long the string should be.


Returns:

A random alphanumeric string.

### Variable

Creates a new {@link Reactive} if the provided one isn't already one.

| Function | Type |
| ---------- | ---------- |
| `Variable` | `<T>(initial_value: T) => Reactive<T>` |

Parameters:

* `initial_value`: The initial value to set it to.


Returns:

A new reactive wrapping the provided value, or the provided value if it is a {@link Reactive }.

### subscribe

Subscribe to changes to a value that may or may not be a {@link Reactive}.

| Function | Type |
| ---------- | ---------- |
| `subscribe` | `<T>(maybe_reactive: MaybeReactive<T>, handler: ReactiveSubscription<T>) => void` |

Parameters:

* `maybe_reactive`: A value that may or may not be a 
* `handler`: Called when first subscribing to the value, and if the value is reactive, when it is changed.


### is_reactive

Determines whether a value is a {@link Reactive} or not.

| Function | Type |
| ---------- | ---------- |
| `is_reactive` | `<T>(maybe_reactive: MaybeReactive<T>) => maybe_reactive is Reactive<T>` |

Parameters:

* `maybe_reactive`: Something that may or may not be a 


Returns:

Whether the argument is a {@link Reactive } or not.

### $

Selects an element as an {@link ElementBuilder}.

| Function | Type |
| ---------- | ---------- |
| `# Something Documentation

<kbd><a href="/docs/README.md">Home</a></kbd> / <kbd>Api
Documetation</kbd><br><br>

 | `(selector: string) => ElementBuilder` |

Parameters:

* `selector`: The css selector for an element.


Returns:

An elementBuilder attached to the dom element associated with the provided selector.

### $all

Selects multiple elements as an array of {@link ElementBuilder}s.

| Function | Type |
| ---------- | ---------- |
| `$all` | `(selector: string) => ElementBuilder[]` |

Parameters:

* `selector`: The css selector for a collection of elements.


Returns:

An array containing whose are attached to the DOM elements associated with the provided selector.

### $css

Injects css into the current webpage.

| Function | Type |
| ---------- | ---------- |
| `$css` | `(css: string) => void` |

Parameters:

* `css`: The css to be injected.


### _

Creates a new dom element.

| Function | Type |
| ---------- | ---------- |
| `_` | `(type?: string or undefined) => ElementBuilder` |

Parameters:

* `type`: The type of element to create. Defaults to a div


Returns:

An elementBuilder attached to a brand-new dom element of the specified type.


## Reactive

### Methods

- [subscribe](#subscribe)
- [update](#update)
- [as](#as)

#### subscribe

Subscribe to updates to this reactive.

| Method | Type |
| ---------- | ---------- |
| `subscribe` | `(handler: ReactiveSubscription<T>) => void` |

Parameters:

* `handler`: Called immediately on subscription, then called whenever the value is changed.


#### update

Calls the function provided, then calls all subscriptions.

Intended for modifying the value using methods that don't return the new value, such as `Array.push()`.

| Method | Type |
| ---------- | ---------- |
| `update` | `(updater: (self: this) => void) => void` |

Parameters:

* `updater`: A callback that may mutate the value.


#### as

Creates a new reactive that follows the value of this one, but has it's value modified by a function.

| Method | Type |
| ---------- | ---------- |
| `as` | `<O>(formatter: ReactiveFormatter<T, O>) => Reactive<O>` |

Parameters:

* `formatter`: A function that formats the value of the reactive


Returns:

A new reactive that follows changes to this one, but returns values formatted by the provided function.

## ElementBuilder

A chainable builder class for DOM elements.

### Methods

- [text](#text)
- [insert](#insert)
- [handle](#handle)
- [style](#style)
- [set_cssvar](#set_cssvar)
- [get_cssvar](#get_cssvar)
- [set_prop](#set_prop)
- [get_prop](#get_prop)
- [bind_prop](#bind_prop)
- [sub](#sub)
- [id](#id)
- [add_class](#add_class)
- [remove_class](#remove_class)
- [replace_class](#replace_class)
- [toggle_class](#toggle_class)
- [if_class](#if_class)
- [clear](#clear)
- [loop](#loop)
- [has_class](#has_class)
- [classes](#classes)
- [get](#get)
- [from_dom](#from_dom)
- [to_dom](#to_dom)
- [if](#if)
- [process](#process)

#### text

Sets the text content of this element.

| Method | Type |
| ---------- | ---------- |
| `text` | `(content: MaybeReactive<string>) => this` |

Parameters:

* `content`: The content to be set.


Returns:

The same elementBuilder it was called on.

#### insert

Inserts another elementBuilder as a child of this element.

| Method | Type |
| ---------- | ---------- |
| `insert` | `(element: MaybeReactive<ElementBuilder>) => this` |

Parameters:

* `element`: The elementBuilder to insert.


Returns:

The same elementBuilder it was called on.

#### handle

Adds an event listener to this element.

| Method | Type |
| ---------- | ---------- |
| `handle` | `(type: string, handler: MaybeReactive<(type: string, self: ElementBuilder, event: Event) => void>) => this` |

Parameters:

* `type`: The event to listen for.
* `handler`: The function to handle the event.


Returns:

The same elementBuilder it was called on.

#### style

Sets a css style property on this element.

| Method | Type |
| ---------- | ---------- |
| `style` | `(property: string, value: MaybeReactive<string>) => this` |

Parameters:

* `property`: The css property to set.
* `value`: The value to set it to.


Returns:

The same elementBuilder it was called on.

#### set_cssvar

| Method | Type |
| ---------- | ---------- |
| `set_cssvar` | `(property: string, value: string) => this` |

#### get_cssvar

| Method | Type |
| ---------- | ---------- |
| `get_cssvar` | `(property: string) => string` |

#### set_prop

Sets a html attribute on this element.

| Method | Type |
| ---------- | ---------- |
| `set_prop` | `(property: string, value: MaybeReactive<string>) => this` |

Parameters:

* `property`: The property to set.
* `value`: The value to set it to.


Returns:

The same elementBuilder it was called on.

#### get_prop

Gets the value of a html attribute on this element.

| Method | Type |
| ---------- | ---------- |
| `get_prop` | `(property: string) => string` |

Parameters:

* `property`: The property of who's value to get.


Returns:

The value of the specified property.

#### bind_prop

Links up a reactive to the value of a property on this element.

| Method | Type |
| ---------- | ---------- |
| `bind_prop` | `(property: string, variable: Reactive<string>, event: string) => this` |

Parameters:

* `property`: The property to get and set the value of
* `variable`: The reactive that should be linked to the property
* `event`: An event that will be fired when the property is changed


Returns:

The same elementBuilder it was called on.

#### sub

Subscribe to an arbitrary reactive value but get this element as an argument to the callback as well.

| Method | Type |
| ---------- | ---------- |
| `sub` | `<T>(variable: Reactive<T>, callback: (new_value: T, old_value: T, self: ElementBuilder) => void) => this` |

Parameters:

* `variable`: The reactive value to subscribe to.
* `callback`: The callback to subscribe with.


Returns:

The same elementBuilder it was called on.

#### id

Sets the id of this element.

| Method | Type |
| ---------- | ---------- |
| `id` | `(id: string) => ElementBuilder` |

Parameters:

* `id`: The id to set on the element.


Returns:

The same elementBuilder it was called on.

#### add_class

Adds a class to this element.

| Method | Type |
| ---------- | ---------- |
| `add_class` | `(name: MaybeReactive<string>) => ElementBuilder` |

Parameters:

* `name`: The classname to add.


Returns:

The same elementBuilder it was called on.

#### remove_class

Removes a class from this element.

| Method | Type |
| ---------- | ---------- |
| `remove_class` | `(name: string) => ElementBuilder` |

Parameters:

* `name`: The name of the class to remove.


Returns:

The same elementBuilder it was called on.

#### replace_class

Replaces a class on this element.

| Method | Type |
| ---------- | ---------- |
| `replace_class` | `(oldClass: string, newClass: string) => ElementBuilder` |

Parameters:

* `oldClass`: The class to be replaced.
* `newClass`: The class to replace with.


Returns:

The same elementBuilder it was called on.

#### toggle_class

Toggles a class on this element.

| Method | Type |
| ---------- | ---------- |
| `toggle_class` | `(name: string) => ElementBuilder` |

Parameters:

* `name`: The class to be toggled


Returns:

The same elementBuilder it was called on.

#### if_class

Runs different code based on whether a class exists on this element.

| Method | Type |
| ---------- | ---------- |
| `if_class` | `(name: string, yescb: () => void, nocb: () => void) => ElementBuilder` |

Parameters:

* `name`: The class to check.
* `yescb`: Code to run if the class is present.
* `nocb`: Code to run if the class is not present.


Returns:

The same elementBuilder it was called on.

#### clear

Completely clears the contents of this element.

| Method | Type |
| ---------- | ---------- |
| `clear` | `() => ElementBuilder` |

Returns:

The same elementBuilder it was called on.

#### loop

Loops over an array and adds children to this element.

| Method | Type |
| ---------- | ---------- |
| `loop` | `<T>(list: MaybeReactive<T[]>, itemcallback: (item: T, index: number) => ElementBuilder, blankcallback: () => ElementBuilder, some_wrapper?: false or ... 1 more ... or undefined) => ElementBuilder` |

Parameters:

* `list`: The array to iterate over.
* `itemcallback`: A callback to call for each item, which returns an elementBuilder to be inserted.
* `blankcallback`: A callback to call in the case of the array having 0 items, which returns an elementBuilder to be inserted.


Returns:

The same elementBuilder it was called on.

#### has_class

Checks whether this element has a class.

| Method | Type |
| ---------- | ---------- |
| `has_class` | `(name: string) => boolean` |

Parameters:

* `name`: The class to check for the presence of.


Returns:

Whether this element has that class

#### classes

Gets the list of all classes on this element.

| Method | Type |
| ---------- | ---------- |
| `classes` | `() => string[]` |

Returns:

All the classes on this element.

#### get

Gets a copy of this element.

| Method | Type |
| ---------- | ---------- |
| `get` | `() => ElementBuilder` |

Returns:

A copy of this element

#### from_dom

Attaches this elementBuilder to another dom element.

| Method | Type |
| ---------- | ---------- |
| `from_dom` | `(element: HTMLElement) => ElementBuilder` |

Parameters:

* `element`: The DOM element to attach to.


Returns:

The same elementBuilder it was called on.

#### to_dom

Gets the underlying DOM element of this elementBuilder.

| Method | Type |
| ---------- | ---------- |
| `to_dom` | `() => HTMLElement` |

Returns:

The underlying DOM element of this elementBuilder.

#### if

| Method | Type |
| ---------- | ---------- |
| `if` | `(condition: boolean, handler: (self: ElementBuilder) => void) => this` |

#### process

| Method | Type |
| ---------- | ---------- |
| `process` | `(handler: (self: ElementBuilder) => void) => this` |

### Properties

- [_domEl](#_domel)

#### _domEl

| Property | Type |
| ---------- | ---------- |
| `_domEl` | `HTMLElement` |

## Types

- [ReactiveFormatter](#reactiveformatter)
- [ReactiveSubscription](#reactivesubscription)
- [MaybeReactive](#maybereactive)

### ReactiveFormatter

| Type | Type |
| ---------- | ---------- |
| `ReactiveFormatter` | `(current_value: T) => O` |

### ReactiveSubscription

| Type | Type |
| ---------- | ---------- |
| `ReactiveSubscription` | `(old_value: T, new_value: T) => void` |

### MaybeReactive

A value that may or may not be wrapped in a Reactive

| Type | Type |
| ---------- | ---------- |
| `MaybeReactive` | `T or Reactive<T>` |


<!-- TSDOC_END -->
