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
    isMultiple() {
      const { column } = this;
      return 'filterMultiple' in column ? column.filterMultiple : true;
    },
    filterIcon() {
      return this.renderFilterIcon();
    },
    filterMenu() {
      const {
        dropdownPrefixCls,
        isMultiple,
        column: { filters = [] },
        renderMenus,
        innerSelectedKeys,
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
        select(...args) {
          console.log(...args);
        },
        deselect(...args) {
          console.log(...args);
        },
      };
      return <Menu {...{ props, on }}>{renderMenus(filters)}</Menu>;
    },
  },
  watch: {
    selectedKeys(nVal) {
      if (nVal) {
        this.setInnerSelectedKeys(nVal);
      }
    },
  },
  created() {
    this.setInnerSelectedKeys(this.selectedKeys);
  },
  methods: {
    setInnerSelectedKeys(keys) {
      this.innerSelectedKeys = keys;
    },
    handleConfirm() {},
    handleClearFilters() {},
    onVisibleChange() {},
    renderFilterIcon() {
      const { filterPrefixCls, selectedKeys } = this;
      return (
        <Icon
          type="filter"
          title="筛选"
          class={{ [`${filterPrefixCls}-selected`]: selectedKeys.length > 0 }}
        />
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
      filterIcon,
      filterMenu,
      filterPrefixCls,
      handleConfirm,
      handleClearFilters,
      onVisibleChange,
      dropdownVisible,
      getPopupContainer,
    } = this;
    const menus = (
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
      visible: dropdownVisible,
      getPopupContainer,
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
