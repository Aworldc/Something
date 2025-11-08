import { ElementBuilder } from './element.js'

/**
 * Selects an element as an {@link ElementBuilder}.
 * @param selector The css selector for an element.
 * @returns An elementBuilder attached to the dom element associated with the provided selector.
 */
export function $(selector: string): ElementBuilder

/**
 *
 * @param selector The css selector for a collection of elements.
 * @returns An array containing whose are attached to the DOM elements associated with the provided selector.
 */
export function $all(selector: string): Array<ElementBuilder>

/**
 * Injects css into the current webpage.
 * @param css The css to be injected.
 * @deprecated Use a css file for large blocks of style or {@link ElementBuilder.style} for inline styles.
 */
export function $css(css: string): void

/**
 * Creates a new dom element.
 * @param type The type of element to create. Defualts to a div
 * @returns An elementBuilder attached to a brand-new dom element of the specified type.
 */
export function _(type?: string): ElementBuilder
