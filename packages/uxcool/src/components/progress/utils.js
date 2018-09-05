export function defaultInfoFormat(percent) {
  return `${percent}%`;
}

export function getCirclePath(pos, radius) {
  const { start, end } = pos;
  return `M 50 50 m ${start.x},${start.y}
          a ${radius},${radius} 0 1 1 ${end.x},${end.y}
          a ${radius},${radius} 0 1 1 ${-1 * end.x},${-1 * end.y}`;
}

export function getPosition(gapPos, radius) {
  let start = {
    x: 0,
    y: -radius,
  };
  let end = {
    x: 0,
    y: 2 * radius,
  };

  switch (gapPos) {
    case 'left':
      start = {
        x: -radius,
        y: 0,
      };
      end = {
        x: 2 * radius,
        y: 0,
      };
      break;
    case 'right':
      start = { x: radius, y: 0 };
      end = {
        x: -2 * radius,
        y: 0,
      };
      break;
    case 'bottom':
      start = {
        x: 0,
        y: radius,
      };
      end = {
        x: 0,
        y: -2 * radius,
      };
      break;
    default:
      break;
  }

  return {
    start,
    end,
  };
}
