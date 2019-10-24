import { PICKER_MODES } from './constant';
import { getValidDate } from './utils';
import CalendarHeader from './calendar/calendarHeader.vue';

export default {
  name: 'MonthYearDecadeCalendar',
  props: {
    prefixCls: {
      type: String,
      default: 'v-calendar',
    },
    mode: {
      type: String,
      default: 'month',
      validator(v) {
        return ['month', 'year', 'decade'].indexOf(v) > -1;
      },
    },
    value: {
      type: Date,
      default: undefined,
    },
    locale: {
      type: Object,
      default() {
        return {};
      },
    },
    format: {
      type: String,
      default: 'YYYY-MM',
    },
    disabledMonth: {
      type: Function,
      default: undefined,
    },
    disabledYear: {
      type: Function,
      default: undefined,
    },
    monthNav: {
      type: Object,
      default() {
        return {
          prev: true,
          next: true,
        };
      },
    },
    yearNav: {
      type: Object,
      default() {
        return {
          prev: true,
          next: true,
        };
      },
    },
  },
  data() {
    return {
      innerValue: null,
      innerMode: this.mode,
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-month`]: true,
        [`${prefixCls}-month-calendar`]: true,
      };
    },
    validMode() {
      const { mode } = this;
      const idx = PICKER_MODES.indexOf(mode);
      const pickerValidModes = PICKER_MODES.slice(idx);
      return pickerValidModes.reduce((r, v) => {
        const nr = r;
        nr[v] = 1;
        return nr;
      }, {});
    },
  },
  watch: {
    value(nVal) {
      this.setInnerValue(getValidDate(nVal), false);
    },
  },
  created() {
    const { value, setInnerValue } = this;
    setInnerValue(getValidDate(value), false);
  },
  methods: {
    setInnerValue(val, trigger = true, originMode) {
      this.innerValue = val;
      if (trigger) {
        this.$emit('change', val, originMode);
      }
    },
    setInnerMode(mode) {
      this.innerMode = mode;
    },
    onChange(value, originMode) {
      const { mode } = this;
      this.setInnerValue(value, originMode === mode, originMode);
    },
    onPanelChange(value, next, originMode) {
      const { validMode } = this;
      if (next in validMode) {
        this.setInnerMode(next);
        this.$emit('panel-change', value, next, originMode);
      }
    },
  },
  render() {
    const {
      $listeners,
      prefixCls,
      classes,
      format,
      innerMode,
      innerValue,
      locale,
      disabledMonth,
      disabledYear,
      monthNav,
      yearNav,
      onChange,
      onPanelChange,
    } = this;

    const headerProps = {
      prefixCls,
      format,
      mode: innerMode,
      value: innerValue,
      locale,
      disabledMonth,
      disabledYear,
      monthNav,
      yearNav,
    };
    const on = {
      ...$listeners,
      change: onChange,
      'panel-change': onPanelChange,
    };
    return (
      <div class={classes}>
        <div class={`${prefixCls}-month-calendar-content`}>
          <div class={`${prefixCls}-month-header-wrap`}>
            <CalendarHeader {...{ props: headerProps, on }} />
          </div>
        </div>
      </div>
    );
  },
};
