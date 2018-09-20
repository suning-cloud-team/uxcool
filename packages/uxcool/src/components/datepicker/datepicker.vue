<template>
  <v-date-picker v-bind="bindProps"
                 :value="innerValue"
                 :picker-prefix-cls="`${prefixCls}-picker-container`"
                 :date-input-placeholder="dateInputPlaceholder"
                 v-on="bindListeners"
                 @change="onChange">
    <div slot="trigger"
         :class="pickerClasses">
      <input :class="pickerInputClass"
             :value="formatValue"
             :placeholder="dateInputPlaceholder"
             :disabled="disabled"
             type="text"
             readonly>
      <icon v-if="isCanClear"
            :class="`${prefixCls}-picker-clear`"
            type="close_circle"
            @click.prevent.stop="onClearClick" />
      <span :class="`${prefixCls}-picker-icon`" />
    </div>
  </v-date-picker>
</template>

<script>
  import omit from 'object.omit';
  import { format as formatDate } from 'date-fns';
  import VDatePicker from '@suning/v-datepicker';
  import locale from './locale/zh_CN';
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
          return locale.lang;
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
      format: String,
      showTime: [Boolean, Object],
      showOk: {
        type: Boolean,
        default() {
          return !!this.showTime;
        },
      },
      showDateInput: Boolean,
      showToday: Boolean,
      disabledDate: Function,
      disabledTime: Function,
      allowClear: {
        type: Boolean,
        default: true,
      },
      placeholder: {
        type: String,
        default: '',
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
    },
    data() {
      return {
        innerValue: null,
      };
    },
    computed: {
      pickerClasses() {
        const { prefixCls, theme } = this;
        return {
          [`${prefixCls}-picker`]: true,
          [`${prefixCls}-picker-${theme}`]: true,
        };
      },
      pickerInputClass() {
        const { prefixCls, disabled } = this;
        const inputPrefix = 'ux-input';
        return {
          [inputPrefix]: true,
          [`${prefixCls}-picker-input`]: true,
          [`${inputPrefix}-disabled`]: disabled,
        };
      },
      bindProps() {
        return omit(this.$props, ['value', 'placeholder', 'allowClear']);
      },
      bindListeners() {
        return omit(this.$listeners, ['change']);
      },
      dateInputPlaceholder() {
        const { placeholder } = this;
        return placeholder || locale.lang.placeholder;
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
      isShowTime() {
        return !!this.showTime;
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
