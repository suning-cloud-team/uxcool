/* eslint-disable no-return-assign, no-mixed-operators,no-param-reassign,no-cond-assign */
export function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

export function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

export function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}
/* eslint-enable no-return-assign, no-mixed-operators,no-param-reassign,no-cond-assign */
