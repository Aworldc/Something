/**
 * Gets a random item from an Array.
 * @param {Array} array The array to get random items from.
 * @returns {*} A random item from the provided array.
 */
export function get_random_item(array: any[]): any;
/**
 * Gets a random number in a range.
 * @param {number} min The minimum number to generate.
 * @param {number} max The maximum number to generate.
 * @returns {number} A random number between min and max.
 */
export function get_random_between(min: number, max: number): number;
/**
 * Gets a random string.
 * @param {number} length How long the string should be.
 * @returns A random alphanumeric string.
 */
export function get_random_string(length: number): string;
/**
 * Generates a tag for use with tagged templates from a function.
 * @param {function} handler A function that takes a string and returns something else.
 * @returns Whatever the handler returns.
 */
export function Tag(handler: Function): (strings: any, ...values: any[]) => any;
export function Variable(initial_value: any): Reactive;
export function subscribe(maybe_reactive: any, handler: any): any;
export function is_reactive(maybe_reactive: any): maybe_reactive is Reactive;
export function noop(): void;
import { Reactive } from './reactivity.js';
//# sourceMappingURL=util.d.ts.map