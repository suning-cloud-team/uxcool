import { isDate, startOfDay } from 'date-fns';
import { isArray } from '@suning/v-utils';
import DateInput from './date/dateInput.vue';
import DateTable from './date/dateTable.vue';
import CalendarHeader from './calendar/calendarHeader.vue';
import CalendarFooter from './calendar/calendarFooter.vue';

export default {
  name: 'MultiCalendar',
  provide() {
    return {
      multiCalendarRoot: this,
    };
  },
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    locale: {
      type: Object,
      default: undefined,
    },
    pickerValue: {
      type: Date,
      default() {
        return new Date();
      },
    },
    selectedValue: {
      type: [Date, Array],
      default() {
        return [];
      },
    },
    format: {
      type: String,
      default: '',
    },
    formatSeparator: {
      type: String,
      default: ', ',
    },
    placeholder: {
      type: String,
      default: '',
    },
    showDateInput: {
      type: Boolean,
      default: true,
    },
    showOk: {
      type: Boolean,
      default: true,
    },
    showToday: {
      type: Boolean,
      default: false,
    },
    disabledDate: {
      type: Function,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      innerPickerValue: null,
      innerSelectedValue: null,
      innerMode: 'date',
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
      };
    },
    dateFormat() {
      const { format, locale } = this;

      return format || locale.dateFormat;
    },
  },
  watch: {
    pickerValue(nVal) {
      this.setInnerPickerValue(nVal);
    },
    selectedValue(nVal) {
      this.setInnerSelectedValue(nVal);
    },
  },
  created() {
    const {
      pickerValue, setInnerPickerValue, selectedValue, setInnerSelectedValue
    } = this;
    setInnerPickerValue(pickerValue);
    setInnerSelectedValue(selectedValue);
  },
  methods: {
    setInnerPickerValue(value) {
      const { innerPickerValue } = this;
      const val = isDate(value) ? value : innerPickerValue || new Date();
      this.innerPickerValue = val;
    },
    setInnerSelectedValue(value) {
      const val = isArray(value) ? value : [value];
      this.innerSelectedValue = val.filter((v) => isDate(v));
    },
    setInnerMode(mode) {
      this.innerMode = mode;
    },
    onSelect(value) {
      const { innerSelectedValue, setInnerPickerValue, setInnerSelectedValue } = this;

      const vals = [...innerSelectedValue, value];
      setInnerSelectedValue(vals);
      setInnerPickerValue(value);
      this.$emit('select', value, vals);
    },
    onUnSelect(value) {
      const { innerSelectedValue, setInnerPickerValue, setInnerSelectedValue } = this;
      const vals = innerSelectedValue.filter(
        (v) => startOfDay(v).getTime() !== startOfDay(value).getTime()
      );
      setInnerSelectedValue(vals);
      setInnerPickerValue(value);
      this.$emit('unselect', value, vals);
    },
    onHeaderChange(value) {
      this.setInnerPickerValue(value);
    },
    onPanelChange(value, next) {
      const { innerPickerValue, setInnerMode } = this;
      setInnerMode(next);
      this.$emit('panel-change', value || innerPickerValue, next);
    },
    onOk() {
      const { innerSelectedValue } = this;
      this.$emit('ok', innerSelectedValue);
    },
    onToday() {
      // const { onSelect } = this;
      // this.$emit('today', value);
      // onSelect(value);
      // TODO: showToday === true
    },
    renderDateInput() {
      const {
        prefixCls, locale, placeholder, innerSelectedValue, dateFormat
      } = this;
      const props = {
        prefixCls,
        locale,
        placeholder,
        value: innerSelectedValue,
        format: dateFormat,
      };
      return <DateInput {...{ props }} />;
    },

    renderCalendarHeader() {
      const {
        prefixCls,
        locale,
        innerMode,
        innerPickerValue,
        dateFormat,
        onHeaderChange,
        onPanelChange,
      } = this;
      const props = {
        prefixCls,
        locale,
        mode: innerMode,
        value: innerPickerValue,
        format: dateFormat,
      };
      const on = {
        change: onHeaderChange,
        'panel-change': onPanelChange,
      };
      return <CalendarHeader {...{ props, on }} />;
    },
    renderCalendarBody() {
      const {
        prefixCls,
        innerPickerValue,
        innerSelectedValue,
        dateFormat,
        locale,
        disabledDate,
        onSelect,
        onUnSelect,
      } = this;
      const props = {
        prefixCls,
        value: innerPickerValue,
        selectedValue: innerSelectedValue,
        format: dateFormat,
        locale,
        disabledDate,
      };
      const on = {
        select: onSelect,
        unselect: onUnSelect,
      };
      return (
        <div class={`${prefixCls}-body`}>
          <DateTable {...{ props, on }} />
        </div>
      );
    },
    renderCalendarFooter() {
      const {
        prefixCls,
        locale,
        innerPickerValue,
        dateFormat,
        showOk,
        showToday,
        disabledDate,
        onOk,
        onToday,
      } = this;

      const props = {
        prefixCls,
        locale,
        value: innerPickerValue,
        format: dateFormat,
        showOk,
        isTimePicker: false,
        hasTimePikcer: false,
        showToday,
        okDisabled: false,
        disabledDate,
      };
      const on = {
        ok: onOk,
        today: onToday,
      };
      return <CalendarFooter {...{ props, on }} />;
    },
    renderDatePanel() {
      const {
        prefixCls, renderCalendarHeader, renderCalendarBody, renderCalendarFooter
      } = this;
      return (
        <div class={`${prefixCls}-date-panel`}>
          {renderCalendarHeader()}
          {renderCalendarBody()}
          {renderCalendarFooter()}
        </div>
      );
    },
  },
  render() {
    const {
      prefixCls, classes, showDateInput, renderDateInput, renderDatePanel
    } = this;

    return (
      <div class={classes}>
        <div class={`${prefixCls}-panel`} role="panel">
          {showDateInput ? renderDateInput() : null}
          {renderDatePanel()}
        </div>
      </div>
    );
  },
};
