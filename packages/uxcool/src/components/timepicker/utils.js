import { getHours, getMinutes, getSeconds } from 'date-fns';
import { isFunction, raf } from '@suning/v-utils';

const FIELD_HANDLE_METHODS = {
  hour: getHours,
  minute: getMinutes,
  second: getSeconds,
};

export function noop() {}

export function leftPad(str, len = 2, fill = '0') {
  let nStr = String(str);

  while (nStr.length < len) {
    nStr = `${fill}${nStr}`;
  }
  return nStr;
}

export function getValueByFieldName(fieldName, value) {
  const ret = -1;
  if (!(value instanceof Date)) {
    return ret;
  }

  const fn = FIELD_HANDLE_METHODS[fieldName];
  return isFunction(fn) ? fn(value) : ret;
}

export function generateList(
  cnt = 0,
  value = -1,
  disabledList = [],
  hideDisabledItem = false,
  step = 1
) {
  const nStep = Number(step) > 0 ? Number(step) : 1;
  const disabledObj = disabledList.reduce((r, v) => {
    const nr = r;
    nr[String(v)] = 1;
    return nr;
  }, {});
  const list = [];
  for (let i = 0; i < cnt; i += nStep) {
    const isDisabled = String(i) in disabledObj;
    if (!isDisabled || !hideDisabledItem) {
      list.push({
        value: leftPad(i),
        isDisabled,
        isSelected: String(i) === String(value),
      });
    }
  }
  return list;
}

export function scrollTo(element, offset, duration) {
  const nElm = element;
  let nDuration = duration;
  function next() {
    if (nDuration <= 0) {
      nElm.scrollTop = offset;
      return;
    }
    const { scrollTop } = nElm;
    const distance = offset - scrollTop;
    // eslint-disable-next-line
    const per = distance / nDuration * 10;
    const to = scrollTop + per;
    nElm.scrollTop = to;
    nDuration -= 10;
    if (to !== offset) {
      raf(next);
    }
  }
  next();
}

export function updatePortalElement(portalElement, cb) {
  if (!portalElement) {
    return;
  }
  const nElement = portalElement;
  const originDp = nElement.style.display;
  nElement.style.display = '';
  if (isFunction(cb)) {
    cb();
  }
  nElement.style.display = originDp;
}

const token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
const twoDigits = /\d\d?/;
const threeDigits = /\d{3}/;
const fourDigits = /\d{4}/;
const word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF/]+(\s*?[\u0600-\u06FF]+){1,2}/i;

/* eslint-disable no-param-reassign */
const parseFlags = {
  d: [
    twoDigits,
    (d, v) => {
      d.day = v;
    },
  ],
  M: [
    twoDigits,
    (d, v) => {
      d.month = v - 1;
    },
  ],
  yy: [
    twoDigits,
    (d, v) => {
      const da = new Date();
      const cent = +`${da.getFullYear()}`.substr(0, 2);
      d.year = `${v > 68 ? cent - 1 : cent}${v}`;
    },
  ],
  h: [
    twoDigits,
    (d, v) => {
      d.hour = v;
    },
  ],
  m: [
    twoDigits,
    (d, v) => {
      d.minute = v;
    },
  ],
  s: [
    twoDigits,
    (d, v) => {
      d.second = v;
    },
  ],
  yyyy: [
    fourDigits,
    (d, v) => {
      d.year = v;
    },
  ],
  S: [
    /\d/,
    (d, v) => {
      d.millisecond = v * 100;
    },
  ],
  SS: [
    /\d{2}/,
    (d, v) => {
      d.millisecond = v * 10;
    },
  ],
  SSS: [
    threeDigits,
    (d, v) => {
      d.millisecond = v;
    },
  ],
  D: [twoDigits, noop],
  ddd: [word, noop],
  // MMM: [word, monthUpdate('monthNamesShort')],
  // MMMM: [word, monthUpdate('monthNames')],
  a: [
    word,
    (d, v, i18n = { amPm: ['am', 'pm'] }) => {
      const val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        d.isPm = false;
      } else if (val === i18n.amPm[1]) {
        d.isPm = true;
      }
    },
  ],
  ZZ: [
    /[+-]\d\d:?\d\d/,
    (d, v) => {
      const parts = `${v}`.match(/([+-]|\d\d)/gi);
      let minutes;
      if (parts) {
        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    },
  ],
};
/* eslint-enable no-param-reassign */
parseFlags.DD = parseFlags.D;
parseFlags.dddd = parseFlags.ddd;
parseFlags.dd = parseFlags.d;
parseFlags.Do = parseFlags.dd;
parseFlags.mm = parseFlags.m;
parseFlags.HH = parseFlags.h;
parseFlags.hh = parseFlags.h;
parseFlags.H = parseFlags.h;
parseFlags.MM = parseFlags.M;
parseFlags.ss = parseFlags.s;
parseFlags.A = parseFlags.a;

export function parseDate(str, format) {
  if (typeof format !== 'string') {
    throw new Error('Invalid format in parseDate function');
  }
  let nStr = str;

  // Avoid regular expression denial of service, fail early for really long strings
  // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
  if (nStr.length > 1000) {
    return false;
  }

  let isValid = true;
  const dateInfo = {};
  format.replace(token, (t) => {
    if (parseFlags[t]) {
      const info = parseFlags[t];
      const index = nStr.search(info[0]);
      if (index === -1) {
        isValid = false;
      } else {
        nStr.replace(info[0], (result) => {
          info[1](dateInfo, result);
          nStr = nStr.substr(index + result.length);
          return result;
        });
      }
    }
    return '';
  });

  if (!isValid) {
    return false;
  }

  if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12;
  } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
    dateInfo.hour = 0;
  }

  return dateInfo;
}
