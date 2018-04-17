import { buildComponentName } from '../utils';

export default {
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
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
      validate(val) {
        return ['small', 'default', 'large'].indexOf(val) > -1;
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
  computed: {
    classes() {
      const { prefixCls, size, disabled } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'large' || size === 'small',
        [`${prefixCls}-disabled`]: disabled,
      };
    },
    bindProps() {
      const { $attrs, disabled } = this;
      return {
        ...$attrs,
        disabled,
      };
    },
  },
  methods: {
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
        bindProps,
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
            attrs: bindProps,
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
    onInput(e) {
      this.$emit('input', e.target.value);
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
  },
  render() {
    const { renderAddon, renderInput } = this;

    return renderAddon(renderInput());
  },
};
