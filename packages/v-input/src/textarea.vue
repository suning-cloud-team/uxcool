<template>
  <textarea ref="textarea"
            :class="classes"
            :style="[textAreaStyle]"
            :value="innerValue"
            :disabled="disabled"
            @input="onChange"
            @keydown="onKeyDown">
  </textarea>
</template>

<script>
  import { cancelNextFrameAction, onNextFrame } from './utils';
  import calculateNodeHeight from './calculateNodeHeight';

  export default {
    name: 'TextArea',
    props: {
      prefixCls: {
        type: String,
        default: 'v-input',
      },
      autoSize: {
        type: [Boolean, Object],
        default() {
          return false;
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        textAreaStyle: '',
        nextFrameId: null,
        innerValue: null,
      };
    },
    computed: {
      classes() {
        const { prefixCls, disabled } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
    },
    watch: {
      value(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerValue = nVal;
        }
      },
      innerValue(nVal, oVal) {
        if (nVal !== oVal) {
          this.resizeTextarea();
        }
      },
    },
    created() {
      this.innerValue = this.value;
    },
    methods: {
      calcTextAreaStyle(value) {
        const { autoSize, $refs } = this;
        if (!this.autoSize) {
          return;
        }
        const { minRows = null, maxRows = null } = autoSize;
        this.textAreaStyle = calculateNodeHeight($refs.textarea, value, false, minRows, maxRows);
      },
      resizeTextarea() {
        const { nextFrameId, calcTextAreaStyle, innerValue } = this;
        if (nextFrameId) {
          cancelNextFrameAction(nextFrameId);
        }
        this.nextFrameId = onNextFrame(() => {
          calcTextAreaStyle(innerValue);
        });
      },
      onChange(e) {
        const { value } = e.target;
        // 解决 因vue异步更新数据导致textarea scrollTop值不为0,出现抖动的问题
        // this.$refs.textarea.value = this.innerValue;
        this.innerValue = value;
        this.$emit('input', value);
        this.$emit('on-change', e);
      },
      onKeyDown(e) {
        if (e.keyCode === 13) {
          this.$emit('on-press-enter', e);
          return;
        }
        this.$emit('on-key-down', e);
      },
    },
  };
</script>
