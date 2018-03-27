import { isFunction } from '@suning/v-utils';
import { VMenu as Menu, VSubMenu as SubMenu, VMenuItem as MenuItem } from '@suning/v-menu';

import Dropdown from '../dropdown';
import Icon from '../icon';
import Checkbox from '../checkbox';
import Radio from '../radio';
import SubMixin from './mixins/sub';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('filterDropdown'),
  mixins: [SubMixin],
  props: {
    dropdownPrefixCls: {
      type: String,
      default: '',
    },
    selectedKeys: {
      type: Array,
      default() {
        return [];
      },
    },
    column: {
      type: Object,
      default() {
        return {};
      },
    },
    getPopupContainer: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      innerSelectedKeys: [],
      dropdownVisible: false,
    };
  },
  computed: {
    filterPrefixCls() {
      return `${this.prefixCls}-filter`;
    },
    iconClasses() {
      const { filterPrefixCls, selectedKeys, column } = this;
      const filtered = 'filtered' in column ? !!column.filtered : true;
      return {
        [`${filterPrefixCls}-icon`]: true,
        [`${filterPrefixCls}-selected`]: filtered && selectedKeys.length > 0,
      };
    },
    isMultiple() {
      const { column } = this;
      return 'filterMultiple' in column ? column.filterMultiple : true;
    },
    filterIcon() {
      return this.renderFilterIcon();
    },
    hasSubMenu() {
      const { column: { filters = [] } } = this;
      return filters.filter(v => Array.isArray(v.children) && v.children.length > 0).length > 0;
    },
    filterMenu() {
      const {
        dropdownPrefixCls,
        isMultiple,
        column: { filters = [] },
        renderMenus,
        innerSelectedKeys,
        setInnerSelectedKeys,
        hasSubMenu,
      } = this;
      if (filters.length === 0) {
        return [];
      }
      const props = {
        prefixCls: `${dropdownPrefixCls}-menu`,
        multiple: isMultiple,
        selectedKeys: innerSelectedKeys,
        mode: 'vertical',
      };
      const on = {
        click() {},
        select({ selectedKeys }) {
          setInnerSelectedKeys(selectedKeys);
        },
        deselect({ selectedKeys }) {
          setInnerSelectedKeys(selectedKeys);
        },
      };
      return (
        <Menu
          class={{ [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu }}
          {...{ props, on }}
        >
          {renderMenus(filters)}
        </Menu>
      );
    },
  },
  watch: {
    selectedKeys(nVal) {
      if (nVal) {
        this.setInnerSelectedKeys(nVal);
      }
    },
    'column.filterDropdownVisible': function filterDropdownVisibleW(nVal, oVal) {
      if (nVal !== oVal) {
        this.initDropdownVisible();
      }
    },
  },
  created() {
    this.setInnerSelectedKeys(this.selectedKeys);
    this.initDropdownVisible();
  },
  methods: {
    initDropdownVisible() {
      const { column } = this;
      const visible = 'filterDropdownVisible' in column ? !!column.filterDropdownVisible : false;
      this.dropdownVisible = visible;
    },
    setDropdownVisible(visible) {
      const { column } = this;
      this.dropdownVisible = visible;
      if (isFunction(column.onFilterDropdownVisibleChange)) {
        column.onFilterDropdownVisibleChange(visible);
      }
    },
    setInnerSelectedKeys(keys) {
      this.innerSelectedKeys = keys;
    },
    confirmFilter() {
      const { column, innerSelectedKeys, selectedKeys } = this;
      if (innerSelectedKeys !== selectedKeys) {
        this.$emit('confirm-filter', column, innerSelectedKeys);
      }
    },
    handleConfirm() {
      const { setDropdownVisible, confirmFilter } = this;
      setDropdownVisible(false);
      confirmFilter();
    },
    handleClearFilters() {
      const { setInnerSelectedKeys, handleConfirm } = this;
      setInnerSelectedKeys([]);
      handleConfirm();
    },
    onVisibleChange(visible) {
      const { setDropdownVisible, confirmFilter } = this;
      setDropdownVisible(visible);
      if (!visible) {
        confirmFilter();
      }
    },
    renderFilterIcon() {
      const { column, iconClasses } = this;
      let filterIcon = <Icon type="filter" />;
      if (column.filterIcon) {
        filterIcon = isFunction(column.filterIcon)
          ? column.filterIcon(this.$createElement)
          : column.filterIcon;
      }
      return (
        <span class={iconClasses} title="筛选">
          {filterIcon}
        </span>
      );
    },
    renderMenuItem(item) {
      const { isMultiple, innerSelectedKeys } = this;
      const checked = innerSelectedKeys.indexOf(item.value) > -1;
      const input = isMultiple ? <Checkbox checked={checked} /> : <Radio checked={checked} />;
      return (
        <MenuItem name={item.value}>
          {input}
          <span>{item.text}</span>
        </MenuItem>
      );
    },
    renderMenus(filters) {
      const { renderMenus, renderMenuItem } = this;
      return filters.map((v) => {
        const child = v.children;
        if (Array.isArray(child) && child.length > 0) {
          return (
            <SubMenu name={v.value} title={v.text}>
              {renderMenus(child)}
            </SubMenu>
          );
        }
        return renderMenuItem(v);
      });
    },
  },
  render() {
    const {
      column,
      filterIcon,
      filterMenu,
      filterPrefixCls,
      handleConfirm,
      handleClearFilters,
      onVisibleChange,
      dropdownVisible,
      getPopupContainer,
    } = this;
    const filterDropdown = isFunction(column.filterDropdown)
      ? column.filterDropdown(this.$createElement)
      : column.filterDropdown;

    const menus = filterDropdown ? (
      <div>{filterDropdown}</div>
      ) : (
      <div class={`${filterPrefixCls}-dropdown`}>
        {filterMenu}
        <div class={`${filterPrefixCls}-dropdown-btns`}>
          <a class={`${filterPrefixCls}-dropdown-link confirm`} onClick={handleConfirm}>
            确定
          </a>
          <a class={`${filterPrefixCls}-dropdown-link clear`} onClick={handleClearFilters}>
            重置
          </a>
        </div>
      </div>
    );
    const props = {
      trigger: ['click'],
      value: dropdownVisible,
      getPopupContainer,
      closeOnSelect: false,
    };
    const on = {
      'visible-change': onVisibleChange,
    };
    return (
      <Dropdown {...{ props, on }}>
        <template slot="trigger">{filterIcon}</template>
        <template slot="overlay">{menus}</template>
      </Dropdown>
    );
  },
};
