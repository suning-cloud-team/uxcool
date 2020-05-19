import { isFunction } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import { calcMultipleSearchInputWidth, includeSeparators, genInputElement } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: buildComponentName('SelectSearchInput'),
  mixins: [SubMixin],
  props: {
    align: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputStyle: null,
    };
  },
  computed: {
    prefixCls() {
      return this.rootPrefixCls;
    },
  },
  watch: {
    rootInnerVisible(nVal) {
      if (nVal) {
        this.focus();
      }
    },
    rootSearchInputValue(nVal, oVal) {
      const { $refs: { inputMirror }, align } = this;
      if (align && inputMirror && nVal !== oVal) {
        this.$nextTick(() => {
          this.inputStyle = calcMultipleSearchInputWidth(nVal, inputMirror);
        });
      }
    },
  },
  methods: {
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
    onInput(e) {
      const {
        rootIsMultiple, rootTokenSeparators, onTokenSeparator, onSearchInput
      } = this;
      const { value } = e.target;
      if (
        rootIsMultiple
        && rootTokenSeparators.length > 0
        && includeSeparators(value, rootTokenSeparators)
      ) {
        onTokenSeparator(value);
        return;
      }

      onSearchInput(e, value);
    },
  },
  render() {
    const {
      prefixCls,
      inputStyle,
      rootSize,
      rootDisabled,
      rootIsCombobox,
      rootSearchInputValue,
      rootGetInputElement,
      onInput,
    } = this;

    const attrs = {
      type: 'text',
      autocomplete: 'off',
      disabled: rootDisabled,
    };
    const domProps = {
      value: rootSearchInputValue,
    };
    const on = {
      input: onInput,
    };
    let inputNode = (
      <input
        {...{
          class: {
            'ux-input': rootIsCombobox,
            [`${prefixCls}-search__field`]: true,
          },
          style: inputStyle,
          attrs,
          domProps,
          on,
          ref: 'inputRef',
        }}
      />
    );
    if (rootIsCombobox && isFunction(rootGetInputElement)) {
      const input = rootGetInputElement();
      if (input) {
        inputNode = genInputElement(input, {
          class: `${prefixCls}-search__field`,
          props: { value: rootSearchInputValue, disabled: rootDisabled, size: rootSize },
          on: { input: onInput },
          ref: 'inputRef',
        });
        // 强行将 inputRef 元素加入内部的$refs中,目的是在focus/blur时可以使用, 造成的后果是外部设置的ref无效,
        // 如果不这么做, 会在使用allow-clear时出现第一次输入字符时丢失焦点的问题
        // ********************
        // **上面分析的原因是不对的**,导致allow-clear出现第一次输入字符时丢失焦点
        // 原因主要是placeholder元素在input元素之前,
        // 导致输入字符时,placeholder元素消失,而allow-clear元素在底部出现, 进而导致整个selector重新渲染,失去焦点
        // hw 2018.12.11
        // ********************
        // inputNode.context = this;
      }
    }
    return (
      <span class={`${prefixCls}-search__field__wrap`}>
        {inputNode}
        <span class={`${prefixCls}-search__field__mirror`} ref="inputMirror">
          {rootSearchInputValue}&nbsp;&nbsp;
        </span>
      </span>
    );
  },
};
