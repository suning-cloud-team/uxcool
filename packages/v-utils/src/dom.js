import { isFunction } from './utils';
import { isServerRendering } from './ssr';

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

// compatibility ssr
export function HTMLElementType() {
  const isSSR = isServerRendering();

  return isSSR ? Object : window.HTMLElement;
}

export function resetParentVisible(el) {
  if (!el) {
    return {
      reset() {},
    };
  }
  const updateElements = [];
  let parent = el.parentNode;

  while (parent && parent.nodeType === 1) {
    const { display, width } = getComputedStyle(parent);
    if (display === 'none') {
      updateElements.push(parent);
      parent.style.width = width;
      parent.style.position = 'absolute';
      parent.style.visibility = 'hidden';
      parent.style.height = 'auto';
      parent.style.display = 'block';
    }
    parent = parent.parentNode;
  }

  return {
    reset() {
      updateElements.forEach((elem) => {
        const nElem = elem;
        nElem.style.display = 'none';
        nElem.style.width = null;
        nElem.style.position = null;
        nElem.style.visibility = null;
        nElem.style.height = null;
      });
    },
  };
}

const scrollBarStyle = {
  position: 'absolute',
  left: '-50px',
  width: '50px',
  height: '50px',
  overflow: 'scroll',
  visibility: 'hidden',
};

export function getScrollBarWidth() {
  if (typeof getScrollBarWidth.w !== 'number') {
    const div = document.createElement('div');
    Object.keys(scrollBarStyle).forEach((key) => {
      div.style[key] = scrollBarStyle[key];
    });
    document.body.appendChild(div);
    getScrollBarWidth.w = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }
  return getScrollBarWidth.w;
}
