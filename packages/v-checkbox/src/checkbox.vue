<template>
  <span :class="classes">
    <input ref="inputRef"
           :type="type"
           :class="`${prefixCls}-input`"
           v-bind="$attrs"
           :checked="checked"
           :value="value"
           :readonly="readonly"
           :disabled="disabled"
           @change="onChange">
    <span :class="`${prefixCls}-inner`" />
  </span>
</template>


<script>
  export default {
    name: 'Checkbox',
    model: {
      prop: 'checked',
    },
    props: {
      prefixCls: {
        type: String,
        default: 'v-checkbox',
      },
      type: {
        type: String,
        default: 'checkbox',
        validate(val) {
          return ['radio', 'checkbox'].indexOf(val) > -1;
        },
      },
      checked: {
        type: Boolean,
        required: true,
        default: false,
      },
      value: {
        type: [String, Number],
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      classes() {
        const { prefixCls, checked, disabled } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-checked`]: checked,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
    },
    methods: {
      onChange(e) {
        const { disabled, $props } = this;
        if (disabled) {
          return;
        }
        const { checked } = e.target;
        this.$emit('input', checked);
        this.$emit('change', {
          target: {
            ...$props,
            checked,
          },
          domEvent: e,
        });
      },
    },
    focus() {
      const { $refs: { inputRef } } = this;
      if (inputRef) {
        inputRef.focus();
      }
    },
    blur() {
      const { $refs: { inputRef } } = this;
      if (inputRef) {
        inputRef.blur();
      }
    },
  };
</script>
