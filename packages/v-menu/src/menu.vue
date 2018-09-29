<template>
  <ul :class="classes"
      role="menu">
    <slot />
  </ul>
</template>

<script>
  import { getAllItemSubMenuNames, getItemParentSubMenus } from './utils';
  import menuMixin from './mixins/menu';

  export default {
    name: 'Menu',
    isMenuType: true,
    mixins: [menuMixin],
    data() {
      return {
        activeItem: null,
        selectedItems: [],
        openedSubMenus: [],
        descendants: [],
        ancestorSubMenuNames: [],
      };
    },
    computed: {
      classes() {
        const {
          isRoot, prefixCls, theme, mode, visible
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-root`]: isRoot,
          [`${prefixCls}-${theme}`]: true,
          [`${prefixCls}-${mode}`]: true,
          [`${prefixCls}-hidden`]: !visible,
        };
      },
    },
    watch: {
      openKeys(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$nextTick(() => {
            this.reloadOpenKeys();
          });
        }
      },
      selectedKeys(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$nextTick(() => {
            this.reloadSelectedKeys();
          });
        }
      },
      descendants(nVal) {
        if (nVal) {
          if (this.isRoot) {
            this.init();
          }
        }
      },
    },
    mounted() {
      if (this.isRoot) {
        this.init();
      }
    },
    methods: {
      updateAncestorSubMenuNames() {
        const { selectedItems } = this;
        this.ancestorSubMenuNames = getAllItemSubMenuNames(selectedItems);
      },
      setOpenedSubMenus(subMenus = []) {
        this.openedSubMenus = subMenus;
        this.$emit('open-change', subMenus.map(v => v.eventName));
      },
      init() {
        const {
          descendants,
          openKeys,
          openedSubMenus,
          selectedKeys,
          selectedItems,
          multiple,
          activeKey,
          updateAncestorSubMenuNames,
        } = this;
        const openStrKeys = openKeys.map(v => String(v));
        const selectedStrKeys = selectedKeys.map(v => String(v));
        descendants.forEach((v) => {
          const eventName = String(v.eventName);
          if (openStrKeys.indexOf(eventName) > -1 && openedSubMenus.indexOf(v) === -1) {
            openedSubMenus.push(v);
          }
          if (
            selectedStrKeys.indexOf(eventName) > -1 &&
            selectedItems.indexOf(v) === -1 &&
            (multiple || selectedItems.length === 0)
          ) {
            selectedItems.push(v);
          }
          if (activeKey && eventName === activeKey) {
            this.activeItem = v;
          }
        });
        updateAncestorSubMenuNames();
      },
      addDescendants(item) {
        const { descendants } = this;
        if (descendants.indexOf(item) === -1) {
          descendants.push(item);
        }
      },
      removeDescendants(item) {
        const { descendants } = this;
        const idx = descendants.indexOf(item);
        if (idx > -1) {
          this.descendants.splice(idx, 1);
        }
      },
      reloadOpenKeys() {
        const { descendants, openKeys } = this;
        const openedSubMenus = [];
        const openStrKeys = openKeys.map(v => String(v));
        descendants.forEach((v) => {
          const eventName = String(v.eventName);
          if (openStrKeys.indexOf(eventName) > -1 && openedSubMenus.indexOf(v) === -1) {
            openedSubMenus.push(v);
          }
        });
        this.openedSubMenus = openedSubMenus;
      },
      reloadSelectedKeys() {
        const {
          descendants, selectedKeys, multiple, updateAncestorSubMenuNames
        } = this;
        const selectedItems = [];
        this.selectedItems = selectedItems;
        const selectedStrKeys = selectedKeys.map(v => String(v));
        descendants.forEach((v) => {
          const eventName = String(v.eventName);
          if (
            selectedStrKeys.indexOf(eventName) > -1 &&
            selectedItems.indexOf(v) === -1 &&
            (multiple || selectedItems.length === 0)
          ) {
            selectedItems.push(v);
          }
        });
        updateAncestorSubMenuNames();
      },
      onMenuActive({ item, hover }) {
        this.activeItem = hover ? item : null;
      },
      onMenuItemClick(e) {
        const { mode, setOpenedSubMenus } = this;
        const { item } = e;
        if (this.descendants.indexOf(item) > -1) {
          this.$emit('click', {
            ...e,
            item: {
              ...item.$attrs,
              name: item.name,
              label: item.label,
              disabled: item.disabled,
            },
          });
        }

        if (mode !== 'inline') {
          setOpenedSubMenus([]);
        }
      },
      onSubMenuClick(e) {
        const { uniqueOpened } = this;
        let { openedSubMenus } = this;
        const { open, item } = e;
        if (this.descendants.indexOf(item) > -1) {
          let changed = false;
          const pos = openedSubMenus.indexOf(item);
          if (open) {
            if (pos === -1) {
              // uniqueOpened 只展示当前菜单, 其他菜单收起
              if (uniqueOpened) {
                openedSubMenus = getItemParentSubMenus(item);
              }
              openedSubMenus.push(item);
              changed = true;
            }
          } else if (pos > -1) {
            openedSubMenus.splice(pos, 1);
            changed = true;
          }
          if (changed) {
            this.setOpenedSubMenus(openedSubMenus);
          }
        }
      },
      onMenuItemDeselect(e) {
        const { selectedItems, updateAncestorSubMenuNames } = this;
        const { item } = e;
        const pos = selectedItems.indexOf(item);
        if (pos > -1) {
          selectedItems.splice(pos, 1);
        }
        // 直接将vue instance emit出去, vue-devtools(4.0.1)会报错
        this.$emit('deselect', {
          ...e,
          item: {
            ...item.$attrs,
            name: item.name,
            label: item.label,
            disabled: item.disabled,
          },
          selectedKeys: selectedItems.map(v => v.eventName),
        });

        updateAncestorSubMenuNames();
      },
      onMenuItemSelect(e) {
        const { multiple, updateAncestorSubMenuNames } = this;
        let { selectedItems } = this;
        const { item } = e;
        const pos = selectedItems.indexOf(item);

        if (pos === -1) {
          if (multiple) {
            selectedItems = [...selectedItems, item];
          } else {
            selectedItems = [item];
          }
        }

        this.selectedItems = selectedItems;
        this.$emit('select', {
          ...e,
          item: {
            ...item.$attrs,
            name: item.name,
            label: item.label,
            disabled: item.disabled,
          },
          selectedKeys: selectedItems.map(v => v.eventName),
        });

        updateAncestorSubMenuNames();
      },
    },
  };
</script>
