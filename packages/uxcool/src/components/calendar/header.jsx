import {
  getYear,
  getMonth,
  setMonth,
  setYear,
  format as formatFn,
  isBefore,
  startOfMonth,
  isAfter,
} from 'date-fns';
import { buildComponentName } from '../utils';
import Select from '../select';
import Radio from '../radio';

export default {
  name: buildComponentName('FullCalendarHeader'),
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    value: {
      type: Date,
      default: null,
    },
    validRange: {
      type: Array,
      default: null,
    },
    locale: {
      type: Object,
      default() {
        return {};
      },
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    yearSelectOffset: {
      type: Number,
      default: 10,
    },
    yearSelectTotal: {
      type: Number,
      default: 20,
    },
    type: {
      type: String,
      default: 'date',
    },
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [`${prefixCls}-header`]: true,
      };
    },
    size() {
      const { fullscreen } = this;
      return fullscreen ? 'default' : 'small';
    },
    range() {
      const { validRange } = this;
      if (!validRange) {
        return null;
      }
      const [start, end] = validRange;
      return {
        start: {
          year: getYear(start),
          month: getMonth(start),
          date: start,
        },
        end: {
          year: getYear(end),
          month: getMonth(end),
          date: end,
        },
      };
    },
    yearSelect() {
      const {
        prefixCls,
        locale,
        size,
        value,
        range,
        yearSelectOffset,
        yearSelectTotal,
        onYearChange,
      } = this;
      const years = [];
      const year = getYear(value);
      let start = year - yearSelectOffset;
      let end = start + yearSelectTotal;

      if (range) {
        const { start: rangeStart, end: rangeEnd } = range;
        start = rangeStart.year;
        end = rangeEnd.year + 1;
      }

      const suffix = locale.year === '年' ? '年' : '';
      for (let i = start; i < end; i += 1) {
        years.push({
          value: i,
          label: `${i}${suffix}`,
        });
      }
      return (
        <Select
          size={size}
          class={`${prefixCls}-year-select`}
          dataSource={years}
          dropdownMatchSelectWidth={false}
          value={year}
          on-input={onYearChange}
        />
      );
    },
    monthSelect() {
      const {
        prefixCls, locale, size, value, range, onMonthChange
      } = this;
      const months = [];
      const year = getYear(value);
      const month = getMonth(value);
      let start = 0;
      let end = 12;

      if (range) {
        const { start: rangeStart, end: rangeEnd } = range;

        // 对于 有效日期上限和下限, 分别动态获取有效月份
        if (year === rangeStart.year) {
          start = rangeStart.month;
        }

        if (year === rangeEnd.year) {
          end = rangeEnd.month + 1;
        }
      }

      for (let i = start; i < end; i += 1) {
        months.push({
          value: i,
          label: formatFn(setMonth(value, i), 'MMM', { locale: locale.DateFnsLocale }),
        });
      }
      return (
        <Select
          size={size}
          class={`${prefixCls}-month-select`}
          dropdownMatchSelectWidth={false}
          lazy={false}
          dataSource={months}
          value={month}
          on-input={onMonthChange}
        />
      );
    },
    typeSwitch() {
      const {
        type, locale, size, onTypeChange
      } = this;
      return (
        <Radio.Group size={size} value={type} on-change={onTypeChange}>
          <Radio.Button value="date">{locale.month}</Radio.Button>
          <Radio.Button value="month">{locale.year}</Radio.Button>
        </Radio.Group>
      );
    },
  },
  methods: {
    onTypeChange(val) {
      this.$emit('type-change', val);
    },
    onYearChange(val) {
      const { range } = this;
      let nDate = setYear(this.value, val);
      if (range) {
        const {
          start: { date: startDate, month: startMonth },
          end: { date: endDate, month: endMonth },
        } = range;
        const nDateMonth = startOfMonth(nDate);
        if (isBefore(nDateMonth, startOfMonth(startDate))) {
          nDate = setMonth(nDate, startMonth);
        }

        if (isAfter(nDateMonth, startOfMonth(endDate))) {
          nDate = setMonth(nDate, endMonth);
        }
      }
      this.$emit('change', nDate);
    },
    onMonthChange(val) {
      const nDate = setMonth(this.value, val);
      this.$emit('change', nDate);
    },
  },
  render() {
    const {
      classes, type, yearSelect, monthSelect, typeSwitch
    } = this;
    return (
      <div class={classes}>
        {yearSelect}
        {type === 'date' ? monthSelect : null}
        {typeSwitch}
      </div>
    );
  },
};
