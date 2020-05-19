import {
  isArray,
  isEqual,
  isFunction,
  isVueComponent,
  cloneVNode,
  extractVNodeData,
} from '@cloud-sn/v-utils';
import Trigger from '@cloud-sn/v-trigger';
import Icon from '../icon';
import Menu from './menu';
import { buildComponentName } from '../utils';
import { DEFAULT_FIELD_NAMES, flatten, maybeAncestorOf } from './util';
import placements from './placements';
import StoreMixin from './mixins/store';
import AsyncMixin from './mixins/async';

export default {
  name: buildComponentName('MultiCascader'),
  mixins: [StoreMixin, AsyncMixin],
  props: {
    prefixCls: {
      type: String,
      default: 'ux-multi-cascader',
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    loadData: {
      type: Function,
      default: null,
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
      default: null,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['', 'default', 'small', 'large'].indexOf(val) > -1;
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
    expandTrigger: {
      type: String,
      default: 'click',
      validator(val) {
        return ['hover', 'click'].indexOf(val) > -1;
      },
    },
    checkStrict: {
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
    maxTagCount: {
      type: [Number, String],
      default: -1,
    },
    maxTagPlaceholder: {
      type: [Function, String],
      default: null,
    },
  },
  data() {
    return {
      innerValue: [],
      // 当前选中节点，主要用于控制展示下一级数据
      activeValue: [],
      // 当前点击的复选框节点，用于判断异步数据加载后要不要触发事件
      activeCheckValue: [],
      innerVisible: false,
      focused: false,
      // 第一层节点
      rootNodes: [],
    };
  },
  computed: {
    normalizedFieldNames() {
      const { fieldNames } = this;

      return {
        ...DEFAULT_FIELD_NAMES,
        ...fieldNames,
      };
    },
    labelField() {
      return this.normalizedFieldNames.label;
    },
    valueField() {
      return this.normalizedFieldNames.value;
    },
    childrenField() {
      return this.normalizedFieldNames.children;
    },
    isLazy() {
      return isFunction(this.loadData);
    },
    activeNodes() {
      const { activeValue, getAllNodesInPath } = this;
      return getAllNodesInPath(activeValue);
    },
    showNodes() {
      const { rootNodes, activeNodes, forceUpdateTriggerAlign } = this;

      const nodes = activeNodes.reduce(
        (r, node) => {
          // 每一层级获取下一级节点列表
          const { children } = node;
          if (isArray(children) && children.length > 0) {
            r.push(children);
          }
          return r;
        },
        [rootNodes]
      );
      forceUpdateTriggerAlign();

      return nodes;
    },
    validValue() {
      const { value } = this;
      return !isArray(value) ? [] : value.filter((val) => isArray(val) && val.length > 0);
    },
    flatNodes() {
      const { rootNodes } = this;
      return flatten(rootNodes);
    },
    checkedAsValueNodes() {
      const { flatNodes, checkStrict, isLazy } = this;
      // 异步加载模式需要把勾选状态的未加载过的父节点也作为值传出去
      return flatNodes.filter(({ isChecked, isParent, isLoaded }) => {
        const isPending = isLazy && !isLoaded;
        return isChecked && (checkStrict || !isParent || isPending);
      });
    },
    tags() {
      const { flatNodes, checkStrict } = this;
      return flatNodes.filter(({ isChecked, isParent }) => isChecked && (checkStrict || !isParent));
    },
    triggerClass() {
      const {
        prefixCls, disabled, focused, size
      } = this;

      return {
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-focused`]: focused,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'large' || size === 'small',
      };
    },
    arrowClass() {
      const { prefixCls, innerVisible } = this;

      return {
        [`${prefixCls}-arrow`]: true,
        [`${prefixCls}-arrow-expand`]: innerVisible,
      };
    },
  },
  watch: {
    dataSource(nVal) {
      if (!isArray(nVal)) {
        return;
      }
      const {
        clearNodesMap,
        createNodes,
        updateActiveValue,
        validValue,
        isLazy,
        setPendingValue,
        checkPendingValue,
      } = this;
      clearNodesMap();
      setPendingValue(validValue);
      this.rootNodes = createNodes(nVal, null, 0);

      if (isLazy) {
        checkPendingValue();
      }
      updateActiveValue();
    },
    value(nVal) {
      const { resetCheckedValue, innerValue, validValue } = this;
      if (!isEqual(nVal, innerValue)) {
        resetCheckedValue(validValue);
      }
    },
    popupVisible(nVal, oVal) {
      if (nVal !== oVal) {
        this.setInnerVisible(nVal, true);
      }
    },
  },
  created() {
    const {
      validValue,
      isLazy,
      popupVisible,
      loadRootNodes,
      setPendingValue,
      setInnerVisible,
      updateActiveValue,
      checkPendingValue,
    } = this;

    // 将所有有效值都视作待确认值
    setPendingValue(validValue);
    // 加载根节点数据
    loadRootNodes().then(() => {
      this.innerValue = validValue;
      if (isLazy) {
        // 初始数据可能直接从数据源获取，需要检查pendingValue有效性
        checkPendingValue();
      }
      updateActiveValue();
      setInnerVisible(popupVisible, true);
    });
  },
  methods: {
    loadRootNodes() {
      const {
        dataSource, createNodes, isLazy, asyncNode
      } = this;

      return new Promise((resolve) => {
        if (isArray(dataSource) && dataSource.length > 0) {
          this.rootNodes = createNodes(dataSource, null, 0);
          resolve();
        } else if (isLazy) {
          asyncNode().then((nodes) => {
            this.rootNodes = nodes || [];
            resolve();
          });
        } else {
          this.rootNodes = [];
          resolve();
        }
      });
    },
    getDisplayLabel(values) {
      const { displayRender, getAllNodesInPath } = this;
      const nodes = getAllNodesInPath(values);

      return displayRender(
        nodes.map((node) => node.label),
        nodes.map((node) => ({ ...node }))
      );
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
    focus() {
      const {
        $refs: { triggerNodeRef },
      } = this;
      if (triggerNodeRef) {
        triggerNodeRef.focus();
      }
    },
    blur() {
      const {
        $refs: { triggerNodeRef },
      } = this;
      if (triggerNodeRef) {
        triggerNodeRef.blur();
      }
    },
    getAllNodesInPath(valuePath) {
      const { getNode } = this;
      return !isArray(valuePath)
        ? []
        : valuePath
          .map((value, i) => {
            const path = valuePath.slice(0, i + 1);
            return getNode(path);
          })
          .filter((node) => !!node);
    },
    resetCheckedValue(validValue) {
      const {
        flatNodes,
        checkNodeRelation,
        getNode,
        isLazy,
        isUnMatchedValuePending,
        setPendingValue,
        getInnerValue,
      } = this;
      const unMatchedValue = [];

      // 先取消原来勾选的节点
      flatNodes.forEach((node) => {
        const nNode = node;
        const { disabled, isChecked } = nNode;

        if (isChecked) {
          nNode.isChecked = false;
          nNode.isIndeterminate = false;

          if (!disabled) {
            checkNodeRelation(nNode);
          }
        }
      });

      // 勾选上指定节点
      validValue.forEach((val) => {
        const node = getNode(val);

        if (!node) {
          unMatchedValue.push(val);
        } else {
          const { disabled } = node;

          node.isChecked = true;
          node.isIndeterminate = false;

          if (!disabled) {
            checkNodeRelation(node);
          }
        }
      });

      const pendingValue = !isLazy
        ? []
        : unMatchedValue.filter((val) => isUnMatchedValuePending(val));

      setPendingValue(pendingValue);
      this.innerValue = getInnerValue();
    },
    getInnerValue() {
      const { checkedAsValueNodes, isLazy, getPendingValue } = this;

      const pendingValue = !isLazy ? [] : getPendingValue();
      return [...checkedAsValueNodes.map((node) => node.valuePath), ...pendingValue];
    },
    handleCheckedChange() {
      const { tags, getInnerValue } = this;
      const value = getInnerValue();
      const output = value.map((val) => [...val]);

      this.innerValue = value;

      this.$emit('input', output);
      this.$emit('change', output, [...tags.map((tag) => ({ ...tag }))]);
    },
    setInnerVisible(visible, silent = false) {
      const { innerVisible } = this;
      if (innerVisible !== visible) {
        this.innerVisible = visible;
        this.focused = visible;

        if (!silent) {
          this.$emit('popup-visible-change', visible);
        }
      }
    },
    updateActiveValue() {
      const { tags, activeValue, getNode } = this;

      if (activeValue.length === 0 || !getNode(activeValue)) {
        this.activeValue = tags.length > 0 ? tags[0].valuePath : [];
      } else {
        // 让展示节点强制刷新
        this.activeValue = [...activeValue];
      }
    },
    handleMenuClick(e, node, isClickCheckbox = true) {
      const { canAsync, asyncNode } = this;
      const { valuePath } = node;

      this.focused = true;
      this.activeValue = valuePath;

      // 如果点击的复选框，保存点击的节点,可能需要触发事件
      if (isClickCheckbox) {
        this.activeCheckValue = valuePath;
      }

      if (canAsync(node)) {
        asyncNode(node).then(() => {
          const {
            activeCheckValue, innerValue, getInnerValue, handleCheckedChange
          } = this;
          // 当前请求还有效
          if (isEqual(activeCheckValue, valuePath) && !isEqual(innerValue, getInnerValue())) {
            handleCheckedChange();
          }
        });
      }
    },
    onMenuItemSelect(e, node) {
      this.handleMenuClick(e, node, false);
    },
    onMenuItemCheck(e, node) {
      const {
        checkNodeRelation,
        forceUpdateTriggerAlign,
        checkStrict,
        isLazy,
        getPendingValue,
        setPendingValue,
        handleCheckedChange,
        handleMenuClick,
      } = this;
      const {
        isChecked, isParent, isLoaded, valuePath
      } = node;

      e.stopPropagation();
      checkNodeRelation(node);
      forceUpdateTriggerAlign();

      // 非异步加载模式或节点已经加载过了，直接触发事件
      if (!isLazy || isLoaded) {
        handleCheckedChange();
      }

      // 异步加载模式父子关联场景取消勾选，需要把当前节点的后代元素从pendingValue中删除
      let pendingValue = getPendingValue();
      const len = pendingValue;
      if (isLazy && !checkStrict && !isChecked && isParent && pendingValue.length > 0) {
        pendingValue = pendingValue.filter((val) => !maybeAncestorOf(valuePath, val));
        if (len !== pendingValue.length) {
          setPendingValue(pendingValue);
        }
      }

      // 展示下级数据
      handleMenuClick(e, node, true);
    },
    onClear(e) {
      const {
        setInnerVisible, tags, checkNodeRelation, handleCheckedChange
      } = this;
      e.stopPropagation();

      tags
        .filter((tag) => !tag.disabled)
        .forEach((tag) => {
          const node = tag;
          node.isChecked = false;

          checkNodeRelation(node);
        });

      setInnerVisible(false);
      handleCheckedChange();
    },
    onPopupVisibleChange(visible) {
      this.setInnerVisible(visible);
    },
    onRemove(e, tag) {
      const { forceUpdateTriggerAlign, checkNodeRelation, handleCheckedChange } = this;
      e.stopPropagation();

      const node = tag;
      node.isChecked = false;

      checkNodeRelation(node);
      forceUpdateTriggerAlign();
      handleCheckedChange();
    },
    getSlotDefaultTriggerNode() {
      const {
        $slots: { default: slotDefault },
        disabled,
      } = this;
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
    renderTags() {
      const {
        prefixCls,
        tags,
        disabled,
        onRemove,
        getDisplayLabel,
        maxTagCount,
        maxTagPlaceholder,
      } = this;

      const maxCount = Number(maxTagCount);
      const isTagsExceed = maxCount >= 0 && maxCount < tags.length;
      const shownTags = isTagsExceed ? tags.slice(0, maxCount) : tags;
      const extraTags = isTagsExceed ? tags.slice(maxCount) : [];

      let extraTag = null;

      if (isTagsExceed) {
        const placeholder = isFunction(maxTagPlaceholder)
          ? maxTagPlaceholder(extraTags)
          : maxTagPlaceholder;
        extraTag = (
          <li class={`${prefixCls}-tag ${prefixCls}-tag-disabled`}>
            <div class={`${prefixCls}-tag-content`}>{placeholder}</div>
          </li>
        );
      }

      return tags.length > 0 ? (
        <ul class={`${prefixCls}-tag-wrapper`}>
          {shownTags.map((tag) => {
            const tagCls = {
              [`${prefixCls}-tag`]: true,
              [`${prefixCls}-tag-disabled`]: tag.disabled,
            };
            const removeIcon = disabled || tag.disabled ? null : (
                <Icon
                  type="close-t"
                  class={`${prefixCls}-tag-remove`}
                  on-click={($event) => {
                    onRemove($event, tag);
                  }}
                />
            );

            return (
              <li class={tagCls}>
                <div class={`${prefixCls}-tag-content`}>{getDisplayLabel(tag.valuePath)}</div>
                {removeIcon}
              </li>
            );
          })}
          {extraTag}
        </ul>
      ) : null;
    },
    renderPlaceholder() {
      const { prefixCls, tags, placeholder } = this;

      return tags.length > 0 ? null : <div class={`${prefixCls}-placeholder`}>{placeholder}</div>;
    },
    renderClearIcon() {
      const {
        prefixCls, allowClear, disabled, tags, onClear
      } = this;

      return allowClear && !disabled && tags.length > 0 ? (
        <Icon type="close-circle-t" class={`${prefixCls}-clear`} on-click={onClear} />
      ) : null;
    },
    renderArrow() {
      const { arrowClass } = this;
      return <Icon key="arrow" type="down-a" class={arrowClass} />;
    },
    renderTrigger() {
      const {
        disabled,
        triggerClass,
        getSlotDefaultTriggerNode,
        renderTags,
        renderPlaceholder,
        renderArrow,
        renderClearIcon,
      } = this;

      let triggerNode = getSlotDefaultTriggerNode();

      if (!triggerNode) {
        triggerNode = (
          <div
            slot="trigger"
            ref="triggerNodeRef"
            tabIndex={disabled ? undefined : 0}
            class={triggerClass}
          >
            {renderPlaceholder()}
            {renderTags()}
            {renderClearIcon()}
            {renderArrow()}
          </div>
        );
      }

      return triggerNode;
    },
    renderPopup() {
      const {
        prefixCls,
        showNodes,
        activeValue,
        $scopedSlots,
        renderLabel,
        expandTrigger,
        onMenuItemCheck,
        onMenuItemSelect,
      } = this;
      const renderLabelFn = $scopedSlots.renderLabel || renderLabel;

      return (
        <template slot="popup">
          {showNodes.map((nodes, i) => {
            const menuProps = {
              prefixCls,
              nodes,
              // level: i,
              expandTrigger,
              // 使用null避免undefined被menu设置默认值''影响判断
              activeValue: activeValue[i] !== undefined ? activeValue[i] : null,
              renderLabel: renderLabelFn,
            };
            const on = {
              select: onMenuItemSelect,
              check: onMenuItemCheck,
            };
            return <Menu {...{ props: menuProps, on }} />;
          })}
        </template>
      );
    },
  },
  render() {
    const {
      prefixCls,
      disabled,
      innerVisible,
      builtinPlacements,
      transitionName,
      popupClass,
      popupStyle,
      getPopupContainer,
      popupPlacement,
      onPopupVisibleChange,
      renderTrigger,
      renderPopup,
    } = this;

    const triggerProps = {
      prefixCls: `${prefixCls}-panel`,
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
      <Trigger {...{ props: triggerProps, ref: 'triggerRef', on }}>
        {renderTrigger()}
        {renderPopup()}
      </Trigger>
    );
  },
};
