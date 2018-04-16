<template>
  <v-date-picker v-bind="bindProps"
                 :value="innerValue"
                 :picker-prefix-cls="`${prefixCls}-picker-container`"
                 :date-input-placeholder="dateInputPlaceholder"
                 v-on="bindListeners"
                 @change="onChange">
    <div :class="pickerClasses"
         slot="trigger">
      <input type="text"
             :class="pickerInputClass"
             readonly
             :value="formatValue"
             :placeholder="dateInputPlaceholder"
             :disabled="disabled">
      <icon v-if="isCanClear"
            type="close_circle"
            :class="`${prefixCls}-picker-clear`"
            @click.prevent.stop="onClearClick" />
      <span :class="`${prefixCls}-picker-icon`" />
    </div>
  </v-date-picker>
</template>

<script>
  import omit from 'object.omit';
  import { format as formatDate } from 'date-fns';
  import VDatePicker from '@suning/v-datepicker';
  import locale from './locale/en_US';
  import Icon from '../icon';
  import { buildComponentName } from '../utils';

  export default {
    name: buildComponentName('DatePicker'),
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
      isOpen: Boolean,
      mode: String,
      value: {
        type: Date,
      },
      disabled: Boolean,
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
      placeholder: String,
    },
    data() {
      return {
        innerValue: null,
      };
    },
    created() {
      this.innerValue = this.value;
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
    methods: {
      setValue(value) {
        this.innerValue = value;
        this.$emit('input', value);
        this.$emit('change', value);
      },
      onChange(value) {
        this.setValue(value);
      },
      onClearClick() {
        this.setValue(null);
      },
    },
    components: {
      VDatePicker,
      Icon,
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
    },
  };
</script>
