import { isArray, isEqual, isVueComponent, cloneVNode, extractVNodeData } from '@suning/v-utils';
import Trigger from '@suning/v-trigger';
import Input from '../input';
import Icon from '../icon';
import Menu from './menu';
import { buildComponentName } from '../utils';
import { DEFAULT_FIELD_NAMES } from './utils';
import placements from './placements';
import StoreMixin from './mixins/store';
import AsyncMixin from './mixins/async';

const { label: DefaultLabel, value: DefaultValue, children: DefaultChildren } = DEFAULT_FIELD_NAMES;

export default {
  name: buildComponentName('Cascader'),
  mixins: [StoreMixin, AsyncMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ux-cascader',
    },
    inputPrefixCls: {
      type: String,
      default: 'ux-input',
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    loadData: {
      type: Function,
      default: null,
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    popupClass: {
      type: [String, Object, Array],
      default: '',
    },
    popupStyle: {
      type: Object,
      default: null,
    },
    popupPlacement: {
      type: String,
      default: 'bottomLeft',
    },
    popupVisible: {
      type: Boolean,
      default: false,
    },
    getPopupContainer: {
      type: Function,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['large', '', 'small'].indexOf(val) > -1;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    notFoundContent: {
      type: String,
      default: 'Not Found',
    },
    expandTrigger: {
      type: String,
      default: 'click',
      validator(val) {
        return ['hover', 'click'].indexOf(val) > -1;
      },
    },
    changeOnSelect: {
      type: Boolean,
      default: false,
    },
    fieldNames: {
      type: Object,
      default() {
        return DEFAULT_FIELD_NAMES;
      },
    },
    transitionName: {
      type: String,
      default: 'slide-up',
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    displayRender: {
      type: Function,
      default(labels) {
        return labels.join(' / ');
      },
    },
    renderLabel: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      innerValue: [],
      selectedValue: [],
      loadingSelectedValue: [],
      // 第一层级 节点
      rootNode: [],
      innerVisible: false,
      searchValue: '',
      inputFocus: false,
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
    activeNodes() {
      const { selectedValue, getNodesByValues } = this;
      return getNodesByValues(selectedValue);
    },
    showNodes() {
      const { rootNode, activeNodes } = this;
      const nodes = activeNodes.reduce(
        (r, node) => {
          // 每一层级获取下一级 节点列表
          const children = node[DefaultChildren];
          if (children) {
            r.push(children);
          }
          return r;
        },
        [rootNode]
      );
      return nodes;
    },
    triggerClasses() {
      const {
        prefixCls, disabled, inputFocus, searchValue, showSearch, size
      } = this;
      return {
        [`${prefixCls}-picker`]: true,
        [`${prefixCls}-picker-disabled`]: disabled,
        [`${prefixCls}-picker-focused`]: inputFocus,
        [`${prefixCls}-picker-with-value`]: !!searchValue,
        [`${prefixCls}-picker-show-search`]: showSearch,
        [`${prefixCls}-picker-${size === 'large' ? 'lg' : 'sm'}`]:
          size === 'large' || size === 'small',
      };
    },
    displayLabel() {
      const { innerValue, getNodesByValues, displayRender } = this;
      const nodes = getNodesByValues(innerValue);
      return displayRender(
        nodes.map(node => node[DefaultLabel]),
        nodes.map(node => ({ ...node.originNode }))
      );
    },
  },
  watch: {
    dataSource(nVal) {
      if (!isArray(nVal)) return;
      const { clearNodesMap, createNodes } = this;
      clearNodesMap();
      this.rootNode = createNodes(nVal, null, 0);
    },
    value(nVal, oVal) {
      if (!isEqual(nVal, oVal)) {
        this.setInnerValue(nVal, false);
      }
    },
    popupVisible(nVal, oVal) {
      if (nVal !== oVal) {
        this.setInnerVisible(nVal, false);
      }
    },
  },
  created() {
    const {
      value, setInnerValue, setInnerVisible, popupVisible, loadRootNodes
    } = this;
    loadRootNodes().then(() => {
      setInnerValue(value, false);
      setInnerVisible(popupVisible, false);
    });
  },
  methods: {
    focus() {
      const { $refs: { triggerRef } } = this;
      if (triggerRef) {
        triggerRef.focus();
      }
    },
    blur() {
      const { $refs: { triggerRef } } = this;
      if (triggerRef) {
        triggerRef.blur();
      }
    },
    loadRootNodes() {
      const {
        dataSource, createNodes, canAsync, asyncNode
      } = this;
      return new Promise((resolve) => {
        if (isArray(dataSource) && dataSource.length > 0) {
          this.rootNode = createNodes(dataSource, null, 0);
          resolve();
        } else if (canAsync()) {
          asyncNode().then((nodes) => {
            this.rootNode = nodes || [];
            resolve();
          });
        } else {
          resolve();
        }
      });
    },
    getNodesByValues(value = []) {
      const { getNode } = this;
      const nodes = !isArray(value)
        ? []
        : value.map((k, i) => getNode(k, i)).filter(node => !!node);
      return nodes;
    },

    setInnerValue(value = [], trigger = true, syncSelectedValue = true) {
      const { getNodesByValues } = this;
      if (syncSelectedValue) {
        this.selectedValue = value;
      }
      this.innerValue = value;
      // 初始化时不触发
      if (trigger) {
        const nodes = getNodesByValues(value).map(node => ({ ...node.originNode }));
        const out = [...value];
        this.$emit('input', out, nodes);
        this.$emit('change', out, nodes);
      }
    },
    setInnerVisible(visible, trigger = true) {
      const { innerValue, setInnerValue, innerVisible } = this;
      if (innerVisible !== visible) {
        this.innerVisible = visible;
        if (visible) {
          setInnerValue(innerValue, false);
          this.inputFocus = true;
        } else {
          this.inputFocus = false;
          this.searchValue = '';
        }

        // 初始化时不触发
        if (trigger) {
          this.$emit('popup-visible-change', visible);
        }
      }
    },
    getActiveValue(node, async = false) {
      const { selectedValue } = this;
      const nodeValue = node[DefaultValue];
      let activeValue;
      if (async && nodeValue === selectedValue[node.level]) {
        activeValue = selectedValue;
      } else {
        // 选中层级之后的原有的层级数据都无效
        activeValue = selectedValue.slice(0, node.level);
        activeValue.push(node[DefaultValue]);
      }
      return activeValue;
    },
    syncValueAndVisible(e, node, value, syncSelectedValue = true) {
      const {
        expandTrigger, changeOnSelect, setInnerValue, setInnerVisible
      } = this;
      const isHoverTriggerClick = expandTrigger === 'hover' && e.type === 'click';
      const isCanChangeOnSelect =
        changeOnSelect && (expandTrigger === 'click' || isHoverTriggerClick);
      if (!node.isParent || isCanChangeOnSelect) {
        setInnerValue(value, true, syncSelectedValue);
        if (!node.isParent || (changeOnSelect && isHoverTriggerClick)) {
          setInnerVisible(false);
        }
      }
    },
    updateSelectedValue(e, node) {
      const { getActiveValue, syncValueAndVisible } = this;
      // 选中层级之后的原有的层级数据都无效
      const activeValue = getActiveValue(node);
      this.selectedValue = activeValue;

      syncValueAndVisible(e, node, activeValue, true);
    },
    onMenuItemSelect(e, node) {
      const {
        $refs: { triggerRef },
        canAsync,
        getActiveValue,
        asyncNode,
        setInnerValue,
        updateSelectedValue,
        syncValueAndVisible,
      } = this;
      // 重设焦点
      if (triggerRef) {
        triggerRef.focus();
      }

      if (canAsync(node)) {
        const activeValue = getActiveValue(node, true);
        this.loadingSelectedValue = activeValue;
        // 在数据加载完之前,只显示当前层级节点
        const currentSelectedValue = activeValue.slice(0, activeValue.length - 1);
        this.selectedValue = currentSelectedValue;
        syncValueAndVisible(e, node, activeValue, false);
        asyncNode(node).then(() => {
          // 如果用户在加载完成前已选择其他选项, 此时 应保持用户选中
          if (isEqual(currentSelectedValue, this.selectedValue)) {
            // 强行触发 displayLabel 重新获取值
            setInnerValue([...activeValue], false);
          }
          this.loadingSelectedValue = [];
        });
      } else {
        this.loadingSelectedValue = [];
        updateSelectedValue(e, node);
      }
    },
    onClear(e) {
      const { searchValue, setInnerValue, setInnerVisible } = this;
      e.stopPropagation();
      e.preventDefault();
      if (searchValue) {
        this.searchValue = '';
      } else {
        setInnerValue([]);
        setInnerVisible(false);
      }
    },
    onSearchInputClick(e) {
      const { inputFocus, innerVisible } = this;
      if (inputFocus || innerVisible) {
        e.stopPropagation();
      }
    },
    onSearchInputBlur() {
      this.inputFocus = false;
    },
    onSearchInput(val) {
      this.searchValue = val;
    },
    getSlotDefaultTriggerNode() {
      const { $slots: { default: slotDefault }, disabled } = this;
      const triggerNode = null;
      if (!slotDefault || !slotDefault[0]) {
        return triggerNode;
      }

      const slotNode = slotDefault[0];
      const slotNodeData = extractVNodeData(slotNode, isVueComponent(slotNode));
      return (
        <template slot="trigger">
          {cloneVNode(slotNode, {
            attrs: {
              ...slotNodeData.attrs,
              tabindex: disabled ? undefined : 0,
            },
          })}
        </template>
      );
    },
    renderTrigger() {
      const {
        prefixCls,
        inputPrefixCls,
        disabled,
        placeholder,
        showSearch,
        innerVisible,
        triggerClasses,
        displayLabel,
        allowClear,
        innerValue,
        onClear,
        searchValue,
        getSlotDefaultTriggerNode,
        onSearchInput,
        onSearchInputClick,
        onSearchInputBlur,
      } = this;

      let triggerNode = getSlotDefaultTriggerNode();
      if (!triggerNode) {
        const arrowCls = {
          [`${prefixCls}-picker-arrow`]: true,
          [`${prefixCls}-picker-arrow-expand`]: innerVisible,
        };

        const inputProps = {
          prefixCls: inputPrefixCls,
          disabled,
          value: searchValue,
        };
        const inputAttrs = {
          placeholder: innerValue.length > 0 ? '' : placeholder,
          readonly: !showSearch,
        };
        const inputOn = {
          input: onSearchInput,
        };

        if (showSearch) {
          inputOn.click = onSearchInputClick;
          inputOn.blur = onSearchInputBlur;
        }

        const clearElement =
          (allowClear && !disabled && innerValue.length > 0) || (!disabled && !!searchValue) ? (
            <Icon
              key="clear"
              type="close_circle"
              class={`${prefixCls}-picker-clear`}
              on-click={onClear}
            />
        ) : null;

        triggerNode = (
          <span
            slot="trigger"
            ref="triggerRef"
            tabIndex={disabled ? undefined : 0}
            class={triggerClasses}
          >
            <span class={`${prefixCls}-picker-label`}>{displayLabel}</span>
            <Input
              {...{
                class: [`${prefixCls}-input`],
                props: inputProps,
                attrs: inputAttrs,
                on: inputOn,
              }}
            />
            {clearElement}
            <Icon key="down" type="down" class={arrowCls} />
          </span>
        );
      }

      return triggerNode;
    },
    renderPopup() {
      const {
        $scopedSlots,
        prefixCls,
        showNodes,
        selectedValue,
        loadingSelectedValue,
        expandTrigger,
        popupVisible,
        renderLabel,
        onMenuItemSelect,
      } = this;
      const renderLabelFn = $scopedSlots.renderLabel || renderLabel;
      return (
        <div slot="popup">
          {showNodes.map((nodes, i) => {
            const menuProps = {
              prefixCls: `${prefixCls}-menu`,
              nodes,
              activeValue: loadingSelectedValue[i] || selectedValue[i],
              level: i,
              expandTrigger,
              visible: popupVisible,
              renderLabel: renderLabelFn,
            };
            const on = {
              select: onMenuItemSelect,
            };
            return <Menu {...{ props: menuProps, on }} />;
          })}
        </div>
      );
    },
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
  },
  render() {
    const {
      prefixCls,
      disabled,
      innerVisible,
      builtinPlacements,
      popupPlacement,
      transitionName,
      popupClass,
      popupStyle,
      getPopupContainer,
      onPopupVisibleChange,
      renderTrigger,
      renderPopup,
    } = this;
    const triggerProps = {
      prefixCls: `${prefixCls}-menus`,
      visible: innerVisible,
      actions: disabled ? [] : ['click'],
      builtinPlacements,
      popupPlacement,
      popupTransitionName: transitionName,
      popupClass,
      popupStyle,
      getPopupContainer,
    };
    const on = {
      'popup-visible-change': onPopupVisibleChange,
    };
    return (
      <Trigger {...{ props: triggerProps, on }}>
        {renderTrigger()}
        {renderPopup()}
      </Trigger>
    );
  },
};
