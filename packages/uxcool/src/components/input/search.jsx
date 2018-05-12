import omit from 'object.omit';
import { buildComponentName } from '../utils';
import Button from '../button';
import Icon from '../icon';
import Input from './input';

export default {
  name: buildComponentName('SearchInput'),
  inheritAttrs: false,
  props: {
    ...Input.props,
    prefixCls: {
      type: String,
      default: 'ux-input-search',
    },
    inputPrefixCls: {
      type: String,
      default: 'ux-input',
    },
    enterButton: {
      type: [String, Boolean],
      default: false,
    },
  },
  data() {
    return {
      inputRef: null,
    };
  },
  computed: {
    bindProps() {
      const { $props, $attrs, inputPrefixCls } = this;

      return {
        ...$attrs,
        ...omit($props, ['inputPrefixCls', 'enterButton']),
        prefixCls: inputPrefixCls,
      };
    },
    bindListeners() {
      const { $listeners, onPressenter } = this;
      return {
        ...$listeners,
        pressenter: onPressenter,
      };
    },
  },
  mounted() {
    this.inputRef = this.$refs.inputRef;
  },
  methods: {
    getInputRef() {
      const { inputRef, $refs } = this;
      return inputRef || $refs.inputRef;
    },
    focus() {
      const inputRef = this.getInputRef();
      if (inputRef) {
        inputRef.focus();
      }
    },
    blur() {
      const inputRef = this.getInputRef();
      if (inputRef) {
        inputRef.blur();
      }
    },
    onSearch(e) {
      const inputRef = this.getInputRef();
      let val = e.target.value;
      if (inputRef && !val) {
        val = inputRef.getInputElement().value;
      }
      this.$emit('search', val);
      this.focus();
    },
    onPressenter(e) {
      this.onSearch(e);
      this.$emit('pressenter', e);
    },
    renderSearchBtn() {
      const {
        prefixCls, enterButton, size, disabled, onSearch
      } = this;

      if (!enterButton) {
        return <Icon type="search" on-click={disabled ? () => {} : onSearch} />;
      }

      return (
        <Button
          type="primary"
          class={`${prefixCls}-button`}
          disabled={disabled}
          size={size}
          on-click={onSearch}
        >
          {enterButton === true ? <Icon type="search" /> : enterButton}
        </Button>
      );
    },
  },
  render() {
    const {
      $slots,
      prefixCls,
      enterButton,
      size,
      bindProps,
      bindListeners,
      renderSearchBtn,
    } = this;
    const inputCls = {
      [prefixCls]: true,
      [`${prefixCls}-enter-button`]: !!enterButton,
      [`${prefixCls}-${size}`]: size === 'small' || size === 'large',
    };
    return (
      <Input ref="inputRef" {...{ class: inputCls, attrs: bindProps, on: bindListeners }}>
        <template slot="prefix">{$slots.prefix}</template>
        <template slot="suffix">{renderSearchBtn()}</template>
        <template slot="addonBefore">{$slots.addonBefore}</template>
        <template slot="addonAfter">{$slots.addonAfter}</template>
      </Input>
    );
  },
};
