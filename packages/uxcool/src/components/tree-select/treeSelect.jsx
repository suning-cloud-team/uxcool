import Trigger from '@cloud-sn/v-trigger';
import { isArray, isEqual } from '@cloud-sn/v-utils';
import Tree from '../tree';
import { buildComponentName } from '../utils';
import {
  DEFAULT_FIELD_NAMES, checkNodeForShowParent, isDisabledNode, isValidValue
} from './utils';
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
  mixins: [SingleMixin, MultipleMixin, SearchMixin],
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
      default: -1,
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
      validator(val) {
        return ['large', 'default', 'small', ''].indexOf(val) > -1;
      },
    },
  },
  data() {
    return {
      innerVisible: false,
      innerValue: [],
      searchInputValue: '',
      triggerRef: null,
      isMounted: false,
      selectedNodes: [],
      // 多增加一个treeValue变量,防止innerValue将最初的值直接渲染到页面上, 等值确定后再更新innerValue
      treeValue: [],
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
      this.setTreeValue(nVal);
    },
    visible(nVal) {
      this.setInnerVisible(nVal, false);
    },
  },
  created() {
    const {
      value, visible, setInnerVisible, setTreeValue
    } = this;
    setTreeValue(value);
    setInnerVisible(visible, false);
    this.prevSelectionValue = null;
  },
  mounted() {
    const {
      $refs: { triggerRef },
    } = this;
    if (triggerRef) {
      this.triggerRef = triggerRef;
    }
    this.isMounted = true;
  },
  methods: {
    getValidValue(value) {
      const { isMultiple } = this;
      let val = isValidValue(value) ? value : [];
      val = isArray(val) ? val : [val];
      if (!isMultiple) {
        val = isValidValue(val[0]) ? [val[0]] : [];
      }
      return val;
    },
    setTreeValue(value) {
      this.treeValue = this.getValidValue(value);
    },
    setInnerValue(value, trigger = true) {
      const { getValidValue, innerValue, selectedNodes } = this;
      const val = getValidValue(value);
      if (!isEqual(val, innerValue)) {
        this.innerValue = val;
        this.treeValue = val;
        if (trigger) {
          const nVal = [...val];
          const nodes = selectedNodes.map((node) => ({ ...node.originNode }));
          this.$emit('input', nVal, nodes);
          this.$emit('change', nVal, nodes);
        }
      }
    },
    setInnerVisible(visible, trigger = true) {
      this.innerVisible = visible;
      if (trigger) {
        this.$emit('popup-visible-change', visible);
      }
    },
    setSelectionNodes(nodes) {
      this.selectedNodes = nodes;
    },
    forceUpdateTriggerAlign() {
      const {
        $refs: { triggerRef },
        innerVisible,
      } = this;
      if (triggerRef && innerVisible) {
        this.$nextTick(() => {
          triggerRef.forcePopupAlign();
        });
      }
    },
    getSelectionValue() {
      const { formatSelectionValue, selectedNodes } = this;
      return formatSelectionValue(selectedNodes);
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
        .filter((k) => !(k in nodeKeyObj))
        .map((k) => ({ label: '', value: k }));

      if (treeCheckable && !treeCheckStrict) {
        if (showCheckedStrategy === 'SHOW_PARENT') {
          // TODO: 当直接上级是disabled,且上级是选中的,但上上级未被选中, 这种情况是否汇总, 现在是没有汇总在父级中的
          // eslint-disable-next-line
          nNodes = nNodes.filter((node) => checkNodeForShowParent(node, nodeKeyObj, fieldValue));
        } else if (showCheckedStrategy === 'SHOW_CHILD') {
          nNodes = nNodes.filter((node) => !node[fieldChildren]);
        }
      }
      return [
        ...missNodes,
        ...nNodes.map((node) => ({
          ...node,
          label: node[fieldLabel],
          value: node[fieldValue],
          children: node[fieldChildren],
        })),
      ].sort((a, b) => a.pos - b.pos);
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
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
      // 关闭弹窗时清空搜索输入
      const { searchInputValue, setSearchInputValue } = this;
      if (!visible && searchInputValue) {
        setSearchInputValue('', false, false);
      }
    },
    onTreeValueChange(keys, nodes, checkAutoClear, isTriggerInputEvent = true) {
      const { setInnerValue, setSelectionNodes, clearSearchInputValue } = this;

      setSelectionNodes(nodes);
      setInnerValue(keys, isTriggerInputEvent);
      clearSearchInputValue(checkAutoClear);
    },
    onClear(e) {
      e.stopPropagation();
      const {
        treeCheckable,
        isMultiple,
        clearDisabled,
        selectedNodes,
        normalizeFieldNames: { value: filedValue },
        onTreeValueChange,
      } = this;

      let keys = [];
      let disabledNodes = [];
      if (isMultiple && !clearDisabled) {
        disabledNodes = selectedNodes.filter((node) => isDisabledNode(node, treeCheckable));
        keys = disabledNodes.map((node) => node[filedValue]);
      }

      onTreeValueChange(keys, disabledNodes, false);
    },

    onTreeCheck(checkedKeys, { checkedNodes }) {
      const { onTreeValueChange } = this;
      onTreeValueChange(checkedKeys, checkedNodes);
    },
    onTreeSelect(selectedKeys, { selectedNodes }) {
      const {
        treeCheckable, isMultiple, setTreeValue, setInnerVisible, onTreeValueChange
      } = this;

      if (treeCheckable) {
        return;
      }

      if (!isMultiple) {
        setInnerVisible(false);
      }
      setTreeValue(selectedKeys);
      onTreeValueChange(selectedKeys, selectedNodes);
    },
    onTreeKeysChange(keys, { nodes, replace }) {
      const { treeValue, onTreeValueChange } = this;
      // 单个选择时不触发,只触发onTreeCheck
      if (replace) {
        onTreeValueChange(keys, nodes, false, !isEqual(treeValue, keys));
      }
    },
    getTreeRef() {
      return this.$refs.treeRef;
    },
    renderTrigger() {
      const { isMultiple, renderSingleTrigger, renderMultipleTrigger } = this;
      return isMultiple ? renderMultipleTrigger() : renderSingleTrigger();
    },
    renderTree() {
      const {
        prefixCls,
        treeValue,
        treeData,
        treeFieldNames,
        treeCheckable,
        treeCheckStrict,
        treeLine,
        treeDefaultExpandAll,
        treeExpandedKeys,
        lazy,
        loadData,
        multiple,
        renderContent,
        filterOption,
        onTreeCheck,
        onTreeSelect,
        onTreeKeysChange,
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
        loadData,
        renderContent,
        filterOption,
        selectable: !treeCheckable,
        multiple,
        [treeCheckable ? 'checkedKeys' : 'selectedKeys']: [...treeValue],
      };

      const on = {
        check: onTreeCheck,
        select: onTreeSelect,
        [treeCheckable ? 'checked-keys-change' : 'selected-keys-change']: onTreeKeysChange,
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

    if (!this.isMounted) {
      return null;
    }
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
      // initPopupFirst: lazy && isFunction(loadData),
      initPopupFirst: true,
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
