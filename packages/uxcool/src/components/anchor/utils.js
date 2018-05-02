const REG_ANCHOR_ID = /#[^#]+$/;

export function getAnchorRelateElement(href = '') {
  const matches = href.match(REG_ANCHOR_ID);
  if (!matches) {
    return null;
  }

  return document.querySelector(matches[0]);
}

export function getElementOffsetTop(element, container) {
  let top = 0;
  if (!element || !container) {
    return top;
  }

  const box = element.getBoundingClientRect();
  if (container.window === window) {
    const doc = element.ownerDocument;
    const docElement = doc && doc.documentElement;
    const body = doc && doc.body;
    top = box.top - docElement.clientTop || body.clientTop || 0;
  } else {
    const containerRect = container.getBoundingClientRect();
    top = box.top - containerRect.top;
  }
  return top;
}
