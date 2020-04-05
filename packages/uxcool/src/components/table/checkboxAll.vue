<template>
  <div :class="classes">
    <checkbox :class="boxClasses"
              :checked="checked"
              :disabled="disabled"
              :indeterminate="indeterminate"
              @change="onChange"
    />
    <dropdown v-if="normalizeSelections.length > 0"
              :theme="theme"
              :get-popup-container="getPopupContainer"
    >
      <div slot="trigger"
           :class="`${boxPrefixCls}-down`"
      >
        <icon type="down" />
      </div>
      <!-- <ux-menu :class="`${boxPrefixCls}-dropdown`"
               slot="overlay"
               :selected-keys="[]">
        <menu-item v-for="(selection, i) in normalizeSelections"
                   :key="i"
                   :name="selection.key||i">
          <div @click="onMenuItemClick(selection)">
            {{ selection.text }}
          </div>
        </menu-item>
      </ux-menu> -->
      <div slot="overlay"
           :class="`${boxPrefixCls}-dropdown`"
      >
        <ux-menu :prefix-cls="`${dropdownPrefixCls}-menu`"
                 :selected-keys="[]"
                 mode="vertical"
        >
          <menu-item v-for="(selection, i) in normalizeSelections"
                     :key="i"
                     :name="selection.key||i"
          >
            <div @click="onMenuItemClick(selection)">
              {{ selection.text }}
            </div>
          </menu-item>
        </ux-menu>
      </div>
    </dropdown>
  </div>
</template>

<script>
  import { buildComponentName } from '../utils';
  import SubMixin from './mixins/sub';
  import Icon from '../icon';
  import Checkbox from '../checkbox';
  import Dropdown from '../dropdown';
  import { UxMenu, UxMenuItem as MenuItem } from '../menu';

  const defaultSelections = [
    {
      key: 'all',
      text: '全选当页',
      isDefault: true,
      onSelect: () => {},
    },
    {
      key: 'invert',
      text: '反选当页',
      isDefault: true,
      onSelect: () => {},
    },
  ];

  export default {
    name: buildComponentName('SelectionCheckboxAll'),
    components: {
      Checkbox,
      Dropdown,
      Icon,
      UxMenu,
      MenuItem,
    },
    mixins: [SubMixin],
    props: {
      dropdownPrefixCls: {
        type: String,
        default: '',
      },
      data: {
        type: Array,
        default() {
          return [];
        },
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      selections: {
        type: [Array, Boolean],
        default: false,
      },
      hideDefaultSelections: {
        type: Boolean,
        default: false,
      },
      getPopupContainer: {
        type: Function,
        default() {},
      },
    },
    computed: {
      boxPrefixCls() {
        return `${this.prefixCls}-selection`;
      },
      classes() {
        const { boxPrefixCls } = this;
        return {
          [boxPrefixCls]: true,
        };
      },
      boxClasses() {
        const { boxPrefixCls, normalizeSelections } = this;
        return {
          [`${boxPrefixCls}-select-all-custom`]: normalizeSelections.length > 0,
        };
      },
      normalizeSelections() {
        const { selections, hideDefaultSelections } = this;
        const dSelections = hideDefaultSelections ? [] : defaultSelections;
        let ret = [];
        if (selections) {
          if (Array.isArray(selections)) {
            ret = [...dSelections, ...selections];
          } else {
            ret = dSelections;
          }
        }
        return ret;
      },
      checked() {
        const { data, selectedRowKeys } = this;
        return data.length > 0 && data.every((v) => selectedRowKeys.indexOf(v.$$_key) > -1);
      },
      indeterminate() {
        const { selectedRowKeys, data } = this;
        const some = data.some((v) => selectedRowKeys.indexOf(v.$$_key) > -1);
        const every = data.every((v) => selectedRowKeys.indexOf(v.$$_key) > -1);
        return !every && some;
      },
    },
    methods: {
      onChange(e) {
        const { checked } = e.target;
        this.$emit('change', checked ? 'all' : 'removeAll');
      },
      onMenuItemClick(selection) {
        const { key, isDefault = false, onSelect } = selection;
        this.$emit('change', key, onSelect, isDefault);
      },
    },
  };
</script>
