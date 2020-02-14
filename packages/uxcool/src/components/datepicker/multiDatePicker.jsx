import omit from 'object.omit';
import { isDate, format as formatDate } from 'date-fns';
import { isEqual, isArray } from '@suning/v-utils';
import { VMultiCalendar, VPicker } from '@suning/v-datepicker';
import { buildComponentName } from '../utils';
import localeCN from './locale/zh_CN';
import Icon from '../icon';

const DEFAULT_SIZE_MAP = {
  small: 'sm',
  large: 'lg',
};
const MULTI_FORMAT_SEPARATOR = ', ';

function getFormatValue(value, format) {
  return value.map((v) => formatDate(v, format));
}
export default {
  name: buildComponentName('MultiDateicker'),
  props: {
    ...omit(VPicker.props, ['destroyPopupOnHide', 'showOk', 'showToday']),
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
    normalizeLocale() {
      const { locale } = this;
      if (!locale) {
        return localeCN.lang;
      }

      return locale.lang ? locale.lang : locale;
    },
    dateInputPlaceholder() {
      const { placeholder, normalizeLocale } = this;
      return placeholder || (normalizeLocale && normalizeLocale.multiPlaceholder);
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
      this.setInnerValue(nVal, false);
    },
    visible(nVal) {
      this.setInnerVisible(nVal);
    },
  },
  created() {
    const {
      value, setInnerValue, visible, setInnerVisible
    } = this;
    setInnerValue(value, false);
    setInnerVisible(visible);
  },
  methods: {
    setInnerValue(value, trigger = true) {
      const { innerValue, format } = this;
      let val = isArray(value) ? value : [value];
      val = val.filter((v) => isDate(v));
      this.innerValue = val;
      if (trigger && !isEqual(innerValue, val)) {
        const formatValue = getFormatValue(val, format).join(MULTI_FORMAT_SEPARATOR);
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
        disabled,
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
        normalizeLocale,
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
        locale: normalizeLocale,
        pickerValue: currentPickerValue,
        selectedValue: innerValue,
        format,
        formatSeparator: MULTI_FORMAT_SEPARATOR,
        placeholder: dateInputPlaceholder,
        showDateInput,
        disabledDate,
      };
      const on = {
        select: onSelect,
        unselect: onUnSelect,
        'panel-change': onPanelChange,
        ok: onOk,
      };
      return <VMultiCalendar {...{ class: `${prefixCls}-multi`, props, on }} />;
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

    return <VPicker {...{ props, scopedSlots, on }} />;
  },
};
