import { buildComponentName } from '../utils';
import { isDisabledNode } from './utils';
import SubMixin from './mixins/sub';

export default {
  name: buildComponentName('TreeSelector'),
  mixins: [SubMixin],
  props: {
    showArrow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    prefixCls() {
      return this.rootPrefixCls;
    },
    classes() {
      const {
        prefixCls, rootSize, rootInnerVisible, rootDisabled, allowClear
      } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-${rootSize === 'small' ? 'sm' : 'lg'}`]:
          rootSize === 'large' || rootSize === 'small',
        [`${prefixCls}-open`]: rootInnerVisible,
        [`${prefixCls}-disabled`]: rootDisabled,
        [`${prefixCls}-enable`]: !rootDisabled,
        [`${prefixCls}-allow-clear`]: allowClear,
      };
    },
    mode() {
      const { rootIsMultiple } = this;
      return rootIsMultiple ? 'multiple' : 'single';
    },
    arrowNode() {
      return this.renderArrow();
    },
    clearNode() {
      return this.renderClear();
    },
  },
  methods: {
    renderArrow() {
      const { prefixCls, showArrow } = this;

      return showArrow ? (
        <span key="arrow" class={`${prefixCls}-arrow`} style={{ outline: 'none' }}>
          <b />
        </span>
      ) : null;
    },
    renderClear() {
      const {
        prefixCls,
        rootAllowClear,
        rootSelectionValue,
        rootClearDisabled,
        rootTreeCheckable,
        rootIsMultiple,
        onSelectorClear,
      } = this;

      if (!rootAllowClear) {
        return null;
      }

      if (!rootClearDisabled) {
        // only multiple
        if (
          rootIsMultiple &&
          rootSelectionValue.every(node => isDisabledNode(node, rootTreeCheckable))
        ) {
          return null;
        }
      } else if (rootSelectionValue.length === 0) {
        return null;
      }

      return (
        <span key="clear" class={`${prefixCls}-selection__clear`} on-click={onSelectorClear} />
      );
    },
  },

  render() {
    const {
      $slots, prefixCls, classes, mode, arrowNode, clearNode
    } = this;
    const selectionCls = {
      [`${prefixCls}-selection`]: true,
      [`${prefixCls}-selection--${mode}`]: mode,
    };
    return (
      <span role="combobox" class={classes}>
        <span role="selection" class={selectionCls}>
          {$slots.default}
          {arrowNode}
          {clearNode}
        </span>
      </span>
    );
  },
};
