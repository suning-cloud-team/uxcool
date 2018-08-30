import { buildComponentName } from '../utils';

export default {
  $_veeValidate: {
    value() {
      return this.getValue();
    },
  },
  name: buildComponentName('Input'),
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'ux-input',
    },
    affixClass: {
      type: [String, Object, Array],
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['small', 'default', 'large', ''].indexOf(val) > -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    addonBefore: {
      type: String,
      default: '',
    },
    addonAfter: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerValue: '',
    };
  },
  computed: {
    classes() {
      const { prefixCls, size, disabled } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'large' || size === 'small',
        [`${prefixCls}-disabled`]: disabled,
      };
    },
    bindAttrs() {
      const { $attrs, disabled } = this;
      return {
        ...$attrs,
        disabled,
      };
    },
  },

  watch: {
    value(nVal) {
      this.setValue(nVal);
    },
  },
  created() {
    this.setValue(this.value);
  },
  methods: {
    setValue(val) {
      this.innerValue = val;
    },
    getValue() {
      return this.innerValue;
    },
    onInput(e) {
      const val = e.target.value;
      this.setValue(val);
      this.$emit('input', val, e);
    },
    onKeydown(e) {
      if (e.keyCode === 13) {
        this.$emit('pressenter', e);
      }
      this.$emit('keydown', e);
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
        inputRef.focus();
      }
    },
    getInputElement() {
      return this.$refs.inputRef;
    },
    getSlotOrAttrVal(name) {
      const { $slots } = this;

      const slotVal = $slots[name];

      if (slotVal) {
        return slotVal;
      }
      const attrVal = this[name];
      if (attrVal) {
        return attrVal;
      }

      return null;
    },
    renderInput() {
      const {
        prefixCls,
        classes,
        $listeners,
        bindAttrs,
        innerValue,
        onInput,
        onKeydown,
        affixClass,
        size,
        getSlotOrAttrVal,
      } = this;
      const prefix = getSlotOrAttrVal('prefix');
      const suffix = getSlotOrAttrVal('suffix');

      const on = {
        ...$listeners,
        input: onInput,
        keydown: onKeydown,
      };

      const inputElement = (
        <input
          {...{
            class: !prefix && !suffix ? [classes, affixClass] : classes,
            attrs: bindAttrs,
            domProps: {
              value: innerValue,
            },
            on,
            ref: 'inputRef',
          }}
        />
      );

      if (!prefix && !suffix) {
        return inputElement;
      }

      const prefixElement = prefix ? <span class={`${prefixCls}-prefix`}>{prefix}</span> : null;
      const suffixElement = suffix ? <span class={`${prefixCls}-suffix`}>{suffix}</span> : null;
      const affixCls = [
        affixClass,
        {
          [`${prefixCls}-affix-wrapper`]: true,
          [`${prefixCls}-affix-wrapper-${size === 'large' ? 'lg' : 'sm'}`]:
            size === 'large' || size === 'small',
        },
      ];
      return (
        <span class={affixCls}>
          {prefixElement}
          {inputElement}
          {suffixElement}
        </span>
      );
    },
    renderAddon(children) {
      const { prefixCls, size, getSlotOrAttrVal } = this;
      const addonBefore = getSlotOrAttrVal('addonBefore');
      const addonAfter = getSlotOrAttrVal('addonAfter');
      if (!addonBefore && !addonAfter) {
        return children;
      }

      const addonCls = `${prefixCls}-group-addon`;
      const before = addonBefore ? <span class={addonCls}>{addonBefore}</span> : null;
      const after = addonAfter ? <span class={addonCls}>{addonAfter}</span> : null;

      const wrapperCls = {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-group`]: true,
      };

      const groupCls = {
        [`${prefixCls}-group-wrapper`]: true,
        [`${prefixCls}-group-wrapper-${size === 'large' ? 'lg' : 'sm'}`]:
          size === 'large' || size === 'small',
      };
      return (
        <span class={groupCls}>
          <span class={wrapperCls}>
            {before}
            {children}
            {after}
          </span>
        </span>
      );
    },
  },
  render() {
    const { renderAddon, renderInput } = this;

    return renderAddon(renderInput());
  },
};
