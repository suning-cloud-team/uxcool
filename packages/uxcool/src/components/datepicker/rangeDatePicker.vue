<template>
  <v-range-date-picker v-bind="bindProps"
                       :selected-value="innerValue"
                       :picker-prefix-cls="`${prefixCls}-picker-container`"
                       :date-input-placeholder="[startPlaceholder,endPlaceholder]"
                       v-on="bindListeners"
                       @change="onChange">
    <template slot="trigger">
      <div :class="pickerClasses">
        <div :class="pickerInputClass">
          <input type="text"
                 readonly
                 :class="`${prefixCls}-range-picker-input`"
                 :value="startValue"
                 :placeholder="startPlaceholder"
                 :disabled="disabled"
                 tabindex="-1">
          <span :class="`${prefixCls}-range-picker-separator`"> ~ </span>
          <input type="text"
                 readonly
                 :class="`${prefixCls}-range-picker-input`"
                 :value="endValue"
                 :placeholder="endPlaceholder"
                 :disabled="disabled"
                 tabindex="-1">
          <icon v-if="isCanClear"
                type="close_circle"
                :class="`${prefixCls}-picker-clear`"
                @click.prevent.stop="onClearClick" />
          <span :class="`${prefixCls}-picker-icon`" />
        </div>

      </div>
    </template>
  </v-range-date-picker>

</template>

<script>
  import omit from 'object.omit';
  import { format as formatDate } from 'date-fns';
  import { VRangeDatePicker } from '@suning/v-datepicker';
  import { buildComponentName } from '../utils';
  import Icon from '../icon';
  import locale from './locale/en_US';

  export default {
    name: buildComponentName('DatePicker'),
    components: {
      VRangeDatePicker,
      Icon,
    },
    model: {
      prop: 'selectedValue',
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
      isOpen: {
        type: Boolean,
        default: false,
      },
      selectedValue: {
        type: Array,
        default() {
          return [];
        },
      },
      mode: {
        type: Array,
        validator(val) {
          return val.every(v => ['date', 'month', 'year', 'decade'].indexOf(v) > -1);
        },
        default() {
          return ['date', 'date'];
        },
      },
      theme: {
        type: String,
        default: 'light',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      format: {
        type: String,
        default: null,
      },
      showTime: {
        type: [Boolean, Object],
        default: false,
      },
      showOk: {
        type: Boolean,
        default() {
          return !!this.showTime;
        },
      },
      disabledDate: {
        type: Function,
        default: undefined,
      },
      disabledTime: {
        type: Function,
        default: undefined,
      },
      placeholder: {
        type: [String, Array],
        default: '',
      },
      showToday: {
        type: Boolean,
        default: false,
      },
      allowClear: {
        type: Boolean,
        default: true,
      },
      ranges: {
        type: Object,
        default: undefined,
      },
    },
    data() {
      return {
        innerValue: null,
      };
    },
    computed: {
      bindProps() {
        return omit(this.$props, ['selectedValue', 'placeholder', 'allowClear']);
      },
      bindListeners() {
        return omit(this.$listeners, ['change']);
      },
      startPlaceholder() {
        const { placeholder } = this;
        const { rangePlaceholder } = locale.lang;
        let holder = rangePlaceholder[0];
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
        const { placeholder } = this;
        const { rangePlaceholder } = locale.lang;
        let holder = rangePlaceholder[1];
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
      isCanClear() {
        const { disabled, allowClear, innerValue = [] } = this;
        const [start, end] = innerValue;
        return !disabled && allowClear && (start || end);
      },
      isShowTime() {
        return !!this.showTime;
      },
      dateFormat() {
        const { format, isShowTime } = this;
        return format || (isShowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
      },
      startValue() {
        const { innerValue = [], dateFormat } = this;
        const [start] = innerValue;
        return start ? formatDate(start, dateFormat) : '';
      },
      endValue() {
        const { innerValue = [], dateFormat } = this;
        const [, end] = innerValue;
        return end ? formatDate(end, dateFormat) : '';
      },
    },
    watch: {
      selectedValue(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
    },
    created() {
      this.innerValue = this.selectedValue;
    },
    methods: {
      setValue(values) {
        this.innerValue = values;
        this.$emit('input', values);
        this.$emit('change', values);
      },
      onChange(values) {
        this.setValue(values);
      },
      onClearClick() {
        this.setValue([]);
      },
    },
  };
</script>
