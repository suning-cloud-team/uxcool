import { isArray } from '@cloud-sn/v-utils';
import Selector from '../selector';
import SearchInput from '../searchInput';

export default {
  methods: {
    renderSingleTrigger() {
      const { prefixCls, getSelectionValue, placeholder } = this;
      let triggerNode = null;
      const selectionValue = getSelectionValue();
      if (isArray(selectionValue) && selectionValue.length > 0) {
        const { label, value } = selectionValue[0];
        triggerNode = <span class={`${prefixCls}-selection-selected-value`}>{label || value}</span>;
      } else {
        triggerNode = <span class={`${prefixCls}-selection__placeholder`}>{placeholder}</span>;
      }
      return (
        <Selector slot="trigger" show-arrow selections={selectionValue}>
          <div class={`${prefixCls}-selection__rendered`}>{triggerNode}</div>
        </Selector>
      );
    },
    renderSinglePopup() {
      const { prefixCls, showSearch } = this;
      return showSearch ? (
        <div class={`${prefixCls}-dropdown-search`}>
          <SearchInput />
        </div>
      ) : null;
    },
  },
};
