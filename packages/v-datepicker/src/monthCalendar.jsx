import { getValidDate } from './utils';
import CalendarHeader from './calendar/calendarHeader.vue';

export default {
  name: 'MonthCalendar',
  props: {
    prefixCls: {
      type: String,
      default: 'v-calendar',
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
      default: 'yyyy-MM',
    },
    disabledMonth: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      innerValue: null,
      innerMode: 'month',
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-month-calendar`]: true,
      };
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
    setInnerValue(val, trigger = true) {
      this.innerValue = val;
      if (trigger) {
        this.$emit('input', val);
      }
    },
    setInnerMode(mode) {
      this.innerMode = mode;
    },
    onChange(value) {
      this.setInnerValue(value);
    },
    onPanelChange(_, mode) {
      if (mode !== 'date') {
        this.setInnerMode(mode);
      }
    },
  },
  render() {
    const {
      prefixCls,
      classes,
      format,
      innerMode,
      innerValue,
      locale,
      disabledMonth,
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
    };
    const on = {
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
