/* eslint-disable no-return-assign, no-mixed-operators,no-param-reassign,no-cond-assign */
export function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

export function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

// t= 已运行时长, b = 起始位置, c= 距离, d=duration
// 详见:http://upshots.org/actionscript/jsas-understanding-easing
export function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}
/* eslint-enable no-return-assign, no-mixed-operators,no-param-reassign,no-cond-assign */
