import { isArray } from '@suning/v-utils';
import Selector from '../selector';
import SearchInput from '../searchInput';

export default {
  computed: {
    singleSelectedStyle() {
      const { showSearch, searchInputValue, innerVisible } = this;
      let showSelectedValue = true;
      let opacity = 1;
      if (showSearch && innerVisible) {
        if (!searchInputValue) {
          opacity = 0.4;
        } else {
          showSelectedValue = false;
        }
      }
      return {
        display: showSelectedValue ? 'block' : 'none',
        opacity,
      };
    },
  },
  methods: {
    singleSearchInputFocus() {
      const { $refs: { singleSearchInputRef } } = this;
      if (singleSearchInputRef) {
        singleSearchInputRef.focus();
      }
    },
    renderSingleTrigger() {
      const {
        prefixCls,
        showSearch,
        getSelectionValue,
        placeholderNode,
        innerVisible,
        singleSelectedStyle,
      } = this;
      const selectionValue = getSelectionValue();
      let triggerNode = null;
      if (isArray(selectionValue) && selectionValue.length > 0) {
        const { title, selectionContent } = selectionValue[0];
        triggerNode = (
          <span
            title={title || selectionContent}
            class={`${prefixCls}-selection-selected-value`}
            style={singleSelectedStyle}
          >
            {selectionContent}
          </span>
        );
      } else {
        triggerNode = placeholderNode;
      }
      return (
        <Selector slot="trigger" show-arrow selections={selectionValue}>
          <div class={`${prefixCls}-selection__rendered`}>
            {triggerNode}
            {showSearch ? (
              <div v-show={innerVisible} class={`${prefixCls}-search ${prefixCls}-search--inline`}>
                <SearchInput ref="singleSearchInputRef" />
              </div>
            ) : null}
          </div>
        </Selector>
      );
    },
  },
};
