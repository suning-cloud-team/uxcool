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

export function offset(elem) {
  let x;
  let y;
  const doc = elem.ownerDocument;
  const { body } = doc;
  const docElem = doc && doc.documentElement;
  const box = elem.getBoundingClientRect();
  x = box.left;
  y = box.top;
  x -= docElem.clientLeft || body.clientLeft || 0;
  y -= docElem.clientTop || body.clientTop || 0;
  const w = doc.defaultView || doc.parentWindow;
  x += getScroll(w, false);
  y += getScroll(w);
  return {
    left: x,
    top: y,
  };
}
