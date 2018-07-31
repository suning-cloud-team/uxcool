import { updatePortalElement } from '@suning/v-utils';
import { buildComponentName } from '../utils';
import { calcMultipleSearchInputWidth } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: buildComponentName('TreeSelectSearchInput'),
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
        this.activeInput();
      }
    },
    rootSearchInputValue(nVal, oVal) {
      const { align, $refs: { inputMirror } } = this;
      if (align && inputMirror && nVal !== oVal) {
        this.$nextTick(() => {
          this.inputStyle = calcMultipleSearchInputWidth(nVal, inputMirror);
        });
      }
    },
  },
  mounted() {
    const { rootIsMultiple } = this;
    if (!rootIsMultiple) {
      // 防止元素渲染位置不对,导致滚动条滚动
      setTimeout(() => {
        this.activeInput();
      }, 0);
    }
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
    activeInput() {
      const { rootTriggerRef, rootIsMultiple } = this;
      if (!rootIsMultiple) {
        if (rootTriggerRef) {
          updatePortalElement(rootTriggerRef.getPortalPopupElement(), () => {
            this.focus();
          });
        }
      } else {
        this.focus();
      }
    },
    onInput(e) {
      const { value } = e.target;
      this.onSearchInput(e, value);
    },
    onPlaceholderClick() {
      this.focus();
    },
    renderPlaceholder() {
      const {
        prefixCls,
        rootSearchPlaceholder,
        rootIsMultiple,
        rootSearchInputValue,
        onPlaceholderClick,
      } = this;
      return rootSearchPlaceholder && !rootIsMultiple && !rootSearchInputValue ? (
        <span class={`${prefixCls}-search__field__placeholder`} on-click={onPlaceholderClick}>
          {rootSearchPlaceholder}
        </span>
      ) : null;
    },
  },
  render() {
    const {
      prefixCls, inputStyle, renderPlaceholder, rootSearchInputValue, onInput
    } = this;
    const attrs = {
      type: 'text',
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
            class: `${prefixCls}-search__field`,
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
        {renderPlaceholder()}
      </span>
    );
  },
};
