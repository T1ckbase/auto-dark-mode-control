// Copyright 2018-2025 the Deno authors. MIT license.

/**
 * @template {Array<any>} T
 * @typedef {Object} DebouncedFunction
 * @property {(...args: T) => void} call - The debounced function call
 * @property {() => void} clear - Clears the debounce timeout and omits calling the debounced function
 * @property {() => void} flush - Clears the debounce timeout and calls the debounced function immediately
 * @property {boolean} pending - Returns a boolean whether a debounce call is pending or not
 */

/**
 * Creates a debounced function that delays the given `func`
 * by a given `wait` time in milliseconds. If the method is called
 * again before the timeout expires, the previous call will be
 * aborted.
 *
 * A debounced function that will be delayed by a given `wait`
 * time in milliseconds. If the method is called again before
 * the timeout expires, the previous call will be aborted.
 *
 * @template {Array<any>} T - The arguments of the provided function
 * @param {function(this: DebouncedFunction<T>, ...T): void} fn - The function to debounce
 * @param {number} wait - The time in milliseconds to delay the function
 * @returns {DebouncedFunction<T>} The debounced function
 */
export function debounce(fn, wait) {
  let timeout = null;
  let flush = null;

  /**
   * @type {DebouncedFunction<T>}
   */
  const debounced = (...args) => {
    debounced.clear();
    flush = () => {
      debounced.clear();
      fn.call(debounced, ...args);
    };
    timeout = Number(setTimeout(flush, wait));
  };

  debounced.clear = () => {
    if (typeof timeout === 'number') {
      clearTimeout(timeout);
      timeout = null;
      flush = null;
    }
  };

  debounced.flush = () => {
    flush?.();
  };

  Object.defineProperty(debounced, 'pending', {
    get: () => typeof timeout === 'number',
  });

  return debounced;
}
