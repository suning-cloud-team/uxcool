import {
  differenceInMilliseconds,
  format as formatDate,
  subMilliseconds,
  addMilliseconds,
  isDate,
  isBefore,
  isAfter,
  isSameDay,
  isSameHour,
  isSameMinute,
  getHours,
  setHours,
  getMinutes,
  getSeconds,
  setMinutes,
  setSeconds,
} from 'date-fns';
import HumanizeDuration from 'humanize-duration';
import ms from 'ms';
import {
  isFunction, isArray, isString, isEqual, warning
} from '@cloud-sn/v-utils';
import { VRangeDatePicker } from '@cloud-sn/v-datepicker';
import omit from 'object.omit';
import localeCN from './locale/zh_CN';
import Select from '../select';
import Button from '../button';
import Icon from '../icon';
import Row from '../grid';
import Tag from '../tag';

const shortDuration = HumanizeDuration.humanizer({
  language: 'shortEN',
  languages: {
    shortEN: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
  delimiter: '',
  spacer: '',
  round: true,
  units: ['d', 'h', 'm', 's'],
});
function getDates(values) {
  let dates = values;
  if (isFunction(dates)) {
    dates = dates();
  }
  return dates;
}

function calcDuration(values = []) {
  const dates = getDates(values);
  const diffTime = Math.abs(differenceInMilliseconds(dates[0], dates[1])) || 0;
  return {
    diffTime,
    duration: shortDuration(diffTime),
  };
}

function getFormatDateStr(values = [], format) {
  return values.map((v) => formatDate(v, format)).join('~');
}

function isUnSelectOption(value) {
  return value === 'setting';
}

function getValidDate(value) {
  const date = getDates(value);
  return isDate(date) ? date : null;
}

function getSliderMinValidDate(
  startDate,
  endDate,
  diffTime,
  compatibility,
  minDate,
  originStartDate,
  originEndDate
) {
  let [sliderStartDate, sliderEndDate] = [startDate, endDate];
  if (isBefore(sliderStartDate, minDate)) {
    [sliderStartDate, sliderEndDate] = [originStartDate, originEndDate];
    if (compatibility) {
      [sliderStartDate, sliderEndDate] = [minDate, addMilliseconds(minDate, diffTime)];
    }
  }

  return [sliderStartDate, sliderEndDate];
}

function getSliderMaxValidDate(
  startDate,
  endDate,
  diffTime,
  compatibility,
  maxDate,
  originStartDate,
  originEndDate
) {
  let [sliderStartDate, sliderEndDate] = [startDate, endDate];
  if (isAfter(sliderEndDate, maxDate)) {
    [sliderStartDate, sliderEndDate] = [originStartDate, originEndDate];
    if (compatibility) {
      [sliderStartDate, sliderEndDate] = [subMilliseconds(maxDate, diffTime), maxDate];
    }
  }
  return [sliderStartDate, sliderEndDate];
}

function getSliderDate(
  startDate,
  endDate,
  diffTime,
  compatibility,
  minDate,
  maxDate,
  originStartDate,
  originEndDate
) {
  let [sliderStartDate, sliderEndDate] = [startDate, endDate];
  if (minDate && maxDate) {
    const time = Math.abs(differenceInMilliseconds(maxDate, minDate)) || 0;
    if (time < diffTime) {
      [sliderStartDate, sliderEndDate] = [originStartDate, originEndDate];
    } else {
      [sliderStartDate, sliderEndDate] = getSliderMinValidDate(
        sliderStartDate,
        sliderEndDate,
        diffTime,
        compatibility,
        minDate,
        originStartDate,
        originEndDate
      );

      [sliderStartDate, sliderEndDate] = getSliderMaxValidDate(
        sliderStartDate,
        sliderEndDate,
        diffTime,
        compatibility,
        maxDate,
        originStartDate,
        originEndDate
      );
    }
  } else if (minDate) {
    [sliderStartDate, sliderEndDate] = getSliderMinValidDate(
      sliderStartDate,
      sliderEndDate,
      diffTime,
      compatibility,
      minDate,
      originStartDate,
      originEndDate
    );
  } else if (maxDate) {
    [sliderStartDate, sliderEndDate] = getSliderMaxValidDate(
      sliderStartDate,
      sliderEndDate,
      diffTime,
      compatibility,
      maxDate,
      originStartDate,
      originEndDate
    );
  }

  return [sliderStartDate, sliderEndDate];
}

function getDisabledHours(selectedDate, minDate, maxDate, hours) {
  let disabledHours = [];
  if (minDate && maxDate) {
    if (isSameDay(selectedDate, minDate) && isSameDay(selectedDate, maxDate)) {
      const minHour = getHours(minDate);
      const maxHour = getHours(maxDate);

      disabledHours = [...hours.slice(0, minHour), ...hours.slice(maxHour + 1)];
    } else if (isSameDay(selectedDate, minDate)) {
      disabledHours = hours.slice(0, getHours(minDate));
    } else if (isSameDay(selectedDate, maxDate)) {
      disabledHours = hours.slice(getHours(maxDate) + 1);
    }
  } else if (minDate && isSameDay(selectedDate, minDate)) {
    disabledHours = hours.slice(0, getHours(minDate));
  } else if (maxDate && isSameDay(selectedDate, maxDate)) {
    disabledHours = hours.slice(getHours(maxDate) + 1);
  }

  return disabledHours;
}

function getDisabledMinutes(selectedDate, minDate, maxDate, minutes) {
  let disabledMinutes = [];
  if (minDate && maxDate) {
    if (isSameHour(selectedDate, minDate) && isSameHour(selectedDate, maxDate)) {
      const minMinutes = getMinutes(minDate);
      const maxMinutes = getMinutes(maxDate);

      disabledMinutes = [...minutes.slice(0, minMinutes), ...minutes.slice(maxMinutes + 1)];
    } else if (isSameHour(selectedDate, minDate)) {
      disabledMinutes = minutes.slice(0, getMinutes(minDate));
    } else if (isSameHour(selectedDate, maxDate)) {
      disabledMinutes = minutes.slice(getMinutes(maxDate) + 1);
    } else if (
      isBefore(selectedDate, setSeconds(setMinutes(minDate, 0), 0))
      || isAfter(selectedDate, setSeconds(setMinutes(maxDate, 0), 0))
    ) {
      disabledMinutes = [...minutes];
    }
  } else if (minDate) {
    if (isSameHour(selectedDate, minDate)) {
      disabledMinutes = minutes.slice(0, getMinutes(minDate));
    } else if (isBefore(selectedDate, setSeconds(setMinutes(minDate, 0), 0))) {
      disabledMinutes = [...minutes];
    }
  } else if (maxDate) {
    if (isSameHour(selectedDate, maxDate)) {
      disabledMinutes = minutes.slice(getMinutes(maxDate) + 1);
    } else if (isAfter(selectedDate, setSeconds(setMinutes(maxDate, 0), 0))) {
      disabledMinutes = [...minutes];
    }
  }

  return disabledMinutes;
}

function getDisabledSeconds(selectedDate, minDate, maxDate, seconds) {
  let disabledSeconds = [];
  if (minDate && maxDate) {
    if (isSameMinute(selectedDate, minDate) && isSameMinute(selectedDate, maxDate)) {
      const minSeconds = getSeconds(minDate);
      const maxSeconds = getSeconds(maxDate);

      disabledSeconds = [...seconds.slice(0, minSeconds), ...seconds.slice(maxSeconds + 1)];
    } else if (isSameMinute(selectedDate, minDate)) {
      disabledSeconds = seconds.slice(0, getSeconds(minDate));
    } else if (isSameMinute(selectedDate, maxDate)) {
      disabledSeconds = seconds.slice(getSeconds(maxDate) + 1);
    } else if (
      isBefore(selectedDate, setSeconds(minDate, 0))
      || isAfter(selectedDate, setSeconds(maxDate, 0))
    ) {
      disabledSeconds = [...seconds];
    }
  } else if (minDate) {
    if (isSameMinute(selectedDate, minDate)) {
      disabledSeconds = seconds.slice(0, getSeconds(minDate));
    } else if (isBefore(selectedDate, setSeconds(minDate, 0))) {
      disabledSeconds = [...seconds];
    }
  } else if (maxDate) {
    if (isSameMinute(selectedDate, maxDate)) {
      disabledSeconds = seconds.slice(getSeconds(maxDate) + 1);
    } else if (isAfter(selectedDate, setSeconds(maxDate, 0))) {
      disabledSeconds = [...seconds];
    }
  }

  return disabledSeconds;
}

function getNumArr(len) {
  return Array.apply(this, { length: len }).map((_, i) => i);
}

const defaultMaxHistoryLen = 5;
const defaultOptions = [
  {
    value: 'setting',
    label: '设置时间范围',
  },
];
const hours = getNumArr(24);
const minutes = getNumArr(60);
const seconds = getNumArr(60);

const REFRESH_OFF = 'REFRESH_OFF';
const DEFAULT_REFRESH_OPTIONS = {
  value: REFRESH_OFF,
  label: 'off',
};

export default {
  name: 'SliderRangeDatePicker',
  props: {
    prefixCls: {
      type: String,
      default: 'ux-calendar',
    },
    value: {
      type: [String, Array],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    transition: {
      type: String,
      default: 'slide-up',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    showTime: {
      type: [Boolean, Object],
      default: true,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default() {
        return this.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
      },
    },
    showSliderBar: {
      type: Boolean,
      default: true,
    },
    /**
     * [{
     *   title: '',
     *   value: '',
     *   label: '',
     *   duration: '1h',
     *   isRefresh: false,
     *   dates(){ return [subHours(new Date(), 1), new Date()]; }
     * }]
     */
    ranges: {
      type: Array,
      default() {
        return [];
      },
    },
    maxHistoryLen: {
      type: [Number, String],
      default: defaultMaxHistoryLen,
    },
    reverseHistory: {
      type: Boolean,
      default: false,
    },
    maxSliderDate: {
      type: [Date, Function],
      default() {
        return () => new Date();
      },
    },
    minSliderDate: {
      type: [Date, Function],
      default: null,
    },
    compatibility: {
      type: Boolean,
      default: false,
    },
    datePickerProps: {
      type: Object,
      default() {
        return {};
      },
    },
    datePickerEvents: {
      type: Object,
      default() {
        return {};
      },
    },
    locale: {
      type: Object,
      default() {
        return localeCN.lang;
      },
    },
    refreshTimes: {
      type: Array,
      default() {
        return [];
      },
    },
    // 支持非自动刷新时间段,自动刷新
    forceRefresh: {
      type: Boolean,
      default: false,
    },
    refreshValue: {
      type: String,
      default: REFRESH_OFF,
    },
    renderRefreshLabel: {
      type: Function,
      default: null,
    },
    // 手动刷新按钮
    showRefreshBar: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerVisible: false,
      innerDateVisible: false,
      innerValue: [],
      innerSelectValue: '',
      innerSelectOption: null,
      opMidMode: 'pause',
      opDisabled: {
        left: false,
        mid: true,
        right: false,
      },
      /**
       * {
       * title: formatDateStrs,
       * value: val,
       * duration,
       * // ms
       * diffTime,
       * label: formatDateStrs,
       * isRefresh: false,
       * dates: values,
       * }
       */
      dataSource: [...defaultOptions],

      // refresh 实际的值
      refreshRealValue: '',
      refreshRealOption: null,
      // refresh 当前的值, 当选择的时间不支持refresh时,此值修改
      refreshCurrentValue: '',
      refreshVisible: false,
    };
  },
  computed: {
    isCanSlide() {
      return !!this.innerSelectValue;
    },
    isNeedRefresh() {
      const { refreshTimes } = this;
      return isArray(refreshTimes) && refreshTimes.length > 0;
    },
    normalizeRefreshTimes() {
      const { refreshTimes, isNeedRefresh } = this;

      if (!isNeedRefresh) {
        return [];
      }

      const times = refreshTimes
        .filter((v) => v.value)
        .reduce((r, v) => {
          const { value, label } = v;
          const nr = r;
          const val = String(value || '')
            .trim()
            .replace(/^[^\d]/, '');
          const raw = ms(val);
          if (raw) {
            nr.push({
              ...v,
              value,
              label: label || value,
              ms: raw,
              origin: { ...v },
            });
          } else if (process.env.NODE_ENV !== 'production') {
            warning(false, `refresh-times invalid prop: ${value}`);
          }
          return nr;
        }, []);
      times.unshift({ ...DEFAULT_REFRESH_OPTIONS });
      return times;
    },
    isRefreshDisabled() {
      const {
        isNeedRefresh, forceRefresh, refreshRealValue, refreshCurrentValue, disabled
      } = this;
      if (!isNeedRefresh) {
        return true;
      }
      return (!forceRefresh && refreshRealValue !== refreshCurrentValue) || disabled;
    },
  },
  watch: {
    value(nVal) {
      const { normalizeValue, innerValue } = this;
      if (!isEqual(innerValue, nVal)) {
        normalizeValue(nVal);
      }
    },
    innerSelectOption() {
      const { resetRefresh } = this;
      resetRefresh();
    },
    isNeedRefresh(nVal) {
      const { refreshRealValue, resetInnerRefreshValue, clearRefreshTimer } = this;
      if (nVal) {
        resetInnerRefreshValue(refreshRealValue);
      } else {
        clearRefreshTimer();
      }
    },
    refreshValue(nVal) {
      this.resetInnerRefreshValue(nVal);
    },
    disabled(nVal) {
      const { clearRefreshTimer, resetRefresh } = this;
      if (nVal === true) {
        clearRefreshTimer();
      } else {
        resetRefresh();
      }
    },
    forceRefresh() {
      const { innerSelectOption, resetRefresh } = this;
      if (innerSelectOption) {
        const { isRefresh } = innerSelectOption;
        if (!isRefresh) {
          resetRefresh();
        }
      }
    },
  },
  created() {
    const {
      normalizeValue, value, refreshValue, resetInnerRefreshValue
    } = this;
    // no reactive
    this.originSlideOption = null;
    this.refreshTimer = null;
    // no reactive
    normalizeValue(value);
    resetInnerRefreshValue(refreshValue);
  },
  beforeDestroy() {
    this.clearRefreshTimer();
  },
  methods: {
    resetInnerRefreshValue(value) {
      const {
        isNeedRefresh,
        normalizeRefreshTimes,
        setRefreshRealValue,
        setRefreshCurrentValue,
        resetRefresh,
      } = this;

      if (isNeedRefresh) {
        let rVal = value;
        let refreshOption = normalizeRefreshTimes.filter((v) => v.value === rVal)[0];
        if (!refreshOption) {
          if (process.env.NODE_ENV !== 'production') {
            warning(false, `refreshValue invalid: ${value}`);
          }
          rVal = REFRESH_OFF;
          refreshOption = { ...DEFAULT_REFRESH_OPTIONS };
        }
        setRefreshRealValue(rVal, refreshOption);
        setRefreshCurrentValue(rVal);
        resetRefresh();
      }
    },
    getDisabledDateAndTime() {
      const { maxSliderDate, minSliderDate } = this;
      const minDate = getValidDate(minSliderDate);
      const maxDate = getValidDate(maxSliderDate);

      return {
        disabledDate(current) {
          if (minDate && maxDate) {
            return current && (isBefore(current, minDate) || isAfter(current, maxDate));
          }
          if (minDate) {
            return current && isBefore(current, minDate);
          }
          if (maxDate) {
            return current && isAfter(current, maxDate);
          }
          return false;
        },
        disabledTime(values, type) {
          const [startDate, endDate] = values;
          if (type === 'start') {
            return {
              disabledHours() {
                return getDisabledHours(startDate, minDate, maxDate, hours);
              },
              disabledMinutes(hour) {
                return getDisabledMinutes(setHours(startDate, hour), minDate, maxDate, minutes);
              },
              disabledSeconds(hour, minute) {
                return getDisabledSeconds(
                  setMinutes(setHours(startDate, hour), minute),
                  minDate,
                  maxDate,
                  seconds
                );
              },
            };
          }

          return {
            disabledHours() {
              return getDisabledHours(endDate, minDate, maxDate, hours);
            },
            disabledMinutes(hour) {
              return getDisabledMinutes(setHours(endDate, hour), minDate, maxDate, minutes);
            },
            disabledSeconds(hour, minute) {
              return getDisabledSeconds(
                setMinutes(setHours(endDate, hour), minute),
                minDate,
                maxDate,
                seconds
              );
            },
          };
        },
      };
    },
    normalizeValue(value) {
      const { ranges, updateSelectValue, updateSelectHistoryValue } = this;
      const ret = value;

      if (isString(value) && ranges) {
        const range = ranges.filter((v) => {
          if (v.value) {
            return v.value === value;
          }
          return v.label === value;
        })[0] || null;
        if (range) {
          const { dates } = range;
          const nDates = getDates(dates);
          updateSelectValue(nDates, 'quick-select', true, range);
        }
      } else if (isArray(value) && value.length >= 2) {
        updateSelectValue(value, 'normal', false);
      } else {
        updateSelectHistoryValue(undefined);
      }
      return ret;
    },
    setInnerValue(values, trigger = true) {
      this.innerValue = values;
      if (trigger) {
        this.$emit('input', values);
        this.$emit('change', values);
      }
    },
    findOptionByValue(value) {
      return this.dataSource.filter((v) => v.value === value)[0] || null;
    },
    setInnerSelectValue(value, from = 'normal') {
      const { findOptionByValue } = this;
      this.innerSelectValue = value;
      if (!isUnSelectOption(value)) {
        const item = findOptionByValue(value);
        this.innerSelectOption = item;
        this.$emit('select', value, item);
        // from : slide 滑动触发, normal 选择触发
        if (from === 'normal') {
          this.originSlideOption = null;
          const opDisabled = {
            mid: true,
          };
          if (item && item.dateType === 'quick-select') {
            opDisabled.right = true;
          }
          this.opDisabled = opDisabled;
        }
      }
    },
    setInnerDateVisible(visible) {
      this.innerDateVisible = visible;
    },
    setRefreshRealValue(value, option) {
      const { refreshRealValue } = this;
      this.refreshRealValue = value;
      this.refreshRealOption = option;
      if (refreshRealValue !== value) {
        this.$emit('refresh-value-change', value);
      }
    },
    setRefreshCurrentValue(value) {
      const { refreshCurrentValue } = this;
      this.refreshCurrentValue = value;
      if (refreshCurrentValue !== value) {
        this.$emit('refresh-current-change', value);
      }
    },
    onDateOpenChange(visible) {
      this.setInnerDateVisible(visible);
    },
    onSelectVisibleChange(visible) {
      if (!visible) {
        this.refreshVisible = false;
      }
    },
    onRefreshVisibleChange(visible) {
      this.refreshVisible = visible;
    },
    updateSelectHistoryValue(val) {
      const { setInnerSelectValue, findOptionByValue, setInnerValue } = this;
      setInnerSelectValue(val);
      // clear
      if (val === undefined) {
        setInnerValue([]);
      } else {
        const item = findOptionByValue(val);
        if (item) {
          const { dates } = item;
          const values = getDates(dates);
          setInnerValue(values || []);
        }
      }
      // 防止重新选择时间时状态不对
      this.opMidMode = 'pause';
    },
    onSelectChange(_, val) {
      const { setInnerSelectValue, innerSelectValue } = this;
      // hack 使光标不选中setting对应的选项
      if (isUnSelectOption(val)) {
        setInnerSelectValue(val);
        setTimeout(() => {
          setInnerSelectValue(innerSelectValue, 'reset');
        }, 0);
      }
    },
    onSelect(_, node) {
      const { value } = node;
      if (isUnSelectOption(value)) {
        this.setInnerDateVisible(true);
      } else {
        this.updateSelectHistoryValue(value);
      }
    },
    onClear() {
      this.updateSelectHistoryValue(undefined);
    },
    onBaseBtnClick(mode, type = 'left') {
      const {
        innerSelectOption,
        originSlideOption,
        innerValue,
        updateSelectValue,
        minSliderDate,
        maxSliderDate,
        compatibility,
      } = this;
      this.opMidMode = mode;
      this.opDisabled.mid = false;
      let option = originSlideOption;
      if (!option) {
        option = innerSelectOption;
        this.originSlideOption = innerSelectOption;
      }

      if (option) {
        const { diffTime } = option;
        const [startDate, endDate] = innerValue;
        const minDate = getValidDate(minSliderDate);
        const maxDate = getValidDate(maxSliderDate);

        const [sliderStartDate, sliderEndDate] = type === 'left'
          ? [subMilliseconds(startDate, diffTime), startDate]
          : [endDate, addMilliseconds(endDate, diffTime)];

        const dates = getSliderDate(
          sliderStartDate,
          sliderEndDate,
          diffTime,
          compatibility,
          minDate,
          maxDate,
          startDate,
          endDate
        );

        updateSelectValue(dates, 'normal', true, null, 'slide', {
          UNRENDER_OTPION: true,
        });
      }
    },
    onLeftBtnClick() {
      const { isCanSlide, onBaseBtnClick } = this;
      if (!isCanSlide) {
        return;
      }
      this.opDisabled.right = false;
      onBaseBtnClick('run', 'left');
    },
    onMidBtnClick() {
      const {
        isCanSlide,
        opMidMode,
        onBaseBtnClick,
        originSlideOption,
        setInnerSelectValue,
        setInnerValue,
      } = this;
      if (!isCanSlide) {
        return;
      }
      onBaseBtnClick(opMidMode === 'run' ? 'pause' : 'run');
      if (originSlideOption) {
        const { value, dates } = originSlideOption;
        setInnerSelectValue(value);
        setInnerValue(getDates(dates));
      }
    },
    onRightBtnClick() {
      const { isCanSlide, onBaseBtnClick } = this;
      if (!isCanSlide) {
        return;
      }
      onBaseBtnClick('run', 'right');
    },

    renderSelectLabel({ value, duration, label }) {
      const { prefixCls } = this;
      return value === 'setting' ? (
        <div class={`${prefixCls}-slider-setting`}>
          <Icon type="calendar" />
          <span class={`${prefixCls}-slider-setting-label`}>{label}</span>
        </div>
      ) : (
        <div>
          {duration ? <Tag>{duration}</Tag> : ''}
          <span class={`${prefixCls}-slider-select-label`}>{label}</span>
        </div>
      );
    },
    onRefreshSelectInput(val, option) {
      const { setRefreshRealValue, setRefreshCurrentValue, resetRefresh } = this;
      setRefreshRealValue(val, option);
      setRefreshCurrentValue(val);
      resetRefresh();
    },
    renderRefreshSetting() {
      const {
        normalizeRefreshTimes,
        isRefreshDisabled,
        getPopupContainer,
        refreshCurrentValue,
        onRefreshSelectInput,
        refreshVisible,
        onRefreshVisibleChange,
      } = this;
      const props = {
        value: refreshCurrentValue,
        dataSource: normalizeRefreshTimes,
        disabled: isRefreshDisabled,
        getContainer: getPopupContainer,
        size: 'small',
        visible: refreshVisible,
      };
      const on = {
        input: onRefreshSelectInput,
        'popup-visible-change': onRefreshVisibleChange,
      };
      return (
        <div>
          <span>刷新频率: </span>
          <Select {...{ style: { 'min-width': '80px' }, props, on }} />
        </div>
      );
    },
    onIntervalRefresh(calcDates, delay, refreshOption) {
      const { innerValue } = this;
      this.setInnerValue(calcDates, !isEqual(calcDates, innerValue));
      this.$emit('interval-refresh', calcDates, delay, refreshOption);
    },
    onManualRefresh() {
      const { innerValue, innerSelectOption, resetRefresh } = this;

      if (innerSelectOption) {
        const { dates } = innerSelectOption;
        const values = getDates(dates);
        this.setInnerValue(values, !isEqual(values, innerValue));
        resetRefresh();
        this.$emit('manual-refresh', values);
      }
    },
    clearRefreshTimer() {
      const { refreshTimer } = this;
      if (refreshTimer) {
        clearTimeout(refreshTimer);
        this.refreshTimer = null;
      }
    },
    setRefreshTimer(refreshRealOption, dates) {
      const { clearRefreshTimer, onIntervalRefresh } = this;
      clearRefreshTimer();
      const { ms: delay, origin } = refreshRealOption;
      const refreshFn = () => {
        this.refreshTimer = setTimeout(() => {
          const calcDates = getDates(dates);
          onIntervalRefresh(calcDates, delay, origin);
          refreshFn();
        }, delay);
      };
      if (delay) {
        refreshFn();
      }
    },
    refreshDate(isRefresh = false, dates, force = false) {
      const {
        refreshRealValue,
        refreshRealOption,
        setRefreshTimer,
        clearRefreshTimer,
        setRefreshCurrentValue,
      } = this;
      clearRefreshTimer();
      if (refreshRealValue !== REFRESH_OFF) {
        if (isRefresh || force) {
          if (dates) {
            setRefreshTimer(refreshRealOption, dates);
          }
          setRefreshCurrentValue(refreshRealValue);
        } else {
          // 防止refreshCurrentValue原值是REFRESH_OFF,
          // 被设置为新值后还未渲染,就被重新设置为REFRESH_OFF,导致设置无效
          this.$nextTick(() => {
            setRefreshCurrentValue(REFRESH_OFF);
          });
        }
      }
    },
    resetRefresh() {
      const {
        disabled, isNeedRefresh, innerSelectOption, refreshDate, forceRefresh
      } = this;
      if (disabled) {
        return;
      }
      if (isNeedRefresh) {
        if (innerSelectOption) {
          const { isRefresh, dates } = innerSelectOption;
          refreshDate(isRefresh, dates, forceRefresh);
        } else {
          // 当未选中任何时间时, 仍需要保持refresh下拉框的值, 所以第一个参数传递true
          refreshDate(true, null);
        }
      }
    },
    renderSelectionInput(triggerNode) {
      const {
        $scopedSlots,
        prefixCls,
        renderRefreshLabel,
        refreshCurrentValue,
        refreshRealOption,
        disabled,
      } = this;
      const renderRefreshLabelFn = $scopedSlots.renderRefreshLabel || renderRefreshLabel;
      return refreshCurrentValue !== REFRESH_OFF ? (
        <div class={`${prefixCls}-slider-refresh-input`}>
          {triggerNode}
          {!disabled ? (
            <span class={`${prefixCls}-slider-refresh-label`}>
              {isFunction(renderRefreshLabelFn) ? (
                renderRefreshLabelFn({ option: { ...refreshRealOption } })
              ) : (
                <span>
                  <span>刷新频率: </span>
                  <span>{refreshRealOption.value}</span>
                </span>
              )}
            </span>
          ) : null}
        </div>
      ) : (
        triggerNode
      );
    },
    renderSelect() {
      const {
        prefixCls,
        innerSelectValue,
        showSliderBar,
        showRefreshBar,
        dataSource,
        disabled,
        opMidMode,
        opDisabled,
        onSelect,
        onSelectChange,
        onClear,
        onLeftBtnClick,
        onMidBtnClick,
        onRightBtnClick,
        renderSelectLabel,
        getPopupContainer,
        allowClear,
        isNeedRefresh,
        renderRefreshSetting,
        renderSelectionInput,
        onSelectVisibleChange,
        onManualRefresh,
      } = this;
      const props = {
        // 与上面的 onSelectChange 相配合, 防止value==='setting'时选中
        value: [innerSelectValue],
        // 移除dates attr, 否则linux 环境下单元测试过不了
        dataSource: dataSource.map((v) => omit(v, ['dates'])),
        renderLabel: renderSelectLabel,
        optionLabelProp: 'children',
        control: true,
        disabled,
        getContainer: getPopupContainer,
        allowClear,
        popupClass: `${prefixCls}-slider-dropdown`,
      };

      if (isNeedRefresh) {
        props.extraTopContent = renderRefreshSetting;
        props.renderSelectionInput = renderSelectionInput;
      }
      const on = {
        // 点击 select item
        select: onSelect,
        change: onSelectChange,
        clear: onClear,
        'popup-visible-change': onSelectVisibleChange,
      };
      const selectNode = <Select {...{ props, on, style: { width: '100%' } }} />;

      return showSliderBar || showRefreshBar ? (
        <Row gutter={8}>
          <Row.Col span={16}>{selectNode}</Row.Col>
          <Row.Col span={8}>
            {showSliderBar ? (
              <Button.Group style="margin-right:10px">
                <Button
                  role="slider-bar-left"
                  disabled={disabled || opDisabled.left}
                  on-click={onLeftBtnClick}
                >
                  <Icon type="left" />
                </Button>
                <Button
                  role="slider-bar-pause"
                  disabled={disabled || opDisabled.mid}
                  on-click={onMidBtnClick}
                >
                  {opMidMode === 'pause' ? (
                    <Icon type="pause" style="transform: scale(1.5)" />
                  ) : (
                    <Icon type="caret_right" />
                  )}
                </Button>
                <Button
                  role="slider-bar-right"
                  disabled={disabled || opDisabled.right}
                  on-click={onRightBtnClick}
                >
                  <Icon type="right" />
                </Button>
              </Button.Group>
            ) : null}
            {showRefreshBar ? (
              <Button.Group>
                <Button role="slider-bar-refresh" disabled={disabled} on-click={onManualRefresh}>
                  <Icon type="sync-m" />
                </Button>
              </Button.Group>
            ) : null}
          </Row.Col>
        </Row>
      ) : (
        selectNode
      );
    },
    updateSelectValue(
      values,
      type = 'normal',
      trigger = true,
      range = {},
      from = 'normal',
      mixin = {}
    ) {
      const {
        dataSource,
        setInnerValue,
        setInnerSelectValue,
        format,
        maxHistoryLen,
        reverseHistory,
        findOptionByValue,
      } = this;
      let option = null;
      let options = dataSource
        .filter((v) => !v.UNRENDER_OTPION)
        .slice(defaultOptions.filter((v) => !v.UNRENDER_OTPION).length);
      if (type === 'quick-select') {
        const {
          title, label, value, duration: defDuration, isRefresh = false, dates
        } = range;
        // 明确为true , 才设置为true
        const isRangeRefresh = isRefresh === true;
        const { diffTime, duration } = calcDuration(dates);

        option = {
          ...mixin,
          title: title || label || value,
          value: value || label,
          duration: defDuration || duration,
          diffTime,
          label: label || value,
          dates,
          dateType: type,
          isRefresh: isRangeRefresh,
        };
      } else {
        const formatDateStrs = getFormatDateStr(values, format);

        const { diffTime, duration } = calcDuration(values);
        option = {
          ...mixin,
          title: formatDateStrs,
          value: values.map((v) => v.getTime()).join('-'),
          duration,
          diffTime,
          label: formatDateStrs,
          dates: values,
          dateType: type,
          // 时间选择器无法选择出非固定范围的时间, 所以 isRefresh 固定是false
          isRefresh: false,
        };
      }
      if (!findOptionByValue(option.value)) {
        // 不支持显示0条,即没有历史的情况, 因为底层是个select,逻辑走不通
        const maxHistoryL = Number(maxHistoryLen) || defaultMaxHistoryLen;
        if (maxHistoryL === 0) {
          options = [];
        } else {
          if (options.length >= maxHistoryL && !option.UNRENDER_OTPION) {
            options[reverseHistory ? 'pop' : 'shift']();
          }
          options[reverseHistory ? 'unshift' : 'push'](option);
        }
        this.dataSource = [...defaultOptions, ...options];
      }
      setInnerSelectValue(option.value, from);
      setInnerValue(values, trigger);
    },
    onDateChange(values, _, extra = {}) {
      const { updateSelectValue } = this;
      // 防止重新选择时间时状态不对
      this.opMidMode = 'pause';
      updateSelectValue(values, extra.type, true, extra.content);
    },
    renderDatepicker() {
      const {
        prefixCls,
        disabled,
        getPopupContainer,
        showTime,
        format,
        ranges,
        locale,
        innerValue,
        innerDateVisible,
        datePickerProps,
        datePickerEvents,
        getDisabledDateAndTime,
        onDateOpenChange,
        onDateChange,
      } = this;
      const { disabledDate, disabledTime } = getDisabledDateAndTime();
      const props = {
        prefixCls,
        showTime,
        format,
        getPopupContainer,
        disabled,
        pickerPrefixCls: `${prefixCls}-picker-container`,
        ranges,
        okConfirm: true,
        disabledDate,
        disabledTime,
        locale,
        ...datePickerProps,
        selectedValue: innerValue,
        isOpen: innerDateVisible,
      };

      let on = {
        'open-change': onDateOpenChange,
        change: onDateChange,
      };

      Object.keys(on).forEach((k) => {
        if (k in datePickerEvents && isFunction(datePickerEvents[k])) {
          const bindEvent = datePickerEvents[k];
          const originEvent = on[k];
          on[k] = function chainFns(...args) {
            originEvent(...args);
            bindEvent(...args);
          };
        }
      });

      on = { ...datePickerEvents, ...on };

      return (
        <VRangeDatePicker {...{ props, on }}>
          <span
            slot="trigger"
            style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1"
          />
        </VRangeDatePicker>
      );
    },
  },
  render() {
    const { prefixCls, renderSelect, renderDatepicker } = this;
    return (
      <div class={`${prefixCls}-slider`} style="">
        {renderSelect()}
        {renderDatepicker()}
      </div>
    );
  },
};
