import omit from 'object.omit';
import { format as formatDate, isAfter } from 'date-fns';
import { VRangeMonthYearDecadePicker as RangeMonthYearDecadePicker } from '@suning/v-datepicker';
import localeCN from '../locale/zh_CN';
import Icon from '../../icon';

export default {
  model: {
    prop: 'selectedValue',
  },
  props: {
    ...omit(RangeMonthYearDecadePicker.props, ['mode', 'disabledMonth', 'disabledYear']),
    prefixCls: {
      type: String,
      default: 'ux-calendar',
    },
    locale: {
      type: Object,
      default() {
        return localeCN.lang;
      },
    },
    placeholder: {
      type: [String, Array],
      default: '',
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
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['small', 'large', 'default'].indexOf(value) > -1;
      },
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerValue: null,
    };
  },
  computed: {
    dateFormat() {
      const { format } = this;
      return format || 'YYYY-MM';
    },
    pickerClasses() {
      const { prefixCls, theme, size } = this;
      return {
        [`${prefixCls}-picker`]: true,
        [`${prefixCls}-picker-${theme}`]: true,
        [`${prefixCls}-picker-${size}`]: true,
      };
    },
    pickerInputClass() {
      const { prefixCls, disabled, size } = this;
      const inputPrefix = 'ux-input';
      const map = {
        small: 'sm',
        large: 'lg',
      };
      return {
        [inputPrefix]: true,
        [`${prefixCls}-picker-input`]: true,
        [`${inputPrefix}-disabled`]: disabled,
        [`${inputPrefix}-${map[size]}`]: size !== 'default',
      };
    },
    startPlaceholder() {
      const { placeholder, locale, mode } = this;
      const [startMode] = mode;
      const { rangeMonthPlaceholder, rangeYearPlaceholder } = locale;
      let holder = (startMode === 'month' ? rangeMonthPlaceholder : rangeYearPlaceholder)[0];
      if (placeholder) {
        if (Array.isArray(placeholder)) {
          if (placeholder.length > 0) {
            [holder] = placeholder;
          }
        } else {
          holder = placeholder;
        }
      }
      return holder;
    },
    endPlaceholder() {
      const { placeholder, locale, mode } = this;
      const [, endMode] = mode;
      const { rangeMonthPlaceholder, rangeYearPlaceholder } = locale;
      let holder = (endMode === 'month' ? rangeMonthPlaceholder : rangeYearPlaceholder)[1];
      if (placeholder) {
        if (Array.isArray(placeholder)) {
          if (placeholder.length > 1) {
            [, holder] = placeholder;
          } else if (placeholder.length > 0) {
            [holder] = placeholder;
          }
        } else {
          holder = placeholder;
        }
      }
      return holder;
    },
    isCanClear() {
      const { disabled, allowClear, innerValue } = this;
      const [start, end] = innerValue;
      return !disabled && allowClear && (start || end);
    },
    startValue() {
      const { innerValue, dateFormat } = this;
      const [start] = innerValue;
      return start ? formatDate(start, dateFormat) : '';
    },
    endValue() {
      const { innerValue, dateFormat } = this;
      const [, end] = innerValue;
      return end ? formatDate(end, dateFormat) : '';
    },
  },
  watch: {
    selectedValue(nVal) {
      this.setInnerValue(nVal, false);
    },
  },
  created() {
    const { selectedValue, setInnerValue } = this;
    setInnerValue(selectedValue, false);
  },
  methods: {
    setInnerValue(value, trigger = true, formatStrs) {
      let val = value || [];
      if (val.length === 2) {
        const [start, end] = val;
        if (isAfter(start, end)) {
          val = [end, start];
        }
      }
      this.innerValue = val;
      if (trigger) {
        this.$emit('input', val);
        this.$emit('change', val, formatStrs);
      }
    },
    onChange(value, formatStrs) {
      this.setInnerValue(value, true, formatStrs);
    },
    onClearClick(e) {
      e.stopPropagation();
      e.preventDefault();
      this.setInnerValue([]);
    },
  },
  render() {
    const {
      $props,
      $listeners,
      prefixCls,
      pickerClasses,
      pickerInputClass,
      innerValue,
      startValue,
      endValue,
      disabled,
      dateFormat,
      startPlaceholder,
      endPlaceholder,
      isCanClear,
      onChange,
      onClearClick,
    } = this;

    const props = {
      ...omit($props, ['format']),
      selectedValue: innerValue,
      pickerPrefixCls: `${prefixCls}-picker-container`,
      format: dateFormat,
    };

    const on = {
      ...omit($listeners, ['input', 'change']),
      change: onChange,
    };
    return (
      <RangeMonthYearDecadePicker {...{ props, on }}>
        <template slot="trigger">
          <div class={pickerClasses}>
            <div class={pickerInputClass}>
              <input
                class={`${prefixCls}-range-picker-input`}
                value={startValue}
                placeholder={startPlaceholder}
                disabled={disabled}
                type="text"
                readonly
                tabindex="-1"
              />
              <span class={`${prefixCls}-range-picker-separator`}> ~ </span>
              <input
                class={`${prefixCls}-range-picker-input`}
                value={endValue}
                placeholder={endPlaceholder}
                disabled={disabled}
                type="text"
                readonly
                tabindex="-1"
              />
              {isCanClear ? (
                <Icon
                  class={`${prefixCls}-picker-clear`}
                  type="close_circle"
                  on-click={onClearClick}
                />
              ) : null}
              <span class={`${prefixCls}-picker-icon`} />
            </div>
          </div>
        </template>
      </RangeMonthYearDecadePicker>
    );
  },
};
