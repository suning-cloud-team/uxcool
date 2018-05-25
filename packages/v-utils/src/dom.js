export function addEventListener(element, eventName, fn, useCapture = false) {
  element.addEventListener(eventName, fn, useCapture);
  return {
    remove() {
      element.removeEventListener(eventName, fn, useCapture);
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

export function getScroll(w, top = true) {
  let ret = 0;
  if (!w) {
    return ret;
  }
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (w === w.window) {
    ret = w[`page${top ? 'Y' : 'X'}Offset`];
    if (typeof ret !== 'number') {
      const d = w.document;
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        ret = d.body[method];
      }
    }
  } else {
    ret = w[method];
  }
  return ret;
}
