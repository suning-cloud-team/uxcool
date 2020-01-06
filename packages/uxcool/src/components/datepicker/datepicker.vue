<template>
  <v-date-picker v-bind="bindProps"
                 :value="innerValue"
                 :picker-prefix-cls="`${prefixCls}-picker-container`"
                 :date-input-placeholder="dateInputPlaceholder"
                 v-on="bindListeners"
                 @change="onChange"
  >
    <div slot="trigger"
         :class="pickerClasses"
    >
      <input :class="pickerInputClass"
             :value="formatValue"
             :placeholder="dateInputPlaceholder"
             :disabled="disabled"
             type="text"
             readonly
      >
      <icon v-if="isCanClear"
            :class="`${prefixCls}-picker-clear`"
            type="close_circle"
            @click.prevent.stop="onClearClick"
      />
      <span :class="`${prefixCls}-picker-icon`" />
    </div>
  </v-date-picker>
</template>

<script>
  import omit from 'object.omit';
  import { format as formatDate } from 'date-fns';
  import VDatePicker from '@suning/v-datepicker';
  import localeCN from './locale/zh_CN';
  import Icon from '../icon';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('DatePicker'),
    components: {
      VDatePicker,
      Icon,
    },
    props: {
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
      theme: {
        type: String,
        default: 'light',
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: undefined,
      },
      value: {
        type: Date,
        default: undefined,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      format: { type: String, default: '' },
      showTime: {
        type: [Boolean, Object],
        default: false,
      },
      showOk: {
        type: Boolean,
        default: undefined,
      },
      showDateInput: {
        type: Boolean,
        default: true,
      },
      showToday: Boolean,
      disabledDate: {
        type: Function,
        default() {
          return false;
        },
      },
      disabledTime: {
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
      placement: {
        type: String,
        default: 'bottomLeft',
        validator(val) {
          return ['bottomLeft', 'bottomRight', 'topRight', 'topLeft'].indexOf(val) > -1;
        },
      },
      transitionName: {
        type: String,
        default: 'slide-up',
      },
      animation: {
        type: String,
        default: '',
      },
      getPopupContainer: {
        type: Function,
        default: null,
      },
      okConfirm: {
        type: Boolean,
        default: false,
      },
      controlMode: {
        type: Boolean,
        default: false,
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
      isShowTime() {
        return !!this.showTime;
      },
      isShowOk() {
        const { showOk, isShowTime } = this;
        return showOk || (showOk !== false && isShowTime);
      },
      normlizeLocale() {
        const { locale } = this;

        if (!locale) {
          return localeCN.lang;
        }

        return locale.lang ? locale.lang : locale;
      },
      bindProps() {
        const { dateFormat, isShowOk, normlizeLocale } = this;
        return {
          ...omit(this.$props, ['value', 'format', 'placeholder', 'allowClear']),
          format: dateFormat,
          showOk: isShowOk,
          locale: normlizeLocale,
        };
      },
      bindListeners() {
        return omit(this.$listeners, ['change']);
      },
      dateInputPlaceholder() {
        const { placeholder, normlizeLocale } = this;
        return placeholder || normlizeLocale.placeholder;
      },
      isCanClear() {
        const { disabled, allowClear, innerValue } = this;
        return !disabled && allowClear && innerValue;
      },
      formatValue() {
        const { innerValue, dateFormat } = this;
        if (!innerValue) {
          return '';
        }
        return formatDate(innerValue, dateFormat);
      },

      dateFormat() {
        const { format, isShowTime } = this;
        return format || (isShowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
    },
    created() {
      this.innerValue = this.value;
    },
    methods: {
      setValue(value, formatDateString) {
        this.innerValue = value;
        this.$emit('input', value);
        this.$emit('change', value, formatDateString);
      },
      onChange(value, formatDateString) {
        this.setValue(value, formatDateString);
      },
      onClearClick() {
        this.setValue(null);
      },
    },
  };
</script>
