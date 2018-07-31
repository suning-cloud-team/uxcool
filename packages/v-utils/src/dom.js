import { isFunction } from './utils';

export function addEventListener(element, eventName, fn, useCapture = false) {
  element.addEventListener(eventName, fn, useCapture);
  return {
    remove() {
      element.removeEventListener(eventName, fn, useCapture);
    },
  };
}

export function addClass(el, cls) {
  let nCls = cls;
  /* istanbul ignore if */
  if (!nCls || !nCls.trim()) {
    return;
  }
  nCls = nCls.trim();

  /* istanbul ignore else */
  if (el.classList) {
    if (nCls.indexOf(' ') > -1) {
      nCls.split(/\s+/).forEach(c => el.classList.add(c));
    } else {
      el.classList.add(nCls);
    }
  } else {
    const cur = ` ${el.getAttribute('class') || ''} `;
    if (cur.indexOf(` ${nCls} `) < 0) {
      el.setAttribute('class', (cur + nCls).trim());
    }
  }
}

export function removeClass(el, cls) {
  let nCls = cls;
  /* istanbul ignore if */
  if (!nCls || !nCls.trim()) {
    return;
  }

  nCls = nCls.trim();

  /* istanbul ignore else */
  if (el.classList) {
    if (nCls.indexOf(' ') > -1) {
      nCls.split(/\s+/).forEach(c => el.classList.remove(c));
    } else {
      el.classList.remove(nCls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    let cur = ` ${el.getAttribute('class') || ''} `;
    const tar = ` ${nCls} `;
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
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
    width: box.width,
    height: box.height,
  };
}

export function updatePortalElement(portalElement, cb) {
  if (!portalElement) {
    return;
  }
  const nElement = portalElement;
  const originDp = nElement.style.display;
  nElement.style.display = '';
  if (isFunction(cb)) {
    cb();
  }
  nElement.style.display = originDp;
}
