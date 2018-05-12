import isNaN from 'lodash/isNaN';

export { isNaN };

export function isNotCompleteNumber(v) {
  return (
    isNaN(Number(v)) ||
    v === '' ||
    v === null ||
    v === undefined ||
    (v && v.toString().slice('.') === v.length - 1)
  );
}

export function getPrecision(val, defaultPrecision = null) {
  if (defaultPrecision !== null) {
    return defaultPrecision;
  }

  let valStr = val.toString();
  let eDigit = 0;
  if (/e-/.test(valStr)) {
    [valStr, eDigit] = valStr.split('e-');
  }

  let decimal = 0;
  if (/\./.test(valStr)) {
    decimal = parseInt(valStr.split('.')[1].length, 10);
  }

  return decimal + eDigit;
}

export function getMaxPrecision(val, step, ratio = 1, defaultPrecision = null) {
  if (defaultPrecision !== null) {
    return defaultPrecision;
  }

  const stepPrecision = getPrecision(step);
  const ratioPrecision = getPrecision(ratio);
  const valPrecision = getPrecision(val);

  return Math.max(valPrecision, stepPrecision + ratioPrecision);
}

export function getRatio(e) {
  let ratio = 1;
  if (e.metaKey || e.ctrlKey) {
    ratio = 0.1;
  } else if (e.shiftKey) {
    ratio = 10;
  }
  return ratio;
}
