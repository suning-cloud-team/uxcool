export function isFlexSupported() {
  if (window && window.document && window.document.documentElement) {
    const { documentElement } = window.document;
    return ['flex', 'webkitFlex', 'Flex', 'msFlex'].some(v => v in documentElement.style);
  }
  return false;
}

export function getStyleComputedProperty(el, property) {
  if (!el || el.nodeType !== 1) {
    return [];
  }
  const style = window.getComputedStyle(el, null);
  return property ? style[property] : style;
}
