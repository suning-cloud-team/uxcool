import { buildComponentName } from '../utils';
import Icon from '../icon';

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
    showWordLimit: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      innerValue: '',
      length: 0,
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
    limitWord() {
      const { length, showWordLimit, $attrs } = this;
      const { maxlength } = $attrs;
      return maxlength && showWordLimit ? `${length}/${maxlength}` : null;
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
      this.length = val ? val.length : 0;
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
    // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/230
    onBlur(e) {
      this.$emit('blur', e);
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
    onClear(e) {
      this.setValue('');
      this.focus();
      this.$emit('input', '', e);
    },
    renderClearIcon() {
      const {
        prefixCls, allowClear, innerValue, onClear
      } = this;

      if (!allowClear || innerValue === undefined || innerValue === null || innerValue === '') {
        return null;
      }

      return (
        <Icon
          type="close_circle"
          role="button"
          class={`${prefixCls}-clear-icon`}
          on-click={onClear}
        />
      );
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
        onBlur,
        affixClass,
        size,
        getSlotOrAttrVal,
        limitWord,
        allowClear,
        renderClearIcon,
      } = this;
      const prefix = getSlotOrAttrVal('prefix');
      const suffix = getSlotOrAttrVal('suffix');

      const on = {
        ...$listeners,
        input: onInput,
        keydown: onKeydown,
        // http://opensource.cnsuning.com/uxcool/lerna-uxcool/issues/230
        blur: onBlur,
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

      if (!prefix && !suffix && !limitWord && !allowClear) {
        return inputElement;
      }

      const prefixElement = prefix ? <span class={`${prefixCls}-prefix`}>{prefix}</span> : null;
      const limitWordElement = limitWord ? (
        <span class={`${prefixCls}-limit-word`}>{limitWord}</span>
      ) : null;
      const suffixElement =
        suffix || limitWordElement || allowClear ? (
          <span class={`${prefixCls}-suffix`}>
            {renderClearIcon()}
            {suffix}
            {limitWordElement}
          </span>
      ) : null;
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
