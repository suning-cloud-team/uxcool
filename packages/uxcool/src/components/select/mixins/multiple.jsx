import { isFunction, isEqual } from '@suning/v-utils';
import { normalizeContent } from '../utils';
import Selector from '../selector';
import SearchInput from '../searchInput';

export default {
  methods: {
    multipleSearchInputFocus() {
      const { $refs: { multipleSearchInputRef } } = this;
      if (multipleSearchInputRef) {
        multipleSearchInputRef.focus();
      }
    },
    stopEventPropagation(e) {
      e.stopPropagation();
    },
    onRemove(e, value) {
      const { removeSelected } = this;
      removeSelected(value);
    },
    renderSelections() {
      const {
        prefixCls,
        isMultipleOrTags,
        prevSelections,
        placeholderNode,
        getSelectionValue,
        maxTagCount,
        maxTagTextLength,
        maxTagPlaceholder,
        onRemove,
        stopEventPropagation,
        clearDisabled,
        choiceTranstion,
        forceUpdateTriggerAlign,
      } = this;
      const selectionValue = getSelectionValue();
      this.prevSelections = selectionValue;

      let selectionNodes = [];
      if (isMultipleOrTags) {
        const selectionSize = selectionValue.length;
        let selections = selectionValue;
        const maxCnt = Number(maxTagCount);
        if (maxCnt >= 0 && maxCnt < selectionSize) {
          selections = selections.slice(0, maxCnt);
        }

        selectionNodes = selections.map((v) => {
          const {
            title, value, selectionContent, disabled
          } = v;
          const isCanRemove = !disabled || clearDisabled;
          const choiceCls = {
            [`${prefixCls}-selection__choice`]: true,
            [`${prefixCls}-selection__choice__disabled`]: !isCanRemove,
          };
          return (
            <li
              key={value}
              class={choiceCls}
              on-click={stopEventPropagation}
              title={title || selectionContent}
            >
              {isCanRemove ? (
                <span
                  class={`${prefixCls}-selection__choice__remove`}
                  on-click={$event => onRemove($event, value)}
                />
              ) : null}
              <span class={`${prefixCls}-selection__choice__content`}>
                {normalizeContent(maxTagTextLength, selectionContent)}
              </span>
            </li>
          );
        });

        if (maxCnt >= 0 && maxCnt < selectionSize) {
          let tagTxt = `+ ${selectionSize - maxCnt} ...`;
          if (isFunction(maxTagPlaceholder)) {
            const extraSelections = selectionValue.slice(maxCnt);
            tagTxt = maxTagPlaceholder(extraSelections.map(v => v.originNode));
          } else if (typeof maxTagPlaceholder === 'string') {
            tagTxt = maxTagPlaceholder;
          }
          tagTxt = normalizeContent(maxTagTextLength, tagTxt);
          selectionNodes.push(<li
              key="maxTagPlaceholder"
              role="maxTagPlaceholder"
              class={`${prefixCls}-selection__choice ${prefixCls}-selection__choice__disabled`}
            >
              <span class={`${prefixCls}-selection__choice__content`}>{tagTxt}</span>
            </li>);
        }
      }

      selectionNodes.push(<li key="searchInput" class={`${prefixCls}-search ${prefixCls}-search--inline`}>
          <SearchInput ref="multipleSearchInputRef" align={isMultipleOrTags} />
        </li>);

      let listNode = null;
      if (isMultipleOrTags && choiceTranstion) {
        listNode = (
          <transition-group
            name={choiceTranstion}
            tag="ul"
            class={`${prefixCls}-selection__rendered`}
            on-enter={forceUpdateTriggerAlign}
            on-after-leave={forceUpdateTriggerAlign}
          >
            {selectionNodes}
          </transition-group>
        );
      } else {
        if (!isEqual(prevSelections, selectionValue)) {
          forceUpdateTriggerAlign();
        }
        listNode = <ul class={`${prefixCls}-selection__rendered`}>{selectionNodes}</ul>;
      }
      return (
        <Selector slot="trigger" selections={selectionValue}>
          {selectionValue.length === 0 ? placeholderNode : null}
          {listNode}
        </Selector>
      );
    },
    renderMultipleTrigger() {
      return this.renderSelections();
    },
  },
};
