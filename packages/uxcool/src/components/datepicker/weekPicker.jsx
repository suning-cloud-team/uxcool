import omit from 'object.omit';
import { format as formatDate } from 'date-fns';
import VDatePicker from '@suning/v-datepicker';
import { isEqual } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import localeCN from './locale/zh_CN';
import Icon from '../icon';

export default {
  name: buildComponentName('WeekPicker'),
  props: {
    ...omit(VDatePicker.props, [
      'mode',
      'isOpen',
      'showTime',
      'showToday',
      'showOk',
      'showDateInput',
      'dateInputPlaceholder',
      'disabledTime',
      'okConfirm',
      'showWeekNumber',
    ]),
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
    value: {
      type: Date,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    format: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
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
    dateFormat() {
      const { locale, format } = this;
      return format || (locale || {}).weekFormat || 'YYYY 第 WW 周';
    },
    formatValue() {
      const { innerValue, dateFormat } = this;
      if (!innerValue) {
        return '';
      }
      return formatDate(innerValue, dateFormat);
    },
    dateInputPlaceholder() {
      const { locale, placeholder } = this;
      return placeholder || locale.placeholder;
    },
    isCanClear() {
      const { disabled, allowClear, innerValue } = this;
      return !disabled && allowClear && innerValue;
    },
  },
  created() {
    const { value, setInnerValue } = this;
    setInnerValue(value);
  },
  methods: {
    setInnerValue(value, formatDateStr = '') {
      const { innerValue } = this;
      this.innerValue = value;

      if (!isEqual(innerValue, value)) {
        this.$emit('input', value);
        this.$emit('change', value, formatDateStr);
      }
    },
    onClearClick(e) {
      e.stopPropagation();
      e.preventDefault();
      this.setInnerValue(null);
    },
    onChange(value, formatDateStr) {
      this.setInnerValue(value, formatDateStr);
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
      formatValue,
      dateFormat,
      dateInputPlaceholder,
      disabled,
      isCanClear,
      visible,
      onClearClick,
      onChange,
    } = this;

    const pickerProps = {
      ...omit($props, ['value', 'format', 'placeholder', 'allowClear']),
      pickerPrefixCls: `${prefixCls}-picker-container`,
      value: innerValue,
      isOpen: visible,
      format: dateFormat,
      showWeekNumber: true,
      showTime: false,
      showToday: false,
      showDateInput: false,
    };
    const on = {
      ...omit($listeners, ['change']),
      change: onChange,
    };
    return (
      <VDatePicker {...{ props: pickerProps, on }}>
        <div class={pickerClasses} slot="trigger">
          <input
            class={pickerInputClass}
            value={formatValue}
            placeholder={dateInputPlaceholder}
            disabled={disabled}
            type="text"
            readonly
          />
          {isCanClear ? (
            <Icon class={`${prefixCls}-picker-clear`} type="close_circle" on-click={onClearClick} />
          ) : null}
          <span class={`${prefixCls}-picker-icon`} />
        </div>
      </VDatePicker>
    );
  },
};
