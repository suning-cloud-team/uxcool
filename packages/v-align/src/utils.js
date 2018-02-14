/* eslint import/prefer-default-export:0 */
export function addEventListener(element, eventName, fn) {
  element.addEventListener(eventName, fn);
  return {
    remove() {
      element.removeEventListener(eventName, fn);
    },
  };
}
