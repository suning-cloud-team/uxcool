import { isFunction, isVNode, isPlainObject } from '@cloud-sn/v-utils';
import { buildComponentName } from '../utils';
import VirtualList from '../virtual-list';
import Search from './search';
import Item from './item';
import Checkbox from '../checkbox';

const defaultLazy = {
  height: 33,
  remain: 4,
};

export default {
  name: buildComponentName('TransferList'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-transfer-list',
    },
    direction: {
      type: String,
      default: 'left',
    },
    title: {
      type: String,
      default: '',
    },
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
    filterOption: {
      type: Function,
      default: null,
    },
    checkedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    renderContent: {
      type: Function,
      default: undefined,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: '',
    },
    notFoundContent: {
      type: String,
      default: 'Not Found',
    },
    itemUnit: {
      type: String,
      default: '项',
    },
    itemsUnit: {
      type: String,
      default: '项',
    },
    lazy: {
      type: [Object, Boolean],
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchVal: '',
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
    classes() {
      const { prefixCls, nLazy } = this;
      return {
        [prefixCls]: true,
        [`${prefixCls}-no-lazy`]: !nLazy,
      };
    },
    filtedDataSource() {
      const { dataSource, searchVal = '', searchFilter } = this;
      const trimSearchVal = searchVal.trim();
      if (trimSearchVal) {
        return dataSource.filter((v) => searchFilter(trimSearchVal, String(v.label || v.title || v.key), v));
      }
      return dataSource;
    },
    filtedAndNoDisabledDataSource() {
      return this.filtedDataSource.filter((v) => !v.disabled);
    },
    validCheckedKeys() {
      const { dataSource, checkedKeys } = this;
      return dataSource
        .filter((item) => checkedKeys.indexOf(item.$$_key) > -1)
        .map((item) => item.$$_key);
    },
    checkedKeysObj() {
      return this.checkedKeys.reduce((r, k) => {
        const nr = r;
        nr[k] = 1;
        return nr;
      }, {});
    },
    checkBoxAllStatus() {
      const { filtedAndNoDisabledDataSource, checkedKeys, checkedKeysObj } = this;
      let status = 'none';
      if (checkedKeys.length === 0) {
        status = 'none';
      } else if (
        filtedAndNoDisabledDataSource.length > 0
        && filtedAndNoDisabledDataSource.every((v) => v.$$_key in checkedKeysObj)
      ) {
        status = 'all';
      } else if (filtedAndNoDisabledDataSource.some((v) => v.$$_key in checkedKeysObj)) {
        status = 'part';
      }

      return {
        checkAll: status === 'all',
        checkPart: status === 'part',
      };
    },
    isAllCheckDisabled() {
      const { disabled, filtedAndNoDisabledDataSource } = this;
      return disabled || filtedAndNoDisabledDataSource.length === 0;
    },
  },
  methods: {
    searchFilter(searchVal, text, item) {
      const { filterOption } = this;
      if (isFunction(filterOption)) {
        return filterOption(searchVal, item);
      }

      return isFunction(text.indexOf) && text.indexOf(searchVal) > -1;
    },
    getSlotVNodeByName(name) {
      const { $props, $slots, $scopedSlots } = this;
      const fn = $scopedSlots[name];
      if (isFunction(fn)) {
        return fn($props);
      }

      const slotNode = $slots[name];
      if (slotNode) {
        return slotNode;
      }

      return null;
    },
    onScroll(e) {
      this.$emit('scroll', this.direction, e);
    },
    onSearchInput(val) {
      this.searchVal = val;
      this.$emit('search-change', this.direction, val);
    },
    onSearchClear() {
      this.searchVal = '';
      this.$emit('search-clear', this.direction);
    },
    onItemClick(item) {
      const { direction, checkedKeysObj } = this;
      const key = item.$$_key;
      let checked = true;
      if (key in checkedKeysObj) {
        checked = false;
      }

      this.$emit('select', direction, key, checked);
    },
    onCheckAllChange() {
      const {
        direction,
        filtedAndNoDisabledDataSource,
        checkedKeysObj,
        checkBoxAllStatus: { checkAll, checkPart },
      } = this;
      let checked = true;
      let changedDataSource;
      if (checkAll) {
        checked = false;
        changedDataSource = filtedAndNoDisabledDataSource;
      } else if (checkPart) {
        checked = true;
        // eslint-disable-next-line
        changedDataSource = filtedAndNoDisabledDataSource.filter(
          (v) => !(v.$$_key in checkedKeysObj)
        );
      } else {
        checked = true;
        changedDataSource = filtedAndNoDisabledDataSource;
      }
      this.$emit('select-all', direction, changedDataSource.map((v) => v.$$_key), checked);
    },
    normalizeItem(item) {
      const { renderContent, direction } = this;
      let { title, label } = item;
      if (isFunction(renderContent)) {
        const content = renderContent({ ...item, $$direction: direction }, direction);
        if (content) {
          if (isVNode(content)) {
            label = content;
          } else if (isPlainObject(content)) {
            title = content.title || title;
            label = content.label || label;
          } else {
            label = content;
          }
        }
      }
      return {
        ...item,
        title,
        label,
      };
    },
    renderItem(item) {
      const {
        normalizeItem, checkedKeysObj, onItemClick, disabled
      } = this;
      const nItem = normalizeItem(item);
      const key = nItem.$$_key;
      const props = {
        disabled,
        item: nItem,
        title: nItem.title,
        label: nItem.label,
        checked: key in checkedKeysObj,
      };
      return <Item key={key} {...{ props, on: { click: onItemClick } }} />;
    },
    renderItems() {
      const { filtedDataSource, renderItem } = this;
      return filtedDataSource.map(renderItem);
    },
    renderBody() {
      const {
        $props,
        $slots,
        $scopedSlots: { body: bodyFn },
        prefixCls,
        disabled,
        nLazy,
        filtedDataSource,
        showSearch,
        searchPlaceholder,
        renderItems,
        notFoundContent,
        onSearchInput,
        onSearchClear,
        onScroll,
      } = this;

      const searchInput = showSearch ? (
        <Search
          class={`${prefixCls}-body-search-wrapper`}
          placeholder={searchPlaceholder}
          disabled={disabled}
          on-input={onSearchInput}
          on-clear={onSearchClear}
        />
      ) : null;

      const listCls = {
        [`${prefixCls}-content`]: true,
        [`${prefixCls}-content-empty`]: filtedDataSource.length === 0,
      };
      const lazyList = nLazy ? (
        <VirtualList
          {...{
            class: listCls,
            props: {
              ...nLazy,
              size: nLazy.height,
              wtag: 'ul',
              onscroll: onScroll,
            },
          }}
        >
          {renderItems()}
        </VirtualList>
      ) : (
        <ul class={listCls} on-scroll={onScroll}>
          {renderItems()}
        </ul>
      );
      /* <transition-group name={`${prefixCls}`} tag="ul" class={listCls} on-scroll={onScroll}>
          {renderItems()}
        </transition-group>  */
      const bodyCls = {
        [`${prefixCls}-body`]: true,
        [`${prefixCls}-body-with-search`]: showSearch,
      };

      return isFunction(bodyFn) ? (
        bodyFn($props)
      ) : (
        <div class={bodyCls}>
          {searchInput}
          {lazyList}
          <div class={`${prefixCls}-body-not-found`}>
            {$slots.notFoundContent || notFoundContent}
          </div>
        </div>
      );
    },
  },
  render() {
    const {
      prefixCls,
      classes,
      title,
      filtedDataSource,
      checkedKeys,
      itemsUnit,
      itemUnit,
      renderBody,
      getSlotVNodeByName,
      checkBoxAllStatus,
      onCheckAllChange,
      validCheckedKeys,
      isAllCheckDisabled,
    } = this;
    const unit = checkedKeys.length > 1 ? itemsUnit : itemUnit;

    const checkBoxAll = (
      <Checkbox
        control
        disabled={isAllCheckDisabled}
        checked={checkBoxAllStatus.checkAll}
        indeterminate={checkBoxAllStatus.checkPart}
        on-change={onCheckAllChange}
      />
    );

    const footerNode = getSlotVNodeByName('footer');
    const footerElement = footerNode ? <div class={`${prefixCls}-footer`}>{footerNode}</div> : null;

    return (
      <div class={[classes, { [`${prefixCls}-with-footer`]: !!footerElement }]}>
        <div class={`${prefixCls}-header`}>
          {checkBoxAll}
          <span class={`${prefixCls}-header-selected`}>
            <span>
              {validCheckedKeys.length > 0 ? `${validCheckedKeys.length}/` : ''}
              {`${filtedDataSource.length} ${unit}`}
            </span>
            <span class={`${prefixCls}-header-title`}>{title}</span>
          </span>
        </div>
        {renderBody()}
        {footerElement}
      </div>
    );
  },
};
