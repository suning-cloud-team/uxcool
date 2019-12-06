import omit from 'object.omit';
import { isDate, format as formatDate } from 'date-fns';
import { isEqual, isArray } from '@suning/v-utils';
import Picker from '@suning/v-datepicker/es/picker';
import MultiCalendar from '@suning/v-datepicker/es/multiCalendar';
import localeCN from './locale/zh_CN';
import Icon from '../icon';

const DEFAULT_SIZE_MAP = {
  small: 'sm',
  large: 'lg',
};
const MULTI_FORMAT_SEPARATOR = ', ';

function getFormatValue(value, format) {
  return value.map(v => formatDate(v, format));
}
export default {
  name: '',
  props: {
    ...omit(Picker.props, ['destroyPopupOnHide']),
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
    pickerValue: {
      type: Date,
      default() {
        return new Date();
      },
    },
    value: {
      type: [Date, Array],
      default() {
        return [];
      },
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
      default: 'YYYY-MM-DD',
    },
    showDateInput: {
      type: Boolean,
      default: true,
    },
    disabledDate: {
      type: Function,
      default() {
        return false;
      },
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
      validator(value) {
        return ['small', 'large', 'default'].indexOf(value) > -1;
      },
    },
  },
  data() {
    return {
      innerValue: null,
      innerVisible: false,
    };
  },
  computed: {
    pickerClasses() {
      const { prefixCls, size } = this;
      return {
        [`${prefixCls}-picker`]: true,
        [`${prefixCls}-picker-${size}`]: true,
      };
    },
    pickerInputClass() {
      const { prefixCls, disabled, size } = this;
      const inputPrefix = 'ux-input';
      return {
        [inputPrefix]: true,
        [`${prefixCls}-picker-input`]: true,
        [`${inputPrefix}-disabled`]: disabled,
        [`${inputPrefix}-${DEFAULT_SIZE_MAP[size]}`]: size !== 'default',
      };
    },
    dateInputPlaceholder() {
      const { placeholder, locale } = this;
      return placeholder || (locale && locale.multiPlaceholder);
    },
    isCanClear() {
      const { disabled, allowClear, innerValue } = this;
      return !disabled && allowClear && innerValue;
    },
    currentPickerValue() {
      const { innerValue, pickerValue } = this;
      return innerValue[innerValue.length - 1] || pickerValue || new Date();
    },
    formatValue() {
      const { innerValue, format } = this;
      return getFormatValue(innerValue, format).join(MULTI_FORMAT_SEPARATOR);
    },
  },
  watch: {
    value(nVal) {
      this.setInnerValue(nVal);
    },
    visible(nVal) {
      this.setInnerVisible(nVal);
    },
  },
  created() {
    const {
      value, setInnerValue, visible, setInnerVisible
    } = this;
    setInnerValue(value);
    setInnerVisible(visible);
  },
  methods: {
    setInnerValue(value) {
      const { innerValue, format } = this;
      let val = isArray(value) ? value : [value];
      val = val.filter(v => isDate(v));
      this.innerValue = val;
      if (!isEqual(innerValue, val)) {
        const formatValue = getFormatValue(val, format);
        this.$emit('input', val);
        this.$emit('change', val, formatValue);
      }
    },
    setInnerVisible(visible) {
      this.innerVisible = visible;
    },
    onVisibleChange(visible) {
      this.setInnerVisible(visible);
      // modify .sync
      this.$emit('update:visible', visible);
      this.$emit('open-change', visible);
    },
    onClear(e) {
      e.stopPropagation();
      e.preventDefault();
      this.setInnerValue(null);
    },
    onSelect(...args) {
      this.$emit('select', ...args);
    },
    onUnSelect(...args) {
      this.$emit('unselect', ...args);
    },
    onPanelChange(...args) {
      this.$emit('panel-change', ...args);
    },
    onOk(value) {
      const { setInnerValue, setInnerVisible } = this;
      setInnerValue(value);
      setInnerVisible(false);
      this.$emit('ok', value);
    },
    renderTriggerSlot() {
      const {
        prefixCls,
        disabled,
        formatValue,
        pickerClasses,
        pickerInputClass,
        dateInputPlaceholder,
        isCanClear,
        onClear,
      } = this;
      const props = {
        disabled,
      };
      const domProps = {
        value: formatValue,
      };
      const attrs = {
        type: 'text',
        readonly: true,
        placeholder: dateInputPlaceholder,
      };
      return (
        <div class={pickerClasses}>
          <input
            {...{
              class: pickerInputClass,
              props,
              domProps,
              attrs,
            }}
          />
          {isCanClear ? (
            <Icon class={`${prefixCls}-picker-clear`} type="close_circle" on-click={onClear} />
          ) : null}
        </div>
      );
    },
    renderPopupSlot() {
      const {
        prefixCls,
        locale,
        currentPickerValue,
        innerValue,
        format,
        dateInputPlaceholder,
        showDateInput,
        disabledDate,
        onSelect,
        onUnSelect,
        onPanelChange,
        onOk,
      } = this;

      const props = {
        prefixCls,
        locale,
        pickerValue: currentPickerValue,
        selectedValue: innerValue,
        format,
        formatSeparator: MULTI_FORMAT_SEPARATOR,
        dateInputPlaceholder,
        showDateInput,
        disabledDate,
      };
      const on = {
        select: onSelect,
        unselect: onUnSelect,
        'panel-change': onPanelChange,
        ok: onOk,
      };
      return <MultiCalendar {...{ class: `${prefixCls}-multi`, props, on }} />;
    },
  },
  render() {
    const {
      prefixCls,
      innerVisible,
      disabled,
      align,
      placement,
      builtinPlacements,
      transitionName,
      animation,
      getPopupContainer,
      renderTriggerSlot,
      renderPopupSlot,
      onVisibleChange,
    } = this;

    const props = {
      prefixCls: `${prefixCls}-picker-container`,
      visible: innerVisible,
      disabled,
      align,
      placement,
      builtinPlacements,
      transitionName,
      animation,
      getPopupContainer,
    };
    const scopedSlots = {
      trigger: renderTriggerSlot,
      popup: renderPopupSlot,
    };
    const on = {
      'visible-change': onVisibleChange,
    };

    return <Picker {...{ props, scopedSlots, on }} />;
  },
};
