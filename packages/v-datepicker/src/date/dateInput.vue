<template>
  <div :class="`${prefixCls}-input-wrap`">
    <div :class="`${prefixCls}-date-input-wrap`">
      <input :class="inputClasses"
             :value="inputVal"
             :disabled="disabled"
             :placeholder="placeholder"
             readonly
             @change="onChange" />
    </div>
    <a v-if="showClear"
       :class="`${prefixCls}-clear-btn`"
       role="button"
       :title="locale.clear"
       @click="onClear"></a>
  </div>
</template>


<script>
  import { format as formatFn, isValid, parse as parseFn, isSameSecond, isSameDay } from 'date-fns';
  import { noop } from '../utils';

  export default {
    name: 'DateInput',
    props: {
      prefixCls: String,
      value: Date,
      disabled: Boolean,
      placeholder: String,
      format: String,
      locale: Object,
      showClear: Boolean,
      disabledDate: Function,
      disabledTime: Function,
    },
    data() {
      return {
        prevVal: '',
        inputVal: '',
        invalid: false,
      };
    },
    created() {
      this.initInputVal();
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
    methods: {
      initInputVal() {
        const { value, format } = this;
        if (!value) {
          return;
        }
        const parsedVal = parseFn(value);
        if (isValid(parsedVal)) {
          this.prevVal = parsedVal;
          this.inputVal = formatFn(parsedVal, format);
        }
      },
      isSameFn(originVal, val) {
        const { hasTimePicker } = this;
        return hasTimePicker ? isSameSecond(originVal, val) : isSameDay(originVal, val);
      },
      onChange(e) {
        const { value } = e.target;
        const { prevVal, isSameFn, format } = this;
        this.inputVal = value;
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
          console.log(parsedVal);
          this.$emit('on-change', parsedVal);
        } else {
          // 防止只是格式变更, 重新格式化为标准格式
          this.inputVal = formatFn(parsedVal, format);
        }
      },
      onClear() {
        this.inputVal = '';
        this.$emit('on-clear', null);
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.initInputVal();
        }
      },
    },
  };
</script>