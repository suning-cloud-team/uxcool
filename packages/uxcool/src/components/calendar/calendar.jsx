import {
  isEqual as isDateEqual,
  format as formatFn,
  isDate,
  isAfter,
  isValid,
  isBefore,
  startOfDay,
  startOfMonth,
} from 'date-fns';
import { isFunction, isArray } from '@cloud-sn/v-utils';
import { VFullCaleadar as FullCalendar } from '@cloud-sn/v-datepicker';
import { buildComponentName } from '../utils';
import Header from './header';
import CN from '../datepicker/locale/zh_CN';

export default {
  name: buildComponentName('FullCalendar'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-fullcalendar',
    },
    value: {
      type: Date,
      default: null,
    },
    mode: {
      type: String,
      default: 'month',
      validator(val) {
        return ['year', 'month'].indexOf(val) > -1;
      },
    },
    fullscreen: {
      type: Boolean,
      default: true,
    },
    dateCellRender: {
      type: Function,
      default: null,
    },
    dateCellContentRender: {
      type: Function,
      default: null,
    },
    monthCellRender: {
      type: Function,
      default: null,
    },
    monthCellContentRender: {
      type: Function,
      default: null,
    },
    locale: {
      type: Object,
      default() {
        return CN.lang;
      },
    },
    validRange: {
      type: Array,
      default: null,
    },
    disabledDate: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      innerValue: null,
      innerMode: '',
    };
  },
  computed: {
    classes() {
      const { prefixCls, fullscreen } = this;
      return {
        [prefixCls]: fullscreen,
        [`${prefixCls}-fullscreen`]: fullscreen,
      };
    },
    type() {
      const { innerMode } = this;
      return innerMode === 'month' ? 'date' : 'month';
    },
    range() {
      const { validRange } = this;
      const isInValid = !isArray(validRange) || validRange.length < 2;
      if (isInValid || !validRange.every((v) => isDate(v) && isValid(v))) {
        return null;
      }
      const [start, end] = validRange;
      return isAfter(start, end) ? [end, start] : validRange;
    },
    disabledFn() {
      const { type, range, disabledDate } = this;
      let ret = disabledDate;
      if (range) {
        const [start, end] = range;
        const [startDate, endDate] = type === 'month'
          ? [startOfMonth(start), startOfMonth(end)]
          : [startOfDay(start), startOfDay(end)];

        ret = (current) => {
          if (!current) {
            return false;
          }

          let flag = isFunction(disabledDate) ? disabledDate(current) : false;

          if (!flag) {
            const currentDate = type === 'month' ? startOfMonth(current) : startOfDay(current);
            flag = isBefore(currentDate, startDate) || isAfter(currentDate, endDate);
          }
          return flag;
        };
      }
      return ret;
    },
  },
  watch: {
    value(nVal) {
      const { getValidValue, setInnerValue } = this;
      const validValue = getValidValue(nVal);
      setInnerValue(validValue, !isDateEqual(validValue, nVal));
    },
    mode(nVal) {
      this.setInnerMode(nVal, false);
    },
  },
  created() {
    const {
      getValidValue, setInnerValue, setInnerMode, value, mode
    } = this;
    const validValue = getValidValue(value);
    setInnerValue(validValue, !isDateEqual(validValue, value));
    setInnerMode(mode, false);
  },
  methods: {
    triggerPanelChange() {
      const { innerValue, innerMode } = this;
      this.$emit('panel-change', innerValue, innerMode);
    },
    setInnerValue(value, trigger = true) {
      const { innerValue } = this;
      if (!isDateEqual(value, innerValue)) {
        this.innerValue = value;
        if (trigger) {
          this.$emit('input', value);
          this.$emit('change', value);
        }
      }
    },
    setInnerMode(mode, trigger = true) {
      this.innerMode = mode;
      if (trigger) {
        this.triggerPanelChange();
      }
    },
    getValidValue(value) {
      const { range } = this;
      let ret = isDate(value) && isValid(value) ? value : new Date();
      if (range) {
        const [start, end] = range;
        const valueDate = startOfDay(ret);
        const startDate = startOfDay(start);
        const endDate = startOfDay(end);
        if (isBefore(valueDate, startDate)) {
          ret = startDate;
        }

        if (isAfter(valueDate, endDate)) {
          ret = endDate;
        }
      }
      return ret;
    },
    getCellContentFn(type, contentRenderFn) {
      const { prefixCls, locale } = this;
      const format = type === 'date' ? 'DD' : 'MMM';
      return ({ current, value }) => (
        <div class={`${prefixCls}-${type}`}>
          <div class={`${prefixCls}-value`}>
            {formatFn(current, format, { locale: locale.DateFnsLocale })}
          </div>
          <div class={`${prefixCls}-content`}>
            {isFunction(contentRenderFn) ? contentRenderFn({ current, value }) : null}
          </div>
        </div>
      );
    },
    getCellRenderFn(type = 'date') {
      const { $scopedSlots, getCellContentFn } = this;
      const cellFnName = type === 'date' ? 'dateCellRender' : 'monthCellRender';
      let cellRenderFn = $scopedSlots[cellFnName] || this[cellFnName];
      if (!isFunction(cellRenderFn)) {
        const contentFnName = type === 'date' ? 'dateCellContentRender' : 'monthCellContentRender';
        cellRenderFn = getCellContentFn(type, $scopedSlots[contentFnName] || this[contentFnName]);
      }
      return cellRenderFn;
    },
    onTypeChange(type) {
      const mode = type === 'date' ? 'month' : 'year';
      this.setInnerMode(mode);
    },
    onInput(val, from = 'calendar') {
      this.setInnerValue(val);
      if (from === 'header') {
        this.triggerPanelChange();
      }
    },
    onSelect(val, from) {
      this.$emit('select', val, from);
    },
  },
  render() {
    const {
      $props,
      locale,
      classes,
      prefixCls,
      innerValue,
      type,
      getCellRenderFn,
      disabledFn,
      onTypeChange,
      onInput,
      onSelect,
    } = this;
    const dateCellRenderFn = getCellRenderFn('date');
    const monthCellRenderFn = getCellRenderFn('month');
    return (
      <div class={classes}>
        <Header
          {...{
            props: {
              ...$props,
              prefixCls,
              value: innerValue,
              type,
            },
            on: {
              'type-change': onTypeChange,
              change: (val) => {
                onInput(val, 'header');
              },
            },
          }}
        />
        <FullCalendar
          {...{
            props: {
              ...$props,
              value: innerValue,
              type,
              dateCellRender: dateCellRenderFn,
              monthCellRender: monthCellRenderFn,
              disabledDate: disabledFn,
              format: locale.name === 'zh_cn' ? 'YYYY年MM月DD日' : 'MMMM D, YYYY',
            },
            on: {
              input: onInput,
              select: onSelect,
            },
          }}
        />
      </div>
    );
  },
};
