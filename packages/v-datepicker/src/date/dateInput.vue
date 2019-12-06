<template>
  <div :class="`${prefixCls}-input-wrap`">
    <div :class="`${prefixCls}-date-input-wrap`">
      <input :title="innerValue"
             :class="inputClasses"
             :placeholder="placeholder"
             :value="innerValue"
             :disabled="disabled"
             readonly
             @change="onChange">
    </div>
    <a v-if="showClear"
       :class="`${prefixCls}-clear-btn`"
       role="button"
       :title="locale.clear"
       @click="onClear" />
  </div>
</template>


<script>
  import { format as formatFn, isValid, parse as parseFn, isSameSecond, isSameDay } from 'date-fns';
  import { isArray } from '@suning/v-utils';
  import MultiCalendarMixin from '../mixins/multiCalendar';

  export default {
    name: 'DateInput',
    mixins: [MultiCalendarMixin],
    props: {
      prefixCls: {
        type: String,
        default: '',
      },
      value: {
        type: [Date, Array],
        default: undefined,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      placeholder: {
        type: String,
        default: '',
      },
      format: {
        type: String,
        default: '',
      },
      locale: {
        type: Object,
        default: null,
      },
      showClear: {
        type: Boolean,
        default: false,
      },
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
    },
    data() {
      return {
        prevVal: '',
        innerValue: '',
        invalid: false,
      };
    },
    computed: {
      inputClasses() {
        const { prefixCls, invalid } = this;
        return {
          [`${prefixCls}-input`]: true,
          [`${prefixCls}-input-invalid`]: invalid,
        };
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.initInputVal();
        }
      },
    },
    created() {
      this.initInputVal();
    },
    methods: {
      initInputVal() {
        const {
          value, format, isMultiCalendarChildren, mutliFormatSeparator
        } = this;

        if (isMultiCalendarChildren) {
          if (isArray(value)) {
            this.innerValue = value.map(v => formatFn(v, format)).join(mutliFormatSeparator);
          } else {
            this.innerValue = '';
          }
          return;
        }
        if (!value) {
          return;
        }
        const parsedVal = parseFn(value);
        if (isValid(parsedVal)) {
          this.prevVal = parsedVal;
          this.innerValue = formatFn(parsedVal, format);
        }
      },
      isSameFn(originVal, val) {
        const { hasTimePicker } = this;
        return hasTimePicker ? isSameSecond(originVal, val) : isSameDay(originVal, val);
      },
      onChange(e) {
        const { value } = e.target;
        const { prevVal, isSameFn, format } = this;
        this.innerValue = value;
        this.invalid = false;

        if (!value) {
          this.prevVal = value;
          this.invalid = false;
          this.$emit('on-change', null);
          return;
        }

        const parsedVal = parseFn(value);
        if (!isValid(parsedVal)) {
          this.invalid = true;
          return;
        }
        if (!prevVal || !isSameFn(prevVal, parsedVal)) {
          this.$emit('on-change', parsedVal);
        } else {
          // 防止只是格式变更, 重新格式化为标准格式
          this.innerValue = formatFn(parsedVal, format);
        }
      },
      onClear() {
        this.innerValue = '';
        this.$emit('on-clear', null);
      },
    },
  };
</script>
