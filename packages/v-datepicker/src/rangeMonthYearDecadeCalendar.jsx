import { cloneDeep } from '@suning/v-utils';
import { isSameYear, isBefore, addYears, startOfYear, isAfter, isEqual } from 'date-fns';
import { isValidArray } from './utils';
import MonthYearDecadeCalendar from './monthYearDecadeCalendar';

export default {
  name: 'RangeMonthYearDecadeCalendar',
  provide() {
    return {
      monthYearDecadeRoot: this,
    };
  },
  props: {
    prefixCls: {
      type: String,
      default: '',
    },
    defaultPickerValue: {
      type: Array,
      required: true,
      validator(val) {
        return val.every(v => v instanceof Date);
      },
    },
    selectedValue: {
      type: Array,
      default() {
        return [];
      },
      validator(val) {
        return val.every(v => v instanceof Date);
      },
    },
    mode: {
      type: Array,
      default() {
        return ['month', 'month'];
      },
      validator(val) {
        const modes = val || [];
        return modes.every(v => ['month', 'year', 'decade'].indexOf(v) > -1);
      },
    },
    locale: {
      type: Object,
      default: undefined,
    },
    format: {
      type: String,
      default: 'YYYY-MM',
    },
    disabledMonth: {
      type: Function,
      default() {
        return false;
      },
    },
    disabledYear: {
      type: Function,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      pickerValue: [],
      hoverValue: [],
      innerValue: [],
    };
  },
  computed: {
    classes() {
      const { prefixCls } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-month-range`]: true,
        // [`${prefixCls}-range-with-ranges`]: isRanges,
      };
    },
    startMode() {
      const { mode } = this;
      const [start] = mode;
      return start;
    },
    endMode() {
      const { mode } = this;
      const [, end] = mode;
      return end;
    },
    startValue() {
      const { pickerValue } = this;
      const [start] = pickerValue;
      return start;
    },
    endValue() {
      const { pickerValue } = this;
      const [, end] = pickerValue;
      return end;
    },
    enableMonthNav() {
      const { startMode, startValue, endValue } = this;
      if (startMode === 'month') {
        const next = addYears(startValue, 1);
        return !isSameYear(next, endValue);
      }

      return true;
    },
  },
  watch: {
    selectedValue(nVal) {
      this.setInnerValue(nVal, false);
    },
  },
  created() {
    const { selectedValue, setInnerValue, setPickerValue } = this;
    // no reactive
    this.firstSelectedVal = null;
    // no reactive
    setInnerValue(selectedValue, false);
    setPickerValue(this.normalizeAnchor());
  },
  methods: {
    getInnerValue() {
      return this.innerValue;
    },
    getHoverValue() {
      return this.hoverValue;
    },
    setInnerValue(value, trigger = true) {
      this.innerValue = value;
      if (trigger) {
        this.$emit('value-change', value);
      }
    },
    setPickerValue(value) {
      this.pickerValue = value || [];
    },
    getValueFromSelectedValue(selectedValue) {
      const [start, end] = selectedValue;
      const newEnd = end && isSameYear(end, start) ? addYears(end, 1) : end;
      return [start, newEnd];
    },
    normalizeAnchor() {
      const { selectedValue, defaultPickerValue, getValueFromSelectedValue } = this;
      let normalizedValue = getValueFromSelectedValue(selectedValue);

      if (isValidArray(normalizedValue)) {
        return normalizedValue;
      }
      normalizedValue = getValueFromSelectedValue(defaultPickerValue);

      if (isValidArray(normalizedValue)) {
        return normalizedValue;
      }

      const date = new Date();

      return [date, addYears(date, 1)];
    },
    updateHoverValue(values) {
      const hoverValue = cloneDeep(values);
      this.hoverValue = hoverValue;

      this.$emit('hover-change', hoverValue);
    },
    updateSelectedValue(values = []) {
      const { updateHoverValue, setInnerValue } = this;
      const [start, end] = values;

      setInnerValue(values);
      if (start && !end) {
        updateHoverValue(values);
      }

      this.$emit('calendar-change', values);

      if ((!start && !end) || (start && end)) {
        this.firstSelectedVal = null;
        updateHoverValue([]);
        this.$emit('select', values);
      }
    },
    disabledStartYear(year) {
      const { endValue } = this;
      const endYear = startOfYear(endValue);
      const curYear = startOfYear(year);
      return isAfter(curYear, endYear) || isEqual(curYear, endYear);
    },
    disabledEndYear(year) {
      const { startValue } = this;
      const startYear = startOfYear(startValue);
      const curYear = startOfYear(year);
      return isBefore(curYear, startYear) || isEqual(curYear, startYear);
    },
    onChange(value) {
      const { firstSelectedVal, updateSelectedValue } = this;
      const values = [];
      if (!firstSelectedVal) {
        this.firstSelectedVal = value;
        values.push(value);
      } else if (isBefore(firstSelectedVal, value)) {
        values.push(firstSelectedVal, value);
      } else {
        values.push(value, firstSelectedVal);
      }

      updateSelectedValue(values);
    },
    onHover(_, value) {
      const { firstSelectedVal, updateHoverValue } = this;
      if (firstSelectedVal) {
        const values = [firstSelectedVal];
        if (isBefore(value, firstSelectedVal)) {
          values.unshift(value);
        } else {
          values.push(value);
        }
        updateHoverValue(values);
      }
    },
    onMonthYearValueChange(direction, value) {
      const { pickerValue, setPickerValue } = this;
      setPickerValue(direction === 'left' ? [value, pickerValue[1]] : [pickerValue[0], value]);
    },
    onPanelChange(direction, value, next) {
      const { startMode, endMode, innerValue } = this;

      let pVal = null;
      let pMode = null;
      if (direction === 'left') {
        pVal = [value || innerValue[0], innerValue[1]];
        pMode = [next, endMode];
      } else {
        pVal = [innerValue[0], value || innerValue[1]];
        pMode = [startMode, next];
      }
      this.$emit('panel-change', pVal, pMode);
    },
  },
  render() {
    const {
      prefixCls,
      locale,
      classes,
      format,
      startValue,
      endValue,
      startMode,
      endMode,
      enableMonthNav,
      disabledMonth,
      disabledStartYear,
      disabledEndYear,
      onChange,
      onMonthYearValueChange,
      onPanelChange,
    } = this;
    const startProps = {
      prefixCls,
      locale,
      format,
      value: startValue,
      mode: startMode,
      monthNav: {
        prev: true,
        next: enableMonthNav,
      },
      disabledMonth,
      disabledYear: startMode === 'month' ? disabledStartYear : null,
    };

    const endProps = {
      prefixCls,
      locale,
      format,
      value: endValue,
      mode: endMode,
      monthNav: {
        prev: enableMonthNav,
        next: true,
      },
      disabledMonth,
      disabledYear: endMode === 'month' ? disabledEndYear : null,
    };

    const on = {
      change: onChange,
    };

    const startOn = {
      ...on,
      'month-value-change': value => onMonthYearValueChange('left', value),
      'year-value-change': value => onMonthYearValueChange('left', value),
      'panel-change': (...args) => onPanelChange('left', ...args),
    };
    const endOn = {
      ...on,
      'month-value-change': value => onMonthYearValueChange('right', value),
      'year-value-change': value => onMonthYearValueChange('right', value),
      'panel-change': (...args) => onPanelChange('right', ...args),
    };
    return (
      <div class={classes}>
        <div class={`${prefixCls}-month-panel`}>
          <div class={`${prefixCls}-month-date-panel`}>
            <div class={[`${prefixCls}-month-range-part`, `${prefixCls}-month-range-left`]}>
              <MonthYearDecadeCalendar {...{ props: startProps, on: startOn }} />
            </div>
            <div class={[`${prefixCls}-month-range-part`, `${prefixCls}-month-range-right`]}>
              <MonthYearDecadeCalendar {...{ props: endProps, on: endOn }} />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
