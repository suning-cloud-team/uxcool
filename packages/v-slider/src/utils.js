// eslint-disable-next-line
export function preventEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}

export function getMousePosition(e, isVertical = false) {
  return isVertical ? e.clientY : e.clientX;
}

export function getTouchPosition(e, isVertical = false) {
  const finger = e.touches[0];
  if (finger) {
    return 0;
  }
  return isVertical ? finger.clientY : finger.clientX;
}

export function isTargetEvent(e, handleRefs) {
  if (!handleRefs) {
    return false;
  }
  const nHandleRefs = Array.isArray(handleRefs) ? handleRefs : [handleRefs];
  return nHandleRefs.some(v => v.$el === e.target);
}

export function getHandleCenterPosition(vertical, handle) {
  const coords = handle.getBoundingClientRect();
  // eslint-disable-next-line
  return vertical ? coords.top + coords.height / 2 : coords.left + coords.width / 2;
}

export function getPositionAndDragOffset(e, isVertical = false, isTarget = false, type = 'mouse') {
  let pos = getMousePosition(e, isVertical);
  let dragOffset = 0;
  if (type === 'touch') {
    pos = getTouchPosition(e, isVertical);
  }

  if (isTarget) {
    const handlePosition = getHandleCenterPosition(isVertical, e.target);
    dragOffset = pos - handlePosition;
    pos = handlePosition;
  }
  return { position: pos, dragOffset };
}

export function getClosestPoint(val, marks, step, min) {
  const points = Object.keys(marks).map(parseFloat);
  if (step !== false) {
    // eslint-disable-next-line
    const closestStep = Math.round((val - min) / step) * step + min;
    points.push(closestStep);
  }
  const diffs = points.map(point => Math.abs(val - point));
  return points[diffs.indexOf(Math.min(...diffs))];
}

export function getPrecision(step) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

export function ensureValueInRange(val, max, min) {
  if (val <= min) {
    return min;
  }
  if (val >= max) {
    return max;
  }
  return val;
}

export function ensureValuePrecision(val, { step, marks, min }) {
  const closestPoint = getClosestPoint(val, marks, step, min);
  return step === false ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

export function isValueOutOfRange(value, min, max) {
  return value < min || value > max;
}

export function isMarkActive(point, included, lowerBound, upperBound) {
  return (
    (!included && point === upperBound) ||
    (included && (point >= lowerBound && point <= upperBound))
  );
}

// 确定需要移动的点
export function getNeedMovePoint(val, points = []) {
  let idx = -1;
  for (let i = 0, l = points.length; i < l; i += 1) {
    if (val < points[i]) {
      idx = i;
      break;
    }
  }
  // 排除左右(上下)两侧的点击
  if (idx !== 0 && idx !== -1) {
    // 在区间中,移动最靠近的点
    if (points[idx] - val >= val - points[idx - 1]) {
      idx -= 1;
    }
  }

  // idx = -1 表示点击了最右(上))侧
  if (idx === -1) {
    idx = points.length - 1;
  }

  return idx;
}
