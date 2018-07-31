import Trigger from '@suning/v-trigger';
import { isArray, isFunction, isEqual, isDef } from '@suning/v-utils';
import Tree from '../tree';
import { buildComponentName } from '../utils';
import {
  DEFAULT_FIELD_NAMES,
  checkNodeForShowParent,
  getNodeOriginParent,
  isDisabledNode,
} from './utils';
import StoreMixin from './mixins/store';
import SingleMixin from './mixins/single';
import MultipleMixin from './mixins/multiple';
import SearchMixin from './mixins/search';
import placements from './placements';

export default {
  name: buildComponentName('TreeSelect'),
  provide() {
    return {
      treeSelectRoot: this,
    };
  },
  mixins: [SingleMixin, MultipleMixin, StoreMixin, SearchMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ux-select',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Array],
      default: '',
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    searchValue: {
      type: String,
      default: '',
    },
    searchPlaceholder: {
      type: String,
      default: 'search',
    },
    autoClearSearchValue: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelInValue: {
      type: Boolean,
      default: false,
    },
    maxTagCount: {
      type: [Number, String],
      default: null,
    },
    maxTagPlaceholder: {
      type: [String, Function],
      default: null,
    },
    maxTagTextLength: {
      type: [Number, String],
      default: null,
    },
    showCheckedStrategy: {
      type: String,
      default: 'SHOW_CHILD',
      validator(val) {
        return ['SHOW_ALL', 'SHOW_PARENT', 'SHOW_CHILD'].indexOf(val) > -1;
      },
    },
    dropdownMatchSelectWidth: {
      type: Boolean,
      default: false,
    },
    treeData: {
      type: Array,
      default() {
        return [];
      },
    },
    treeFieldNames: {
      type: Object,
      default() {
        return DEFAULT_FIELD_NAMES;
      },
    },
    treeCheckable: {
      type: Boolean,
      default: false,
    },
    treeCheckStrict: {
      type: Boolean,
      default: false,
    },
    treeLine: {
      type: Boolean,
      default: false,
    },
    treeDefaultExpandAll: {
      type: Boolean,
      default: false,
    },
    treeExpandedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    loadData: {
      type: Function,
      default: undefined,
    },
    renderContent: {
      type: Function,
      default: null,
    },
    filterOption: {
      type: Function,
      default: null,
    },
    notFoundContent: {
      type: String,
      default: 'Not Found',
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Please select',
    },
    popupClass: {
      type: [String, Object, Array],
      default: '',
    },
    popupStyle: {
      type: Object,
      default: null,
    },
    transition: {
      type: String,
      default: 'slide-up',
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    clearDisabled: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: '',
      validator(val){
        return ['', 'large','default', 'small'].indexOf(val)>-1;
      }
    }
  },
  data() {
    return {
      innerVisible: false,
      innerValue: null,
      searchInputValue: '',
      selectionValue: [],
      triggerRef: null,
    };
  },
  computed: {
    normalizeFieldNames() {
      const { fieldNames } = this;
      return {
        ...DEFAULT_FIELD_NAMES,
        ...fieldNames,
      };
    },
    isMultiple() {
      const { multiple, treeCheckable } = this;
      return multiple || treeCheckable;
    },
    popupClasses() {
      const { prefixCls, isMultiple } = this;
      return {
        [`${prefixCls}-tree-dropdown`]: true,
        [`${prefixCls}-dropdown--single`]: !isMultiple,
        [`${prefixCls}-dropdown--multiple`]: isMultiple,
      };
    },
  },
  watch: {
    value(nVal) {
      this.setInnerValue(nVal, false);
    },
    visible(nVal) {
      this.setInnerVisible(nVal, false);
    },
  },
  created() {
    const {
      value,
      visible,
      setInnerValue,
      setInnerVisible,
      treeData,
      createNodes,
      updateSelectionValue,
    } = this;
    setInnerValue(value, false);
    setInnerVisible(visible, false);
    createNodes(treeData, null, 0);
    updateSelectionValue();
    this.prevSelectionValue = null;
  },
  mounted() {
    const { $refs: { triggerRef } } = this;
    if (triggerRef) {
      this.triggerRef = triggerRef;
    }
  },
  methods: {
    setInnerValue(value, trigger = true) {
      const { isMultiple } = this;
      let val = isDef(value) ? value : [];
      val = isArray(val) ? val : [val];
      if (!isMultiple) {
        val = isDef(val[0]) ? [val[0]] : [];
      }
      this.innerValue = val;
      if (trigger) {
        const nVal = [...val];
        this.$emit('input', nVal);
        this.$emit('change', nVal);
      }
    },
    setInnerVisible(visible, trigger = true) {
      this.innerVisible = visible;
      if (trigger) {
        this.$emit('popup-visible-change', visible);
      }
    },

    forceUpdateTriggerAlign() {
      const { $refs: { triggerRef } } = this;
      if (triggerRef) {
        triggerRef.forcePopupAlign();
      }
    },
    setSelectionValue(value) {
      const { selectionValue } = this;
      this.prevSelectionValue = selectionValue;
      this.selectionValue = value;
      if (!isEqual(selectionValue, value)) {
        this.forceUpdateTriggerAlign();
      }
    },
    formatSelectionValue(nodes = []) {
      const {
        treeCheckable,
        treeCheckStrict,
        showCheckedStrategy,
        innerValue,
        normalizeFieldNames: { value: fieldValue, children: fieldChildren, label: fieldLabel },
      } = this;
      let nNodes = nodes;

      const nodeKeyObj = nNodes.reduce((r, node) => {
        const nr = r;
        nr[node[fieldValue]] = 1;
        return nr;
      }, {});

      const missNodes = innerValue
        .filter(k => !(k in nodeKeyObj))
        .map(k => ({ label: '', value: k }));

      if (treeCheckable && !treeCheckStrict) {
        if (showCheckedStrategy === 'SHOW_PARENT') {
          // TODO: 当直接上级是disabled,且上级是选中的,但上上级未被选中, 这种情况是否汇总, 现在是没有汇总在父级中的
          // eslint-disable-next-line
          nNodes = nNodes.filter(node => checkNodeForShowParent(node, nodeKeyObj, fieldValue));
        } else if (showCheckedStrategy === 'SHOW_CHILD') {
          nNodes = nNodes.filter(node => !node[fieldChildren]);
        }
      }
      return [
        ...missNodes,
        ...nNodes.map(node => ({
          ...node,
          label: node[fieldLabel],
          value: node[fieldValue],
          children: node[fieldChildren],
        })),
      ].sort((a, b) => a.pos - b.pos);
    },
    updateSelectionValue() {
      const {
        treeCheckable,
        getAllCheckedNodes,
        getOriginNodes,
        innerValue,
        formatSelectionValue,
        setSelectionValue,
        normalizeFieldNames: { value: fieldValue },
        setInnerValue,
      } = this;
      let checkedNodes = [];
      if (treeCheckable) {
        checkedNodes = getAllCheckedNodes().map(node => ({
          ...node.originNode,
          pos: node.pos,
          parentNode: getNodeOriginParent(node),
        }));
        // 因为有上下级级联选择, 所以 checkedNodes中可能含有innerValue中不存在的值,此处需要更新
        const values = [...innerValue];
        checkedNodes.forEach((node) => {
          const value = node[fieldValue];
          if (values.indexOf(value) === -1) {
            values.push(value);
          }
        });
        setInnerValue(values);
      } else {
        checkedNodes = getOriginNodes(innerValue);
      }

      setSelectionValue(formatSelectionValue(checkedNodes));
    },
    getPopupWidth() {
      const {
        $el, getPopupWidth, dropdownMatchSelectWidth, innerVisible
      } = this;
      let style;
      if (innerVisible) {
        style = { [dropdownMatchSelectWidth ? 'width' : 'minWidth']: `${$el.offsetWidth}px` };
        getPopupWidth.prev = style;
      } else {
        style = getPopupWidth.prev;
      }
      return style;
    },
    wrapLoadData(parent) {
      const { loadData, addNodes, updateSelectionValue } = this;
      return isFunction(loadData)
        ? Promise.resolve(loadData(parent)).then((data) => {
          addNodes(data, parent);
          updateSelectionValue();
          return data;
        })
        : null;
    },
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
    onTreeValueChange(keys, nodes, checkAutoClear) {
      const {
        setInnerValue,
        setSelectionValue,
        resetNodesChecked,
        formatSelectionValue,
        clearSearchInputValue,
      } = this;

      setInnerValue(keys);
      clearSearchInputValue(checkAutoClear);
      resetNodesChecked(keys);
      setSelectionValue(formatSelectionValue(nodes));
    },
    onClear(e) {
      e.stopPropagation();
      const {
        treeCheckable,
        isMultiple,
        clearDisabled,
        getAllCheckedNodes,
        normalizeFieldNames: { value: filedValue },
        onTreeValueChange,
      } = this;

      let keys = [];
      let disabledNodes = [];
      if (isMultiple && !clearDisabled) {
        disabledNodes = getAllCheckedNodes()
          .map(node => ({
            ...node.originNode,
            pos: node.pos,
            parentNode: getNodeOriginParent(node),
          }))
          .filter(node => isDisabledNode(node, treeCheckable));
        keys = disabledNodes.map(node => node[filedValue]);
      }

      onTreeValueChange(keys, disabledNodes, false);
    },

    onTreeCheck(checkedKeys, { checkedNodes }) {
      const { onTreeValueChange } = this;
      onTreeValueChange(checkedKeys, checkedNodes);
    },
    onTreeSelect(selectedKeys, { selectedNodes }) {
      const { treeCheckable, isMultiple, onTreeValueChange } = this;

      if (treeCheckable) {
        return;
      }

      if (!isMultiple) {
        this.setInnerVisible(false);
      }

      onTreeValueChange(selectedKeys, selectedNodes);
    },
    renderTrigger() {
      const { isMultiple, renderSingleTrigger, renderMultipleTrigger } = this;
      return isMultiple ? renderMultipleTrigger() : renderSingleTrigger();
    },
    renderTree() {
      const {
        prefixCls,
        innerValue,
        treeData,
        treeFieldNames,
        treeCheckable,
        treeCheckStrict,
        treeLine,
        treeDefaultExpandAll,
        treeExpandedKeys,
        lazy,
        wrapLoadData,
        multiple,
        renderContent,
        filterOption,
        onTreeCheck,
        onTreeSelect,
      } = this;
      const props = {
        prefixCls: `${prefixCls}-tree`,
        dataSource: treeData,
        filedNames: treeFieldNames,
        checkable: treeCheckable,
        checkStrict: treeCheckStrict,
        showLine: treeLine,
        defaultExpandAll: treeDefaultExpandAll,
        expandedKeys: treeExpandedKeys,
        lazy,
        loadData: wrapLoadData,
        renderContent,
        filterOption,
        selectable: !treeCheckable,
        multiple,
        [treeCheckable ? 'checkedKeys' : 'selectedKeys']: innerValue,
      };

      const on = {
        check: onTreeCheck,
        select: onTreeSelect,
      };
      return (
        <Tree
          {...{
            props,
            on,
            ref: 'treeRef',
          }}
        />
      );
    },
    renderPopup() {
      const {
        renderSinglePopup, renderTree, isMultiple, renderNotFound
      } = this;

      return (
        <div slot="popup">
          {isMultiple
            ? [renderTree(), renderNotFound()]
            : [renderSinglePopup(), renderTree(), renderNotFound()]}
        </div>
      );
    },
  },
  render() {
    const {
      prefixCls,
      disabled,
      innerVisible,
      lazy,
      loadData,
      popupClasses,
      popupClass,
      popupStyle,
      builtinPlacements,
      transition,
      getPopupContainer,
      getPopupWidth,
      onPopupVisibleChange,
      renderTrigger,
      renderPopup,
    } = this;
    const popupWidth = getPopupWidth();
    const triggerProps = {
      prefixCls: `${prefixCls}-dropdown`,
      visible: innerVisible,
      actions: disabled ? [] : ['click'],
      popupClass: [popupClasses, popupClass],
      popupStyle: {
        maxHeight: '400px',
        overflow: 'auto',
        ...popupWidth,
        ...popupStyle,
      },
      builtinPlacements,
      popupPlacement: 'bottomLeft',
      popupTransitionName: transition,
      getPopupContainer,
      initPopupFirst: lazy && isFunction(loadData),
    };
    const on = {
      'popup-visible-change': onPopupVisibleChange,
    };
    return (
      <Trigger {...{ props: triggerProps, on, ref: 'triggerRef' }}>
        {renderTrigger()}
        {renderPopup()}
      </Trigger>
    );
  },
};
