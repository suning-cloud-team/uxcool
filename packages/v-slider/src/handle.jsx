export default {
  name: 'SliderHandle',
  // Don't use mixins
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Number,
      default: 0,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      const { vertical, offset } = this;
      return vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    },
    bindAttrs() {
      const {
        $attrs, min, max, value, disabled
      } = this;

      return {
        ...$attrs,
        'aria-valuemin': min,
        'aria-valuemax': max,
        'aria-valuenow': value,
        'aria-disabled': !!disabled,
      };
    },
  },
  methods: {
    focus() {
      const { $refs: { handleRef } } = this;
      if (handleRef) {
        handleRef.focus();
      }
    },
    blur() {
      const { $refs: { handleRef } } = this;
      if (handleRef) {
        handleRef.blur();
      }
    },
    onFocus(e) {
      this.$emit('focus', e);
    },
    onBlur(e) {
      this.$emit('blur', e);
    },
  },
  render() {
    const {
      style, bindAttrs, onFocus, onBlur
    } = this;
    const on = {
      focus: onFocus,
      blur: onBlur,
    };
    return <div ref="handleRef" style={style} {...{ attrs: bindAttrs, on }} />;
  },
};
