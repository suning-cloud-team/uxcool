import { isFunction, isEqual } from '@cloud-sn/v-utils';
import {
  normalizeContent, getChildNodeKeys, isDisabledNode, getNodeParentKeys
} from '../utils';
import Selector from '../selector';
import SearchInput from '../searchInput';

export default {
  methods: {
    onRemove(e, node) {
      const {
        disabled,
        innerValue,
        setInnerValue,
        treeCheckable,
        treeCheckStrict,
        normalizeFieldNames: { value: fieldValue },
        clearDisabled,
        selectedNodes,
        setSelectionNodes,
      } = this;
      e.stopPropagation();

      if (disabled) {
        return;
      }

      let removeValObj = {};
      if (!isDisabledNode(node, treeCheckable) || clearDisabled) {
        removeValObj = {
          ...removeValObj,
          [node.value]: 1,
        };
      }

      // deselect children
      if (treeCheckable && !treeCheckStrict) {
        const parentKeys = treeCheckStrict
          ? []
          : getNodeParentKeys(node, fieldValue, treeCheckable, clearDisabled).reduce((r, k) => {
            const nr = r;
            nr[k] = 1;
            return nr;
          }, {});

        removeValObj = {
          ...removeValObj,
          ...parentKeys,
          ...getChildNodeKeys(node, fieldValue, treeCheckable, clearDisabled).reduce((r, v) => {
            const nr = r;
            nr[v] = 1;
            return nr;
          }, {}),
        };
      }

      const values = innerValue.filter((v) => !(v in removeValObj));
      const nodes = selectedNodes.filter((item) => values.indexOf(item.key) !== -1);
      setSelectionNodes(nodes);
      setInnerValue(values);
    },
    renderSelections() {
      const {
        prefixCls,
        prevSelectionValue,
        getSelectionValue,
        maxTagCount,
        maxTagPlaceholder,
        maxTagTextLength,
        labelInValue,
        clearDisabled,
        treeCheckable,
        onRemove,
        forceUpdateTriggerAlign,
        placeholder,
        searchInputValue,
      } = this;

      const selectionValue = getSelectionValue();
      this.prevSelectionValue = selectionValue;
      let selections = selectionValue;
      const maxCnt = Number(maxTagCount);
      if (maxCnt >= 0 && maxCnt < selectionValue.length) {
        selections = selections.slice(0, maxCnt);
      }

      const selectionNodes = selections.map((v) => {
        const isCanRemove = !isDisabledNode(v, treeCheckable) || clearDisabled;
        const choiceCls = {
          [`${prefixCls}-selection__choice`]: true,
          [`${prefixCls}-selection__choice__disabled`]: !isCanRemove,
        };
        return (
          <li class={choiceCls}>
            {isCanRemove ? (
              <span
                class={`${prefixCls}-selection__choice__remove`}
                on-click={($event) => onRemove($event, v)}
              />
            ) : null}
            <span class={`${prefixCls}-selection__choice__content`}>
              {normalizeContent(maxTagTextLength, v.label || v.value)}
            </span>
          </li>
        );
      });

      if (maxCnt >= 0 && maxCnt < selectionValue.length) {
        let tagTxt = `+ ${selectionValue.length - maxCnt} ...`;
        if (isFunction(maxTagPlaceholder)) {
          const extraSelections = selectionValue.slice(maxCnt);
          // eslint-disable-next-line
          tagTxt = maxTagPlaceholder(
            labelInValue ? extraSelections : extraSelections.map((v) => v.value)
          );
        } else if (typeof maxTagPlaceholder === 'string') {
          tagTxt = maxTagPlaceholder;
        }
        tagTxt = normalizeContent(maxTagTextLength, tagTxt);
        selectionNodes.push(
          <li class={`${prefixCls}-selection__choice`}>
            <span class={`${prefixCls}-selection__choice__content`}>{tagTxt}</span>
          </li>
        );
      }

      selectionNodes.push(
        <li class={`${prefixCls}-search ${prefixCls}-search--inline`}>
          <SearchInput align />
        </li>
      );
      if (!isEqual(prevSelectionValue, selectionValue)) {
        forceUpdateTriggerAlign();
      }

      const placeholderNode = selectionValue.length === 0 && !searchInputValue ? (
          <span class={`${prefixCls}-selection__placeholder`}>{placeholder}</span>
      ) : null;

      return (
        <Selector slot="trigger" selections={selectionValue}>
          <ul class={`${prefixCls}-selection__rendered`}>{selectionNodes}</ul>
          {placeholderNode}
        </Selector>
      );
    },
    renderMultipleTrigger() {
      const { renderSelections } = this;
      return renderSelections();
    },
  },
};
