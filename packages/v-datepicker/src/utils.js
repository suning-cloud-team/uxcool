import {
  format as formatFn,
  getHours,
  getMinutes,
  getSeconds,
  isDate,
  setHours,
  setMinutes,
  setSeconds,
} from 'date-fns';

const defaultDisabledTime = {
  disabledHours() {
    return [];
  },
  disabledMinutes() {
    return [];
  },
  disabledSeconds() {
    return [];
  },
};

export function noop() {}

export function formatDate(value, format = 'YYYY-MM-DD', option = {}) {
  return formatFn(value, format, option);
}

export function getTimeConfig(value, disabledTime) {
  let disabledTimeConfig = {};

  if (typeof disabledTime === 'function') {
    disabledTimeConfig = disabledTime(value);
  } else if (disabledTime) {
    disabledTimeConfig = disabledTime;
  }

  disabledTimeConfig = {
    ...defaultDisabledTime,
    ...disabledTimeConfig,
  };
  return disabledTimeConfig;
}

export function isTimeValidByConfig(value, disabledTimeConfig) {
  let invalidTime = false;
  if (value) {
    const hour = getHours(value);
    const minutes = getMinutes(value);
    const seconds = getSeconds(value);
    const disabledHours = disabledTimeConfig.disabledHours();
    if (disabledHours.indexOf(hour) === -1) {
      const disabledMinutes = disabledTimeConfig.disabledMinutes(hour);
      if (disabledMinutes.indexOf(minutes) === -1) {
        const disabledSeconds = disabledTimeConfig.disabledSeconds(hour, minutes);
        invalidTime = disabledSeconds.indexOf(seconds) !== -1;
      } else {
        invalidTime = true;
      }
    } else {
      invalidTime = true;
    }
  }
  return !invalidTime;
}

export function isTimeValid(value, disabledTime) {
  const disabledTimeConfig = getTimeConfig(value, disabledTime);
  return isTimeValidByConfig(value, disabledTimeConfig);
}

export function isAllowedDate(value, disabledDate, disabledTime) {
  if (disabledDate) {
    if (disabledDate(value)) {
      return false;
    }
  }
  if (disabledTime) {
    if (!isTimeValid(value, disabledTime)) {
      return false;
    }
  }
  return true;
}

export function isValidArray(arr, size = 2) {
  if (!arr) {
    return false;
  }
  return Array.isArray(arr) && arr.length === size && arr.every(v => v);
}

export function normalizeDate(value) {
  return isDate(value) ? value : undefined;
}

export function getValidDate(value) {
  let ret = value;
  if (!isDate(ret)) {
    ret = new Date();
  }

  return ret;
}

// 时分秒保持同步
export function syncTime(date, time) {
  if (!isDate(date) || !isDate(time)) {
    return date;
  }

  let result = setHours(date, getHours(time));
  result = setMinutes(result, getMinutes(time));
  result = setSeconds(result, getSeconds(time));

  return result;
}

export { isDate };
