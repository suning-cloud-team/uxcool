import { format as formatFn, getHours, getMinutes, getSeconds } from 'date-fns';

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

export function formatDate(value, format = 'YYYY-MM-DD') {
  return formatFn(value, format);
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
