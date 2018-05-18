<template>
  <textarea ref="textarea"
            :class="classes"
            :style="textAreaStyle"
            :value="innerValue"
            :disabled="disabled"
            v-on="bindListeners" />
</template>

<script>
  import { raf } from '@suning/v-utils';
  import { buildComponentName } from '../utils';
  import calculateNodeHeight from './calculateNodeHeight';

  export default {
    name: buildComponentName('Textarea'),
    props: {
      prefixCls: {
        type: String,
        default: 'ux-input',
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
      theme: {
        type: String,
        default: 'light',
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
        const { prefixCls, theme, disabled } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-${theme}`]: !!theme,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
      bindListeners() {
        const { $listeners, onInput, onKeydown } = this;
        return {
          ...$listeners,
          input: onInput,
          keydown: onKeydown,
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
          raf.cancel(nextFrameId);
        }
        this.nextFrameId = raf(() => {
          calcTextAreaStyle(innerValue);
        });
      },
      onInput(e) {
        const { value } = e.target;
        // 解决 因vue异步更新数据导致textarea scrollTop值不为0,出现抖动的问题
        // this.$refs.textarea.value = this.innerValue;
        this.innerValue = value;
        this.$emit('input', value);
        this.$emit('on-change', e);
      },
      onChange(e) {
        this.$emit('change', e);
      },
      onKeydown(e) {
        if (e.keyCode === 13) {
          this.$emit('on-press-enter', e);
          this.$emit('pressenter', e);
          // return;
        }
        this.$emit('on-key-down', e);
        this.$emit('keydown', e);
      },
    },
  };
</script>
