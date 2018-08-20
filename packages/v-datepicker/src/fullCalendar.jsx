import { isEqual } from 'date-fns';
import { noop } from './utils';
import DateTable from './date/dateTable.vue';
import MonthTable from './month/monthTable';

export default {
  name: 'FullCalendar',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'v-calendar',
    },
    value: {
      type: Date,
      default() {
        return new Date();
      },
    },
    locale: {
      type: Object,
      default: null,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'date',
    },
    monthCellRender: {
      type: Function,
      default: null,
    },
    dateCellRender: {
      type: Function,
      default: null,
    },
    disabledDate: {
      type: Function,
      default: noop,
    },
    format: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerValue: null,
      selectedValue: null,
    };
  },
  computed: {
    classes() {
      const { prefixCls, fullscreen } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-full`]: true,
        [`${prefixCls}-fullscreen`]: !!fullscreen,
      };
    },
  },
  watch: {
    value(nVal) {
      this.updateValue(nVal, {}, false);
    },
  },
  created() {
    const { updateValue, value } = this;
    updateValue(value, {}, false);
  },
  methods: {
    updateValue(value, from, trigger = true) {
      const { setInnerValue, setSelectedValue } = this;
      setInnerValue(value, trigger);
      setSelectedValue(value, from, trigger);
    },
    setInnerValue(value, trigger = true) {
      const { innerValue } = this;
      if (!isEqual(value, innerValue)) {
        this.innerValue = value;
        if (trigger) {
          this.$emit('input', value);
          this.$emit('change', value);
        }
      }
    },
    setSelectedValue(value, from = {}, trigger = true) {
      this.selectedValue = value;
      if (trigger) {
        this.$emit('select', value, from);
      }
    },
    onSelect(value, from = { target: 'date' }) {
      this.updateValue(value, from, true);
    },
    onMonthSelect(value) {
      this.onSelect(value, { target: 'month' });
    },
    renderCalendar() {
      const {
        prefixCls,
        format,
        innerValue,
        type,
        locale,
        disabledDate,
        dateCellRender,
        dateCellContentRender,
        monthCellRender,
        monthCellContentRender,
        onSelect,
        onMonthSelect,
      } = this;
      let props = {
        locale,
        value: innerValue,
        selectedValue: innerValue,
      };
      let table = null;
      if (type === 'date') {
        props = {
          ...props,
          prefixCls,
          dateRender: dateCellRender,
          contentRender: dateCellContentRender,
          disabledDate,
          format,
        };
        table = <DateTable {...{ props, on: { select: onSelect } }} />;
      } else {
        props = {
          ...props,
          prefixCls: `${prefixCls}-month-panel`,
          monthRender: monthCellRender,
          contentRender: monthCellContentRender,
          disabledMonth: disabledDate,
        };
        table = <MonthTable {...{ props, on: { select: onMonthSelect } }} />;
      }
      return (
        <div key="calendar-body" class={`${prefixCls}-calendar-body`}>
          {table}
        </div>
      );
    },
  },
  render() {
    const { classes, renderCalendar } = this;
    return <div class={classes}>{renderCalendar()}</div>;
  },
};
