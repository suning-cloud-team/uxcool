import { buildComponentName } from '../utils';
import { calcMultipleSearchInputWidth, includeSeparators } from './utils';
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
        rootIsMultiple &&
        rootTokenSeparators.length > 0 &&
        includeSeparators(value, rootTokenSeparators)
      ) {
        onTokenSeparator(value);
        return;
      }

      onSearchInput(e, value);
    },
  },
  render() {
    const {
      prefixCls, inputStyle, rootIsCombobox, rootSearchInputValue, onInput
    } = this;

    const attrs = {
      type: 'text',
      autocomplete: 'off',
    };
    const domProps = {
      value: rootSearchInputValue,
    };
    const on = {
      input: onInput,
    };

    return (
      <span class={`${prefixCls}-search__field__wrap`}>
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
        <span class={`${prefixCls}-search__field__mirror`} ref="inputMirror">
          {rootSearchInputValue}&nbsp;&nbsp;
        </span>
      </span>
    );
  },
};
