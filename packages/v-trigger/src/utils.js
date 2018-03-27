export function vNodeIsComponent(vnode) {
  const { componentOptions } = vnode;
  if (!componentOptions) {
    return false;
  }
  return true;
}

export function noop() {}

export function addEventListener(element, eventName, fn) {
  element.addEventListener(eventName, fn, false);
  return {
    remove() {
      element.removeEventListener(eventName, fn);
    },
  };
}

function isPointsEq(a1, a2) {
  return a1[0] === a2[0] && a1[1] === a2[1];
}

export function getClassNameFromAlign(builtinPlacements, prefixCls, align) {
  const { points } = align;
  const placements = Object.keys(builtinPlacements).filter(v =>
  isPointsEq(builtinPlacements[v].points, points));

  if (placements.length > 0) {
    return `${prefixCls}-placement-${placements[0]}`;
  }

  return '';
}
