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
} from 'date-fns';
import HumanizeDuration from 'humanize-duration';
import { isFunction, isArray, isString, isEqual } from '@suning/v-utils';
import { VRangeDatePicker } from '@suning/v-datepicker';
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
  return values.map(v => formatDate(v, format)).join('~');
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
    }
  } else if (minDate && isSameHour(selectedDate, minDate)) {
    disabledMinutes = minutes.slice(0, getMinutes(minDate));
  } else if (maxDate && isSameHour(selectedDate, maxDate)) {
    disabledMinutes = minutes.slice(getMinutes(maxDate) + 1);
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
    }
  } else if (minDate && isSameMinute(selectedDate, minDate)) {
    disabledSeconds = seconds.slice(0, getSeconds(minDate));
  } else if (maxDate && isSameMinute(selectedDate, maxDate)) {
    disabledSeconds = seconds.slice(getSeconds(maxDate) + 1);
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
    locale: {
      type: Object,
      default() {
        return localeCN.lang;
      },
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
       * dates: values,
       * }
       */
      dataSource: [...defaultOptions],
    };
  },
  computed: {
    isCanSlide() {
      return !!this.innerSelectValue;
    },
  },
  watch: {
    value(nVal) {
      const { normalizeValue, innerValue } = this;
      if (!isEqual(innerValue, nVal)) {
        normalizeValue(nVal);
      }
    },
    dataSource(nVal) {
      console.log('dataSource', nVal);
    },
  },
  created() {
    const { normalizeValue, value } = this;
    normalizeValue(value);
    // no reactive
    this.originSlideOption = null;
    // no reactive
  },
  methods: {
    getDisabledDateAndTime() {
      const { maxSliderDate, minSliderDate } = this;
      const minDate = getValidDate(minSliderDate);
      const maxDate = getValidDate(maxSliderDate);

      return {
        disabledDate(current) {
          if (minDate && maxDate) {
            return current && (isBefore(current, minDate) || isAfter(current, maxDate));
          } else if (minDate) {
            return current && isBefore(current, minDate);
          } else if (maxDate) {
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
      const { ranges, updateSeletValue } = this;
      const ret = value;

      if (isString(value) && ranges) {
        const range =
          ranges.filter((v) => {
            if (v.value) {
              return v.value === value;
            }
            return v.lable === value;
          })[0] || null;
        if (range) {
          const { dates } = range;
          const nDates = getDates(dates);
          updateSeletValue(nDates, 'quick-select', true, range);
        }
      } else if (isArray(value) && value.length >= 2) {
        updateSeletValue(value, 'normal', false);
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
      return this.dataSource.filter(v => v.value === value)[0] || null;
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
    onDateOpenChange(visible) {
      this.setInnerDateVisible(visible);
    },
    onSelectChange(_, val) {
      const {
        setInnerSelectValue, innerSelectValue, findOptionByValue, setInnerValue
      } = this;
      setInnerSelectValue(val);
      // hack 使光标不选中setting对应的选项
      if (isUnSelectOption(val)) {
        setTimeout(() => {
          setInnerSelectValue(innerSelectValue);
        }, 0);
      } else {
        const item = findOptionByValue(val);
        if (item) {
          const { dates } = item;
          const values = getDates(dates);
          setInnerValue(values || []);
          // 防止重新选择时间时状态不对
          this.opMidMode = 'pause';
        }
      }
    },
    onSelect(_, node) {
      const { value } = node;
      if (isUnSelectOption(value)) {
        this.setInnerDateVisible(true);
      }
    },
    onBaseBtnClick(mode, type = 'left') {
      const {
        innerSelectOption,
        originSlideOption,
        innerValue,
        updateSeletValue,
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

        const [sliderStartDate, sliderEndDate] =
          type === 'left'
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

        updateSeletValue(dates, 'normal', true, null, 'slide', {
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
    renderSelectLabel({ duration, label }) {
      const tag = duration ? <Tag>{duration}</Tag> : '';
      return (
        <div>
          {tag}
          {label}
        </div>
      );
    },
    renderSelect() {
      const {
        innerSelectValue,
        showSliderBar,
        dataSource,
        disabled,
        opMidMode,
        opDisabled,
        onSelect,
        onSelectChange,
        onLeftBtnClick,
        onMidBtnClick,
        onRightBtnClick,
        renderSelectLabel,
        getPopupContainer,
      } = this;
      const props = {
        // 与上面的 onSelectChange 相配合, 防止value==='setting'时选中
        value: [innerSelectValue],
        dataSource,
        renderLabel: renderSelectLabel,
        optionLabelProp: 'children',
        control: true,
        disabled,
        getContainer: getPopupContainer,
      };
      const on = {
        // 点击 select item
        select: onSelect,
        change: onSelectChange,
      };
      const selectNode = <Select {...{ props, on, style: { width: '100%' } }} />;

      return showSliderBar ? (
        <Row gutter={8}>
          <Row.Col span={18}>{selectNode}</Row.Col>
          <Row.Col span={6}>
            <Button.Group>
              <Button disabled={disabled || opDisabled.left} on-click={onLeftBtnClick}>
                <Icon type="left" />
              </Button>
              <Button disabled={disabled || opDisabled.mid} on-click={onMidBtnClick}>
                {opMidMode === 'pause' ? (
                  <Icon type="pause" style="transform: scale(1.5)" />
                ) : (
                  <Icon type="caret_right" />
                )}
              </Button>
              <Button disabled={disabled || opDisabled.right} on-click={onRightBtnClick}>
                <Icon type="right" />
              </Button>
            </Button.Group>
          </Row.Col>
        </Row>
        ) : (
          selectNode
      );
    },
    updateSeletValue(
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
        .filter(v => !v.UNRENDER_OTPION)
        .slice(defaultOptions.filter(v => !v.UNRENDER_OTPION).length);
      if (type === 'quick-select') {
        const {
          title, label, value, duration: defDuration, dates
        } = range;
        const { diffTime, duration } = calcDuration(dates);
        option = {
          ...mixin,
          title: title || label,
          value: value || label,
          duration: defDuration || duration,
          diffTime,
          label,
          dates,
          dateType: type,
        };
      } else {
        const formatDateStrs = getFormatDateStr(values, format);

        const { diffTime, duration } = calcDuration(values);
        option = {
          ...mixin,
          title: formatDateStrs,
          value: values.map(v => v.getTime()).join('-'),
          duration,
          diffTime,
          label: formatDateStrs,
          dates: values,
          dateType: type,
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
      const { updateSeletValue } = this;
      // 防止重新选择时间时状态不对
      this.opMidMode = 'pause';
      updateSeletValue(values, extra.type, true, extra.content);
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

      const on = {
        'open-change': onDateOpenChange,
        change: onDateChange,
      };
      return (
        <VRangeDatePicker {...{ props, on }}>
          <span slot="trigger" style="position:absolute;top:0;left:0" />
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
