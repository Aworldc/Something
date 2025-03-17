# Something documentation

<kbd><a href="/docs/index.md">Home</a></kbd> / <kbd>Api Documetation</kbd><br><br>

## Classes

<dl>
<dt><a href="#elementBuilder">elementBuilder</a></dt>
<dd><p>A chainable builder class for DOM elements.</p>
</dd>
<dt><a href="#reactiveVariable">reactiveVariable</a></dt>
<dd><p>An object containing a variable that can be subscribed to.</p>
</dd>
<dt><a href="#reactiveNumber">reactiveNumber</a></dt>
<dd><p>An object containing a number that can be subscribed to.</p>
</dd>
<dt><a href="#reactiveList">reactiveList</a></dt>
<dd><p>An object containing a list that can be subscribed to.</p>
</dd>
<dt><a href="#reactiveQueue">reactiveQueue</a></dt>
<dd><p>An object containing a queue that can be subscribed to.</p>
</dd>
<dt><a href="#reactiveObject">reactiveObject</a></dt>
<dd><p>An object containing an object that can be subscribed to.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#_bezier">_bezier(points)</a> ⇒ <code><a href="#BezierCurveObject">BezierCurveObject</a></code></dt>
<dd><p>Produce a bezier curve</p>
</dd>
<dt><a href="#$">$(selector)</a> ⇒ <code><a href="#elementBuilder">elementBuilder</a></code></dt>
<dd><p>Selects an element as an <a href="#elementBuilder">elementBuilder</a>.</p>
</dd>
<dt><a href="#$all">$all(selector)</a> ⇒ <code><a href="#elementBuilder">Array.&lt;elementBuilder&gt;</a></code></dt>
<dd></dd>
<dt><a href="#$css">$css(css)</a></dt>
<dd><p>Injects css into the current webpage.</p>
</dd>
<dt><a href="#_">_(type)</a> ⇒ <code><a href="#elementBuilder">elementBuilder</a></code></dt>
<dd><p>Creates a new dom element.</p>
</dd>
<dt><a href="#node_impurities">node_impurities()</a></dt>
<dd><p>Inserts a few shims into the global object.</p>
</dd>
<dt><a href="#randomItem">randomItem(array)</a> ⇒ <code>*</code></dt>
<dd><p>Gets a random item from an Array.</p>
</dd>
<dt><a href="#randomBetween">randomBetween(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>Gets a random number in a range.</p>
</dd>
<dt><a href="#randomString">randomString(length)</a> ⇒</dt>
<dd><p>Gets a random string.</p>
</dd>
<dt><a href="#$tag">$tag(handler)</a> ⇒</dt>
<dd><p>Generates a tag for use with tagged templates from a function.</p>
</dd>
<dt><a href="#_var">_var(initialValue)</a> ⇒</dt>
<dd><p>Creates a <a href="#reactiveVariable">reactiveVariable</a> object.</p>
</dd>
<dt><a href="#_num">_num(initialValue)</a> ⇒</dt>
<dd><p>Creates a <a href="#reactiveNumber">reactiveNumber</a> object.</p>
</dd>
<dt><a href="#_list">_list(initialValue)</a> ⇒</dt>
<dd><p>Creates a <a href="#reactiveList">reactiveList</a> object.</p>
</dd>
<dt><a href="#_queue">_queue(initialValue)</a> ⇒</dt>
<dd><p>Creates a <a href="#reactiveQueue">reactiveQueue</a> object.</p>
</dd>
<dt><a href="#_object">_object(initialValue)</a> ⇒</dt>
<dd><p>Creates a <a href="#reactiveObject">reactiveObject</a> object.</p>
</dd>
<dt><a href="#neutral_impurities">neutral_impurities()</a></dt>
<dd><p>Adds some extra utilities to other types,
including Math.randomString, which is an alias for <a href="#randomString">randomString</a>,
Math.randomBetween, Which is an alias for <a href="#randomBetween">randomBetween</a>,
and Array.prototype.random,
which returns a random item of the array it&#39;s called on.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#BezierCurveObject">BezierCurveObject</a> : <code>Object</code></dt>
<dd><p>A bezier curve</p>
</dd>
</dl>

<a name="elementBuilder"></a>

## elementBuilder
A chainable builder class for DOM elements.

**Kind**: global class  
**See**: [_](#_) for the function to create an instance of this class.  

* [elementBuilder](#elementBuilder)
    * [new elementBuilder(type)](#new_elementBuilder_new)
    * [.text(content)](#elementBuilder+text) ⇒
    * [.insert(element)](#elementBuilder+insert) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.handle(type, handler)](#elementBuilder+handle) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.style(property, value)](#elementBuilder+style) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.prop(property, value)](#elementBuilder+prop) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.val(property)](#elementBuilder+val) ⇒
    * [.sub(variable, callback)](#elementBuilder+sub) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.id(id)](#elementBuilder+id) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.addClass(name)](#elementBuilder+addClass) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.removeClass(name)](#elementBuilder+removeClass) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.replaceClass(oldClass, newClass)](#elementBuilder+replaceClass) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.toggleClass(name)](#elementBuilder+toggleClass) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.ifClass(name, yescb, nocb)](#elementBuilder+ifClass) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.clear()](#elementBuilder+clear) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.loop(list, itemcallback, blankcallback)](#elementBuilder+loop) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.hasClass(name)](#elementBuilder+hasClass) ⇒ <code>boolean</code>
    * [.classes()](#elementBuilder+classes) ⇒ <code>DOMTokenList</code>
    * [.get()](#elementBuilder+get) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.fromDom(element)](#elementBuilder+fromDom) ⇒ [<code>elementBuilder</code>](#elementBuilder)
    * [.toDom()](#elementBuilder+toDom) ⇒


* * *

<a name="new_elementBuilder_new"></a>

### new elementBuilder(type)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> | <code>&quot;div&quot;</code> | The type of DOM element to create. div by default. |


* * *

<a name="elementBuilder+text"></a>

### elementBuilder.text(content) ⇒
Sets the text content of this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content to be set. |


* * *

<a name="elementBuilder+insert"></a>

### elementBuilder.insert(element) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Inserts another elementBuilder as a child of this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| element | [<code>elementBuilder</code>](#elementBuilder) | The elementBuilder to insert. |


* * *

<a name="elementBuilder+handle"></a>

### elementBuilder.handle(type, handler) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Adds an event listener to this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The event to listen for. |
| handler | <code>function</code> | The function to handle the event. |


* * *

<a name="elementBuilder+style"></a>

### elementBuilder.style(property, value) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Sets a css style propery on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The css property to set. |
| value | <code>\*</code> | The value to set it to. |


* * *

<a name="elementBuilder+prop"></a>

### elementBuilder.prop(property, value) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Sets a html attribute on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | The property to set. |
| value | <code>\*</code> | The value to set it to. |


* * *

<a name="elementBuilder+val"></a>

### elementBuilder.val(property) ⇒
Gets the value of a html attribute on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: The value of the specified property.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>\*</code> | The property of who's value to get. |


* * *

<a name="elementBuilder+sub"></a>

### elementBuilder.sub(variable, callback) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Subscribe to an arbitrary somethingjs reactive value but get this element as an argument to the callback as well.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| variable | <code>\*</code> | The reactive value to subscribe to. |
| callback | <code>\*</code> | The callback to subscribe with. |


* * *

<a name="elementBuilder+id"></a>

### elementBuilder.id(id) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Sets the id of this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | The id to set on the element. |


* * *

<a name="elementBuilder+addClass"></a>

### elementBuilder.addClass(name) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Adds a class to this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The classname to add. |


* * *

<a name="elementBuilder+removeClass"></a>

### elementBuilder.removeClass(name) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Removes a class from this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the class to remove. |


* * *

<a name="elementBuilder+replaceClass"></a>

### elementBuilder.replaceClass(oldClass, newClass) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Replaces a class on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| oldClass | <code>string</code> | The class to be replaced. |
| newClass | <code>string</code> | The class to replace with. |


* * *

<a name="elementBuilder+toggleClass"></a>

### elementBuilder.toggleClass(name) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Toggles a class on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The class to be toggled |


* * *

<a name="elementBuilder+ifClass"></a>

### elementBuilder.ifClass(name, yescb, nocb) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Runs different code based on whether a class exists on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The class to check. |
| yescb | <code>\*</code> | Code to run if the class is present. |
| nocb | <code>\*</code> | Code to run if the class is not present. |


* * *

<a name="elementBuilder+clear"></a>

### elementBuilder.clear() ⇒ [<code>elementBuilder</code>](#elementBuilder)
Completely clears the contents of this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

* * *

<a name="elementBuilder+loop"></a>

### elementBuilder.loop(list, itemcallback, blankcallback) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Loops over an array and adds children to this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>Array.&lt;\*&gt;</code> | The array to iterate over. |
| itemcallback | <code>\*</code> | A callback to call for each item, which returns an elementBuilder to be inserted. |
| blankcallback | <code>\*</code> | A callback to call in the case of the array having 0 items, which returns an elementBuilder to be inserted. |


* * *

<a name="elementBuilder+hasClass"></a>

### elementBuilder.hasClass(name) ⇒ <code>boolean</code>
Checks whether this element has a class.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: <code>boolean</code> - Whether this element has that class  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The class to check for the presence of. |


* * *

<a name="elementBuilder+classes"></a>

### elementBuilder.classes() ⇒ <code>DOMTokenList</code>
Gets the list of all classes on this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: <code>DOMTokenList</code> - All the classes on this element.  

* * *

<a name="elementBuilder+get"></a>

### elementBuilder.get() ⇒ [<code>elementBuilder</code>](#elementBuilder)
Gets a copy of this element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - A copy of this element  

* * *

<a name="elementBuilder+fromDom"></a>

### elementBuilder.fromDom(element) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Attaches this elementBuilder to another dom element.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - The same elementBuilder it was called on.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>\*</code> | The DOM element to attach to. |


* * *

<a name="elementBuilder+toDom"></a>

### elementBuilder.toDom() ⇒
Gets the underlying DOM element of this elementBuilder.

**Kind**: instance method of [<code>elementBuilder</code>](#elementBuilder)  
**Returns**: The underlying DOM element of this elementBuilder.  

* * *

<a name="reactiveVariable"></a>

## reactiveVariable
An object containing a variable that can be subscribed to.

**Kind**: global class  

* [reactiveVariable](#reactiveVariable)
    * [.get()](#reactiveVariable+get) ⇒
    * [.set(newValue)](#reactiveVariable+set)
    * [.subscribe(notificationHandler)](#reactiveVariable+subscribe)
    * [.notify()](#reactiveVariable+notify)


* * *

<a name="reactiveVariable+get"></a>

### reactiveVariable.get() ⇒
Get the value of this variable.

**Kind**: instance method of [<code>reactiveVariable</code>](#reactiveVariable)  
**Returns**: The value of this variable.  

* * *

<a name="reactiveVariable+set"></a>

### reactiveVariable.set(newValue)
Set the value of this variable.

**Kind**: instance method of [<code>reactiveVariable</code>](#reactiveVariable)  

| Param | Type | Description |
| --- | --- | --- |
| newValue | <code>\*</code> | The new value. |


* * *

<a name="reactiveVariable+subscribe"></a>

### reactiveVariable.subscribe(notificationHandler)
Subscribe to the value of this variable.

**Kind**: instance method of [<code>reactiveVariable</code>](#reactiveVariable)  

| Param | Type |
| --- | --- |
| notificationHandler | <code>\*</code> | 


* * *

<a name="reactiveVariable+notify"></a>

### reactiveVariable.notify()
Trigger all notification handlers.

**Kind**: instance method of [<code>reactiveVariable</code>](#reactiveVariable)  

* * *

<a name="reactiveNumber"></a>

## reactiveNumber
An object containing a number that can be subscribed to.

**Kind**: global class  

* * *

<a name="reactiveList"></a>

## reactiveList
An object containing a list that can be subscribed to.

**Kind**: global class  

* * *

<a name="reactiveQueue"></a>

## reactiveQueue
An object containing a queue that can be subscribed to.

**Kind**: global class  

* * *

<a name="reactiveObject"></a>

## reactiveObject
An object containing an object that can be subscribed to.

**Kind**: global class  

* * *

<a name="_bezier"></a>

## \_bezier(points) ⇒ [<code>BezierCurveObject</code>](#BezierCurveObject)
Produce a bezier curve

**Kind**: global function  
**Returns**: [<code>BezierCurveObject</code>](#BezierCurveObject) - The bezier curve produced.  

| Param | Type | Description |
| --- | --- | --- |
| points | <code>Array.&lt;Array.&lt;number&gt;&gt;</code> | An array of points, where each point is        an array of numbers where each number represents one dimention. |


* * *

<a name="$"></a>

## $(selector) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Selects an element as an [elementBuilder](#elementBuilder).

**Kind**: global function  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - An elementBuilder attached to the dom element associated with the provided selector.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The css selector for an element. |


* * *

<a name="$all"></a>

## $all(selector) ⇒ [<code>Array.&lt;elementBuilder&gt;</code>](#elementBuilder)
**Kind**: global function  
**Returns**: [<code>Array.&lt;elementBuilder&gt;</code>](#elementBuilder) - An array containing whose are attached to the DOM elements associated with the provided selector.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The css selector for a collection of elements. |


* * *

<a name="$css"></a>

## $css(css)
Injects css into the current webpage.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| css | <code>string</code> | The css to be injected. |


* * *

<a name="_"></a>

## \_(type) ⇒ [<code>elementBuilder</code>](#elementBuilder)
Creates a new dom element.

**Kind**: global function  
**Default**: <code>type A div.</code>  
**Returns**: [<code>elementBuilder</code>](#elementBuilder) - An elementBuilder attached to a brand-new dom element of the specified type.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of element to create. |


* * *

<a name="node_impurities"></a>

## node\_impurities()
Inserts a few shims into the global object.

**Kind**: global function  

* * *

<a name="randomItem"></a>

## randomItem(array) ⇒ <code>\*</code>
Gets a random item from an Array.

**Kind**: global function  
**Returns**: <code>\*</code> - A random item from the provided array.  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | The array to get random items from. |


* * *

<a name="randomBetween"></a>

## randomBetween(min, max) ⇒ <code>number</code>
Gets a random number in a range.

**Kind**: global function  
**Returns**: <code>number</code> - A random number between min and max.  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | The minimum number to generate. |
| max | <code>number</code> | The maximum number to generate. |


* * *

<a name="randomString"></a>

## randomString(length) ⇒
Gets a random string.

**Kind**: global function  
**Returns**: A random alphanumeric string.  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | How long the string should be. |


* * *

<a name="$tag"></a>

## $tag(handler) ⇒
Generates a tag for use with tagged templates from a function.

**Kind**: global function  
**Returns**: Whatever the handler returns.  

| Param | Type | Description |
| --- | --- | --- |
| handler | <code>function</code> | A function that takes a string and returns something else. |


* * *

<a name="_var"></a>

## \_var(initialValue) ⇒
Creates a [reactiveVariable](#reactiveVariable) object.

**Kind**: global function  
**Returns**: A [reactiveVariable](#reactiveVariable) object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| initialValue | <code>\*</code> | <code></code> | The initial value. |


* * *

<a name="_num"></a>

## \_num(initialValue) ⇒
Creates a [reactiveNumber](#reactiveNumber) object.

**Kind**: global function  
**Returns**: A [reactiveNumber](#reactiveNumber) object.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| initialValue | <code>Number</code> | <code>0</code> | The initial value. |


* * *

<a name="_list"></a>

## \_list(initialValue) ⇒
Creates a [reactiveList](#reactiveList) object.

**Kind**: global function  
**Returns**: A [reactiveList](#reactiveList) object.  

| Param | Type | Description |
| --- | --- | --- |
| initialValue | <code>Array.&lt;\*&gt;</code> | The initial value. |


* * *

<a name="_queue"></a>

## \_queue(initialValue) ⇒
Creates a [reactiveQueue](#reactiveQueue) object.

**Kind**: global function  
**Returns**: A [reactiveQueue](#reactiveQueue) object.  

| Param | Type | Description |
| --- | --- | --- |
| initialValue | <code>Array.&lt;\*&gt;</code> | The initial value. |


* * *

<a name="_object"></a>

## \_object(initialValue) ⇒
Creates a [reactiveObject](#reactiveObject) object.

**Kind**: global function  
**Returns**: A [reactiveObject](#reactiveObject) object.  

| Param | Type | Description |
| --- | --- | --- |
| initialValue | <code>\*</code> | The initial value. |


* * *

<a name="neutral_impurities"></a>

## neutral\_impurities()
Adds some extra utilities to other types,
including Math.randomString, which is an alias for [randomString](#randomString),
Math.randomBetween, Which is an alias for [randomBetween](#randomBetween),
and Array.prototype.random,
which returns a random item of the array it's called on.

**Kind**: global function  

* * *

<a name="BezierCurveObject"></a>

## BezierCurveObject : <code>Object</code>
A bezier curve

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| get_point | <code>function</code> | Gets a point on the curve,           where n is the positon along the curve from 0 to 1. |
| bake_points | <code>function</code> | Get n number of           evenly spaced points on the curve. |


* * *

