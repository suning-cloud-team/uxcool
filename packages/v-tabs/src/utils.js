export function isTransform3dSupported() {
  if (window && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    // 不含'msTransform',已排除 IE9, IE9不支持translate3d
    return ['transform', 'MozTransform', 'webkitTransform'].some(v => v in documentElement.style);
  }
  return false;
}

export function getScroll(w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
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
  x += getScroll(w);
  y += getScroll(w, true);
  return {
    left: x,
    top: y,
  };
}

export function isVertical(tabBarPosition) {
  return tabBarPosition === 'left' || tabBarPosition === 'right';
}

export function getElementOffset(element, tabBarPosition) {
  if (!element) {
    return false;
  }
  let prop = { left: 'v1', right: 'v2' };
  if (isVertical(tabBarPosition)) {
    prop = { top: 'v1', bottom: 'v2' };
  }
  const box = element.getBoundingClientRect();

  return Object.keys(prop).reduce((r, k) => {
    const nr = r;
    nr[prop[k]] = box[k];
    return nr;
  }, {});
}

export function getElementWH(element, tabBarPosition) {
  if (!element) {
    return false;
  }

  let prop = 'offsetWidth';
  if (isVertical(tabBarPosition)) {
    prop = 'offsetHeight';
  }
  return element[prop];
}

export function addEventListener(element, eventName, fn) {
  element.addEventListener(eventName, fn);
  return {
    remove() {
      element.removeEventListener(eventName, fn);
    },
  };
}
