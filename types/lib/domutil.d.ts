/**
 * Selects an element as an {@link ElementBuilder}.
 * @param {string} selector The css selector for an element.
 * @returns {ElementBuilder} An elementBuilder attached to the dom element associated with the provided selector.
 */
export function $(selector: string): ElementBuilder;
/**
 *
 * @param {string} selector The css selector for a collection of elements.
 * @returns {Array<ElementBuilder>} An array containing whose are attached to the DOM elements associated with the provided selector.
 */
export function $all(selector: string): Array<ElementBuilder>;
/**
 * Injects css into the current webpage.
 * @param {string} css The css to be injected.
 * @deprecated
 */
export function $css(css: string): void;
/**
 * Creates a new dom element.
 * @param {string} type The type of element to create.
 * @default type A div.
 * @returns {ElementBuilder} An elementBuilder attached to a brand-new dom element of the specified type.
 */
export function _(type: string): ElementBuilder;
import { ElementBuilder } from './element.js';
//# sourceMappingURL=domutil.d.ts.map