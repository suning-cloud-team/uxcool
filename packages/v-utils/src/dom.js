export function addEventListener(element, eventName, fn) {
  element.addEventListener(eventName, fn);
  return {
    remove() {
      element.removeEventListener(eventName, fn);
    },
  };
}

export function isTransform3dSupported() {
  if (window && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    // 不含'msTransform',已排除 IE9, IE9不支持translate3d
    return ['transform', 'MozTransform', 'webkitTransform'].some(v => v in documentElement.style);
  }
  return false;
}
