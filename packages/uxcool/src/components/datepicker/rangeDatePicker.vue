<template>
  <v-range-date-picker v-bind="bindProps"
                       v-on="bindListeners"
                       @change="onChange">
    <template slot="trigger">
      <div :class="pickerClasses">
        <div :class="pickerInputClass">
          <input :class="`${prefixCls}-range-picker-input`"
                 :value="startValue"
                 :placeholder="startPlaceholder"
                 :disabled="disabled"
                 type="text"
                 readonly
                 tabindex="-1">
          <span :class="`${prefixCls}-range-picker-separator`"> ~ </span>
          <input :class="`${prefixCls}-range-picker-input`"
                 :value="endValue"
                 :placeholder="endPlaceholder"
                 :disabled="disabled"
                 type="text"
                 readonly
                 tabindex="-1">
          <icon v-if="isCanClear"
                :class="`${prefixCls}-picker-clear`"
                type="close_circle"
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
  import locale from './locale/zh_CN';

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
          return val.every(v => ['time', 'date', 'month'].indexOf(v) > -1);
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
      // 当未设置 selectedValue 时,通过此项设置弹窗默认值
      openValue: {
        type: Array,
        default: undefined,
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
      bindProps() {
        const { prefixCls, innerValue, startPlaceholder, endPlaceholder, openValue } = this;
        return {
          ...this.$props,
          selectedValue: innerValue,
          pickerPrefixCls: `${prefixCls}-picker-container`,
          dateInputPlaceholder: [startPlaceholder, endPlaceholder],
          value: openValue || undefined,
        };
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
      isCanClear() {
        const { disabled, allowClear, innerValue } = this;
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
      selectedValue(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal || [];
        }
      },
    },
    created() {
      this.innerValue = this.selectedValue || [];
    },
    methods: {
      setValue(values, formatDateStrings) {
        this.innerValue = values || [];
        this.$emit('input', values);
        this.$emit('change', values, formatDateStrings);
      },
      onChange(values, formatDateStrings) {
        this.setValue(values, formatDateStrings);
      },
      onClearClick() {
        this.setValue([]);
      },
    },
  };
</script>
