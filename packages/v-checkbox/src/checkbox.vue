<template>
  <span :class="classes">
    <input ref="inputRef"
           :type="type"
           :class="`${prefixCls}-input`"
           v-bind="$attrs"
           :checked="innerChecked"
           :value="value"
           :disabled="disabled"
           @change="onChange">
    <span :class="`${prefixCls}-inner`" />
  </span>
</template>


<script>
  export default {
    name: 'Checkbox',
    inheritAttrs: false,
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
        validator(val) {
          return ['radio', 'checkbox'].indexOf(val) > -1;
        },
      },
      checked: {
        type: Boolean,
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
    },
    data() {
      return {
        innerChecked: false,
      };
    },
    computed: {
      classes() {
        const { prefixCls, innerChecked, disabled } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-checked`]: innerChecked,
          [`${prefixCls}-disabled`]: disabled,
        };
      },
    },
    watch: {
      checked(nVal, oVal) {
        if (nVal !== oVal) {
          this.innerChecked = nVal;
        }
      },
    },
    created() {
      this.innerChecked = this.checked;
    },
    methods: {
      getValue() {
        return this.innerChecked;
      },
      onChange(e) {
        const { disabled, $props } = this;
        if (disabled) {
          return;
        }
        const { checked } = e.target;
        this.innerChecked = checked;
        this.$emit('input', checked);
        this.$emit('change', {
          target: {
            ...$props,
            checked,
          },
          domEvent: e,
        });
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
    },
  };
</script>
