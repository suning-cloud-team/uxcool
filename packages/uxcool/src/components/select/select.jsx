import omit from 'object.omit';
import VMenu, { VMenuItem, VMenuItemGroup } from '@suning/v-menu';
import Trigger from '@suning/v-trigger';
import {
  isArray,
  isFunction,
  isEqual,
  isPlainObject,
  updatePortalElement,
  cloneDeepWith,
} from '@suning/v-utils';
import VirtualList from '../virtual-list';
import { buildComponentName } from '../utils';
import {
  isValidValue,
  buildOptionsFromSlot,
  cloneLabelNodes,
  isOptionGroup,
  buildOptionOriginNode,
  getOptionLabelMap,
  splitValueBySeparator,
  getComboboxValue,
  getOptionOriginNode,
  isUnRenderOption,
} from './utils';
import placements from './placements';
import PlaceholderMixin from './mixins/placeholder';
import SingleMixin from './mixins/single';
import MultipleMixin from './mixins/multiple';
import SearchMixin from './mixins/search';
import TagsMixin from './mixins/tags';

const defaultLazy = {
  remain: 8,
  height: 32,
};

export default {
  name: buildComponentName('Select'),
  mixins: [PlaceholderMixin, SingleMixin, MultipleMixin, SearchMixin, TagsMixin],
  provide() {
    return {
      selectNRoot: this,
    };
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ux-select',
    },
    dataSource: {
      type: Array,
      default: null,
    },
    value: {
      type: [String, Number, Array],
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      validator(val) {
        return ['multiple', 'tags', 'default', 'SECRET_COMBOBOX_MODE_DO_NOT_USE'].indexOf(val) > -1;
      },
      default: 'default',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    autoClearSearchValue: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Please Select',
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
    popupClass: {
      type: [String, Object, Array],
      default: '',
    },
    popupStyle: {
      type: Object,
      default: null,
    },
    builtinPlacements: {
      type: Object,
      default() {
        return placements;
      },
    },
    transition: {
      type: String,
      default: 'slide-up',
    },
    dropdownMatchSelectWidth: {
      type: Boolean,
      default: true,
    },
    dropdownMenuStyle: {
      type: Object,
      default: undefined,
    },
    getContainer: {
      type: Function,
      default: null,
    },
    filterOption: {
      type: [Function, Boolean],
      default: null,
    },
    renderLabel: {
      type: Function,
      default: null,
    },
    renderGroupLabel: {
      type: Function,
      default: null,
    },
    lazy: {
      type: [Object, Boolean],
      default: true,
    },
    size: {
      type: String,
      default: '',
      validator(val) {
        return ['large', 'default', 'small', ''].indexOf(val) > -1;
      },
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
    optionFilterProp: {
      type: String,
      default: 'value',
      validator(val) {
        return ['label', 'value'].indexOf(val) > -1;
      },
    },
    optionLabelProp: {
      type: String,
      default: undefined,
      validator(val) {
        return ['value', 'label', 'children'].indexOf(val) > -1;
      },
    },
    notFoundContent: {
      type: [String, Object],
      default: undefined,
    },
    clearDisabled: {
      type: Boolean,
      default: true,
    },
    choiceTranstion: {
      type: String,
      default: 'zoom',
    },
    tokenSeparatorProp: {
      type: String,
      default: 'label',
      validator(val) {
        return ['label', 'value'].indexOf(val) > -1;
      },
    },
    tokenSeparators: {
      type: Array,
      default() {
        return [];
      },
    },
    getInputElement: {
      type: Function,
      default: null,
    },
    control: {
      type: Boolean,
      default: false,
    },
    extraTopContent: {
      type: Function,
      default: null,
    },
    extraBottomContent: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      innerValue: null,
      innerVisible: false,
      searchInputValue: '',
      isMounted: false,
    };
  },
  computed: {
    nLazy() {
      const { lazy } = this;

      if (lazy === false) {
        return false;
      }

      if (isPlainObject(lazy)) {
        return { ...defaultLazy, ...lazy };
      }
      return defaultLazy;
    },

    isTags() {
      return this.mode === 'tags';
    },
    isMultipleOrTags() {
      const { mode } = this;
      return mode === 'tags' || mode === 'multiple';
    },
    isCombobox() {
      return this.mode === 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
    },
    isMultipleOrTagsOrCombobox() {
      const { isCombobox, isMultipleOrTags } = this;
      return isMultipleOrTags || isCombobox;
    },
    popupClasses() {
      const { prefixCls, isMultipleOrTags } = this;
      return {
        [`${prefixCls}-dropdown--${isMultipleOrTags ? 'multiple' : 'single'}`]: true,
      };
    },
    normalizeNotFountContent() {
      const { notFoundContent, isCombobox } = this;

      if (notFoundContent !== undefined) {
        return notFoundContent;
      }

      if (isCombobox) {
        return null;
      }

      return 'Not Found';
    },
    normalizeOptionLabelProp() {
      const { optionLabelProp, isCombobox } = this;
      let labelProp = optionLabelProp;
      if (isCombobox && (!labelProp || labelProp === 'children')) {
        labelProp = 'value';
      }

      return labelProp;
    },
  },
  watch: {
    value(nVal) {
      this.setInnerValue(nVal, false, true);
      this.updateComboxInputValue();
    },
    visible(nVal) {
      this.setInnerVisible(nVal, false);
    },
  },
  created() {
    const {
      value, visible, setInnerValue, setInnerVisible
    } = this;
    setInnerValue(value, false, true);
    setInnerVisible(visible, false);
    // no reactive data
    this.optionMap = {};
    this.prevSelections = null;
    this.prevInnerVisible = undefined;
    this.selectedOffset = 0;
    this.selectedPos = null;
    this.rootLineMapping = null;
    this.isVirtualInit = false;
    this.innerValueObj = {};
    // no reactive data
  },
  mounted() {
    this.isMounted = true;
    this.updateComboxInputValue();
  },
  updated() {
    const {
      $refs: { triggerRef, virtualListRef, menuRef },
      prevInnerVisible,
      innerVisible,
      nLazy,
    } = this;
    if (prevInnerVisible !== innerVisible) {
      this.prevInnerVisible = innerVisible;
      if (innerVisible) {
        if (triggerRef) {
          const alignElement = triggerRef.getPortalPopupElement();
          updatePortalElement(alignElement, () => {
            const {
              selectedPos: { line },
            } = this;
            if (nLazy) {
              if (virtualListRef) {
                if (line > 0) {
                  virtualListRef.setScrollTop((line - 1) * nLazy.height);
                }
              }
            } else if (menuRef) {
              menuRef.$el.scrollTop = (line - 1) * defaultLazy.height;
            }
          });
        }
      }
    }
  },
  methods: {
    updateComboxInputValue() {
      const {
        isCombobox,
        setSearchInputValue,
        innerValue,
        optionMap,
        normalizeOptionLabelProp,
      } = this;
      if (isCombobox) {
        setSearchInputValue(
          getComboboxValue(innerValue, optionMap, normalizeOptionLabelProp),
          false,
          false
        );
      }
    },
    maybeFocus() {
      const { isMultipleOrTagsOrCombobox, multipleSearchInputFocus, singleSearchInputFocus } = this;
      setTimeout(() => {
        (isMultipleOrTagsOrCombobox ? multipleSearchInputFocus : singleSearchInputFocus)();
      }, 0);
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
    setInnerValue(value, trigger = true, isPass) {
      const {
        innerValue, isMultipleOrTags, optionMap, control
      } = this;
      const pass = isPass || !control;
      let val = isValidValue(value) ? value : [];
      val = isArray(val) ? val : [val];
      if (!isMultipleOrTags) {
        val = isValidValue(val[0]) ? [val[0]] : [];
      }
      if (!isEqual(val, innerValue)) {
        if (pass) {
          this.innerValue = val;
        }
        if (trigger) {
          let nVal = [...val];
          nVal = isMultipleOrTags ? nVal : nVal[0];

          const valObj = isMultipleOrTags
            ? nVal.map(v => buildOptionOriginNode(v, optionMap))
            : buildOptionOriginNode(nVal, optionMap);

          if (pass) {
            this.$emit('input', nVal, valObj);
          }
          // 兼容原有Select行为Function(Object, value)
          this.$emit('change', valObj, nVal);
        }
      }
    },
    setInnerVisible(visible, trigger = true) {
      this.innerVisible = visible;
      if (trigger) {
        this.$emit('popup-visible-change', visible);
      }
    },
    // optionMap是非响应式属性(optionMap设为响应式时,可能造成无限循环),为防止optionMap更新后无法获取最新的值, 因此作为方法使用
    getSelectionValue() {
      const { optionMap, innerValue, innerValueObj } = this;
      const values = [];
      for (let i = 0, l = innerValue.length; i < l; i += 1) {
        const key = innerValue[i];
        if (key in optionMap) {
          values.push(optionMap[key]);
        } else if (key in innerValueObj) {
          values.push(innerValueObj[key]);
        } else {
          const option = {
            value: key,
            label: key,
            content: key,
            selectionContent: key,
          };
          option.originNode = { value: key, label: key };
          values.push(option);
        }
      }
      return values;
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
      const { setInnerVisible, onSelectorBlur, isCombobox } = this;
      setInnerVisible(visible);
      if (!visible && !isCombobox) {
        setTimeout(() => {
          onSelectorBlur();
        }, 100);
      }
    },
    onMenuSelect({ name }) {
      const {
        isCombobox,
        normalizeOptionLabelProp,
        isMultipleOrTags,
        innerValue,
        setInnerVisible,
        setInnerValue,
        optionMap,
        maybeFocus,
        setSearchInputValue,
        autoClearSearchValue,
        clearSearchInputValue,
        disabled,
      } = this;

      if (disabled) {
        return;
      }

      let values = [...innerValue];
      if (isMultipleOrTags) {
        if (values.indexOf(name) === -1) {
          values.push(name);
        }
      } else {
        values = [name];
        setInnerVisible(false);
      }
      setInnerValue(values);
      this.$emit('select', name, buildOptionOriginNode(name, optionMap));
      if (isCombobox) {
        const inputValue = getComboboxValue(name, optionMap, normalizeOptionLabelProp);
        setSearchInputValue(inputValue, false, false);
      } else if (autoClearSearchValue) {
        setTimeout(() => {
          clearSearchInputValue(false);
        }, 100);
      }

      maybeFocus();
    },
    removeSelected(name) {
      const {
        innerValue,
        disabled,
        clearDisabled,
        isMultipleOrTags,
        optionMap,
        setInnerValue,
        maybeFocus,
      } = this;
      const item = optionMap[name] || {};
      if (disabled || (!!item.disabled && !clearDisabled)) {
        return;
      }
      const values = innerValue.filter(v => String(v) !== String(name));

      if (isMultipleOrTags) {
        this.$emit('deselect', name, buildOptionOriginNode(name, optionMap));
      }
      setInnerValue(values);
      maybeFocus();
    },
    onMenuDeselect({ name }) {
      const { removeSelected, clearSearchInputValue, autoClearSearchValue } = this;
      removeSelected(name);
      if (autoClearSearchValue) {
        clearSearchInputValue(false);
      }
    },
    onClear(e) {
      e.stopPropagation();
      const {
        isMultipleOrTags,
        clearDisabled,
        getSelectionValue,
        setInnerValue,
        clearSearchInputValue,
        setInnerVisible,
        maybeFocus,
        disabled,
      } = this;

      if (disabled) {
        return;
      }

      let values = [];
      if (isMultipleOrTags && !clearDisabled) {
        values = getSelectionValue()
          .filter(v => !!v.disabled)
          .map(v => v.value);
      }
      setInnerValue(values);
      setInnerVisible(false);
      setTimeout(() => {
        clearSearchInputValue();
        this.$emit('clear');
      }, 100);
      maybeFocus();
    },
    onSelectorBlur() {
      const {
        disabled,
        isTags,
        searchInputValue,
        innerValue,
        setSearchInputValue,
        setInnerValue,
      } = this;
      if (disabled) {
        return;
      }
      if (searchInputValue) {
        if (isTags) {
          if (innerValue.indexOf(searchInputValue) === -1) {
            setInnerValue([...innerValue, searchInputValue]);
          }
        }
        setSearchInputValue('', false, false);
      }
    },
    onTokenSeparator(value) {
      const {
        tokenSeparatorProp,
        tokenSeparators,
        isMultipleOrTags,
        isTags,
        innerValue,
        optionMap,
        setInnerValue,
        setInnerVisible,
        setSearchInputValue,
      } = this;
      this.searchInputValue = value;
      if (isMultipleOrTags) {
        let valueMap = optionMap;
        if (tokenSeparatorProp === 'label') {
          valueMap = getOptionLabelMap(optionMap);
        }
        const values = [...innerValue];
        splitValueBySeparator(value, tokenSeparators).forEach((label) => {
          const option = valueMap[label];
          if (option) {
            if (values.indexOf(option.value) === -1) {
              values.push(option.value);
            }
          } else if (isTags) {
            if (values.indexOf(label) === -1) {
              values.push(label);
            }
          }
        });

        setInnerValue(values);
        setInnerVisible(false);
        setSearchInputValue('', false, false);
      }
    },
    onScroll(e) {
      this.$emit('scroll', e);
    },
    /*
     * 数据结构格式化为标准格式
     * {
     *   value:'',
     *   label:'',
     *   content: '',
     *   selectionContent: '',
     *   originNode: {}
     * }
     */
    formatOptions(options = [], renderLabel, renderGroupLabel, optionMap) {
      const { formatOptions, normalizeOptionLabelProp } = this;
      const nOptionMap = optionMap;
      return options.map((option) => {
        const nOption = { ...option, originNode: omit(option, 'labelNode') };
        if (isOptionGroup(option)) {
          nOption.content = isFunction(renderGroupLabel) ? renderGroupLabel(option) : option.label;
          nOption.children = formatOptions(
            nOption.children,
            renderLabel,
            renderGroupLabel,
            nOptionMap
          );
        } else {
          if (isEqual(option.labelNode, {}) || isEqual(option.labelNode, [])) {
            nOption.labelNode = undefined;
          }
          const labelNode =
            nOption.labelNode || (isFunction(renderLabel) ? renderLabel(option) : undefined);
          nOption.content = labelNode || option.label || option.value;
          let selectionContent = option.label || option.value;
          if (normalizeOptionLabelProp) {
            // vue 同一渲染树中,同一vnode有且只能出现一次,所以clone一个节点用于页面显示
            selectionContent =
              normalizeOptionLabelProp === 'children'
                ? cloneLabelNodes(labelNode)
                : option[normalizeOptionLabelProp] || '';
          }
          nOption.selectionContent = selectionContent;
          nOptionMap[nOption.value] = nOption;
        }
        return nOption;
      });
    },
    // 保持已选中值正常显示,所以需要在datasource变化时缓存数据
    cacheOldValues() {
      const { innerValue, optionMap, innerValueObj } = this;

      const values = isArray(innerValue) ? innerValue : [innerValue];
      this.innerValueObj = values.reduce((r, key) => {
        const nr = r;
        const obj = optionMap[key] || innerValueObj[key];
        if (obj) {
          nr[key] = obj;
        }
        return nr;
      }, {});
    },
    getFormatOptionsAndOptionMap(options) {
      const {
        $scopedSlots,
        isCombobox,
        innerValue,
        prevOptions,
        renderLabel,
        renderGroupLabel,
        formatOptions,
        normalizeOptionLabelProp,
        setSearchInputValue,
        cacheOldValues,
      } = this;

      if (isEqual(prevOptions, options)) {
        return {
          optionMap: this.optionMap,
          fOptions: this.fOptions,
        };
      }
      this.prevOptions = cloneDeepWith(options, (value, name) => {
        // `labelNode` 是 `VNode` 类型,没有clone必要, clone时反而会造成问题
        if (name === 'labelNode') {
          return value;
        }
        return undefined;
      });
      cacheOldValues();
      const renderLabelFn = $scopedSlots.renderLabel || renderLabel;
      const renderGroupLabelFn = $scopedSlots.renderGroupLabel || renderGroupLabel;

      const optionMap = {};
      const fOptions = formatOptions(options, renderLabelFn, renderGroupLabelFn, optionMap);

      // 设置combobox input框的值
      if (isCombobox) {
        const prevOriginNodes = getOptionOriginNode(this.optionMap);
        const currentOriginNodes = getOptionOriginNode(optionMap);
        if (!isEqual(prevOriginNodes, currentOriginNodes)) {
          setSearchInputValue(
            getComboboxValue(innerValue, optionMap, normalizeOptionLabelProp),
            false,
            false
          );
        }
      }

      return {
        optionMap,
        fOptions,
      };
    },
    renderChildren(
      options = [],
      shouldNotFound = false,
      level = 0,
      extraParam = {
        line: 0,
        // 第一级所在位置
        rootGroupLine: 0,
        rootLineMapping: {},
        selected: {
          // 第一级位置
          groupLine: 0,
          // 选中行实际位置
          line: -1,
        },
      }
    ) {
      const {
        renderChildren, normalizeNotFountContent, innerValue, disabled
      } = this;
      const nExtraParam = extraParam;
      const ret = [];
      for (let i = 0, l = options.length; i < l; i += 1) {
        const option = options[i];
        if (!isUnRenderOption(option)) {
          nExtraParam.line += 1;
          if (level === 0) {
            nExtraParam.rootGroupLine = i;
            nExtraParam.rootLineMapping[i] = {
              realLine: nExtraParam.line,
              nodeCnt: 0,
            };
          }
          nExtraParam.rootLineMapping[nExtraParam.rootGroupLine].nodeCnt += 1;
          if (isOptionGroup(option)) {
            const { children, content } = option;

            const attrs = omit(option, ['uid', 'label', 'children', 'content', 'originNode']);
            const groupNode = (
              <VMenuItemGroup {...{ key: `group-${nExtraParam.line}`, attrs }}>
                <template slot="title">{content}</template>
                {renderChildren(children, false, level + 1, nExtraParam)}
              </VMenuItemGroup>
            );
            ret.push(groupNode);
          } else {
            const props = {
              name: option.value || option.value === 0 ? option.value : 'NO_VALUE',
              label: option.label,
              disabled: option.disabled || disabled,
            };
            const attrs = omit(option, [
              'uid',
              'value',
              'label',
              'disabled',
              'labelNode',
              'content',
              'selectionContent',
              'originNode',
            ]);

            if (nExtraParam.selected.line === -1 && innerValue.indexOf(option.value) > -1) {
              nExtraParam.selected.groupLine = nExtraParam.rootGroupLine;
              nExtraParam.selected.line = nExtraParam.line;
            }
            const menuItemAttrs = { key: option.value, props, attrs };
            ret.push(<VMenuItem {...menuItemAttrs}>{option.content}</VMenuItem>);
          }
        }
      }
      if (shouldNotFound && ret.length === 0 && normalizeNotFountContent) {
        nExtraParam.line += 1;
        ret.push(<VMenuItem key="NOT_FOUND" name="NOT_FOUND" disabled>
            {normalizeNotFountContent}
          </VMenuItem>);
      }
      return ret;
    },
    renderTrigger() {
      const { isMultipleOrTagsOrCombobox, renderSingleTrigger, renderMultipleTrigger } = this;
      return isMultipleOrTagsOrCombobox ? renderMultipleTrigger() : renderSingleTrigger();
    },
    renderPopup(options) {
      const {
        $slots,
        prefixCls,
        innerValue,
        nLazy,
        isTags,
        isMultipleOrTags,
        dropdownMenuStyle,
        extraTopContent,
        extraBottomContent,
        onMenuSelect,
        onMenuDeselect,
        onScroll,
        searchFilterOptions,
        getTagsFilterOptions,
        renderChildren,
      } = this;
      const props = {
        prefixCls: `${prefixCls}-dropdown-menu`,
        selectedKeys: innerValue,
        multiple: isMultipleOrTags,
        mode: 'vertical',
        hasTitleAttr: true,
      };
      const on = isMultipleOrTags
        ? {
          select: onMenuSelect,
          deselect: onMenuDeselect,
        }
        : {
          click: onMenuSelect,
      };
      let filtedOptions = searchFilterOptions(options);
      if (isTags) {
        filtedOptions = getTagsFilterOptions(filtedOptions);
      }
      const extraParam = {
        line: 0,
        // 第一级所在位置
        rootGroupLine: 0,
        rootLineMapping: {},
        selected: {
          // 第一级位置
          groupLine: 0,
          // 选中行实际位置
          line: -1,
        },
      };
      const children = renderChildren(filtedOptions, true, 0, extraParam);
      const { line: realLine, selected, rootLineMapping } = extraParam;
      this.selectedPos = selected;
      this.rootLineMapping = rootLineMapping;

      const virtualProps = {
        ...nLazy,
        size: nLazy.height,
        remain: nLazy.remain > realLine ? realLine : nLazy.remain,
        wclass: `${prefixCls}-dropdown-menu-virtual`,
        wstyle: dropdownMenuStyle,
        wtag: VMenu,
        wprops: props,
        wlisteners: on,
        variable: (index) => {
          const node = rootLineMapping[index];
          if (!node) {
            return 0;
          }
          return node.nodeCnt * nLazy.height;
        },
        onscroll: onScroll,
      };

      if (!this.isVirtualInit) {
        virtualProps.start = selected.groupLine || 0;
        this.isVirtualInit = true;
      }

      const extraTopContentFn = $slots.extraTopContent
        ? () => $slots.extraTopContent
        : extraTopContent;
      const extraBottomContentFn = $slots.extraBottomContent
        ? () => $slots.extraBottomContent
        : extraBottomContent;

      return (
        <div slot="popup">
          {isFunction(extraTopContentFn) ? (
            <div class={[`${prefixCls}-dropdown-extra`, `${prefixCls}-dropdown-extra-top`]}>
              {extraTopContentFn()}
            </div>
          ) : null}
          {nLazy ? (
            <VirtualList
              {...{
                props: virtualProps,
                ref: 'virtualListRef',
              }}
            >
              {children}
            </VirtualList>
          ) : (
            <VMenu
              {...{
                style: dropdownMenuStyle,
                props,
                on,
                nativeOn: {
                  scroll: onScroll,
                },
                ref: 'menuRef',
              }}
            >
              {children}
            </VMenu>
          )}
          {isFunction(extraBottomContentFn) ? (
            <div class={[`${prefixCls}-dropdown-extra`, `${prefixCls}-dropdown-extra-bottom`]}>
              {extraBottomContentFn()}
            </div>
          ) : null}
        </div>
      );
    },
  },
  render() {
    const {
      $slots,
      isMounted,
      dataSource,
      prefixCls,
      innerVisible,
      disabled,
      popupClasses,
      popupClass,
      popupStyle,
      builtinPlacements,
      transition,
      getContainer,
      getPopupWidth,
      getFormatOptionsAndOptionMap,
      renderTrigger,
      renderPopup,
      onPopupVisibleChange,
    } = this;
    let options = dataSource;
    if (!options) {
      const slotDefault = $slots.default || [];
      options = buildOptionsFromSlot(slotDefault);
    }
    let popupWidth = null;
    if (isMounted) {
      popupWidth = getPopupWidth();
    }
    const triggerProps = {
      prefixCls: `${prefixCls}-dropdown`,
      visible: innerVisible,
      actions: disabled ? [] : ['click'],
      popupClass: [popupClasses, popupClass],
      popupStyle: { ...popupWidth, ...popupStyle },
      builtinPlacements,
      popupPlacement: 'bottomLeft',
      popupTransitionName: transition,
      getPopupContainer: getContainer,
    };
    const on = {
      'popup-visible-change': onPopupVisibleChange,
    };
    const { fOptions, optionMap } = getFormatOptionsAndOptionMap(options);
    // no reactive
    this.optionMap = optionMap;
    this.fOptions = fOptions;

    return (
      <Trigger {...{ props: triggerProps, on, ref: 'triggerRef' }}>
        {renderTrigger()}
        {renderPopup(fOptions)}
      </Trigger>
    );
  },
};
