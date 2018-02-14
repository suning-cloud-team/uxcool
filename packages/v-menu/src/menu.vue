<template>
  <ul role="menu"
      :class="classes">
    <slot></slot>
  </ul>
</template>

<script>
  import menuMixin from './mixins/menu';

  export default {
    name: 'Menu',
    mixins: [menuMixin],
    data() {
      return {
        activeItem: null,
        selectedItems: [],
        openedSubMenus: [],
        descendants: new Set(),
      };
    },
    mounted() {
      if (this.isRoot) {
        this.init();
      }
    },
    computed: {
      classes() {
        const {
          isRoot, prefixCls, theme, mode, visible
        } = this;
        return {
          [prefixCls]: true,
          [`${prefixCls}-root`]: isRoot,
          [`${prefixCls}-${theme}`]: isRoot,
          [`${prefixCls}-${mode}`]: true,
          [`${prefixCls}-hidden`]: !visible,
        };
      },
    },
    methods: {
      init() {
        const {
          descendants,
          openKeys,
          openedSubMenus,
          selectedKeys,
          selectedItems,
          multiple,
          activeKey,
        } = this;
        const openStrKeys = openKeys.map(v => String(v));
        const selectedStrKeys = selectedKeys.map(v => String(v));
        descendants.forEach((v) => {
          if (openStrKeys.indexOf(v.eventName) > -1) {
            openedSubMenus.push(v);
          }
          if (selectedStrKeys.indexOf(v.eventName) > -1 && (multiple || selectedItems.length === 0)) {
            selectedItems.push(v);
          }
          if (activeKey && v.eventName === activeKey) {
            this.activeItem = v;
          }
        });
      },
      addDescendants(item) {
        this.descendants.add(item);
      },
      removeDescendants(item) {
        this.descendants.delete(item);
      },
      reloadOpenKeys() {
        const { descendants, openKeys, openedSubMenus } = this;
        const openStrKeys = openKeys.map(v => String(v));
        descendants.forEach((v) => {
          if (openStrKeys.indexOf(v.eventName) > -1 && openedSubMenus.indexOf(v) === -1) {
            openedSubMenus.push(v);
          }
        });
      },
      reloadSelectedKeys() {
        const { descendants, selectedKeys, multiple } = this;
        const selectedItems = [];
        this.selectedItems = selectedItems;
        const selectedStrKeys = selectedKeys.map(v => String(v));
        descendants.forEach((v) => {
          if (selectedStrKeys.indexOf(v.eventName) > -1 && (multiple || selectedItems.length === 0)) {
            selectedItems.push(v);
          }
        });
      },
      onMenuActive({ item, hover }) {
        this.activeItem = hover ? item : null;
      },
      onMenuItemClick(e) {
        const { item } = e;
        if (this.descendants.has(item)) {
          this.$emit('click', {
            ...e,
            item: {
              name: item.name,
              label: item.label,
              disabled: item.disabled,
            },
          });
        }
      },
      onSubMenuClick(e) {
        const { uniqueOpened } = this;
        let { openedSubMenus } = this;
        const { open, item } = e;
        if (this.descendants.has(item)) {
          let changed = false;
          const pos = openedSubMenus.indexOf(item);
          if (open) {
            if (pos === -1) {
              // uniqueOpened 只展示当前菜单, 其他菜单收起
              if (uniqueOpened) {
                const { rootSubMenu } = item;
                const { descendants: rootSubMenuDescendants } = rootSubMenu;
                openedSubMenus = openedSubMenus.filter(v => v === rootSubMenu || rootSubMenuDescendants.has(v));
              }
              openedSubMenus.push(item);
              changed = true;
            }
          } else if (pos > -1) {
            openedSubMenus.splice(pos, 1);
            changed = true;
          }
          if (changed) {
            this.openedSubMenus = openedSubMenus;
            this.$emit('open-change', openedSubMenus.map(v => v.eventName));
          }
        }
      },
      onMenuItemDeselect(e) {
        const { selectedItems } = this;
        const { item } = e;
        const pos = selectedItems.indexOf(item);
        if (pos > -1) {
          selectedItems.splice(pos, 1);
        }
        // 直接将vue instance emit出去, vue-devtools(4.0.1)会报错
        this.$emit('deselect', {
          ...e,
          item: {
            name: item.name,
            label: item.label,
            disabled: item.disabled,
          },
          selectedKeys: selectedItems.map(v => v.eventName),
        });
      },
      onMenuItemSelect(e) {
        const { multiple } = this;
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
            name: item.name,
            label: item.label,
            disabled: item.disabled,
          },
          selectedKeys: selectedItems.map(v => v.eventName),
        });
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
    },
  };
</script>
