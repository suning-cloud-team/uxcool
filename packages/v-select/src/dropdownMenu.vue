<script>
  import scrollIntoViewIfNeed from 'scroll-into-view-if-needed';
  import VMenu, { VMenuItem, VMenuItemGroup } from '@suning/v-menu';
  import { CMP_TYPE_ENUM } from './constants';
  import { logFactory } from './utils';

  const log = logFactory('select:dropdownMenu');
  export default {
    name: 'DropdownMenu',
    props: {
      prefixCls: String,
      rootUid: Number,
      descendants: Array,
      value: Array,
      multiple: Boolean,
      showSearch: Boolean,
      theme: String,
    },
    computed: {
      menuTree() {
        return this.createMenuTree();
      },
    },
    render(h) {
      const {
        theme,
        showSearch,
        menuTree,
        prefixCls,
        value,
        multiple,
        onMenuSelect,
        onMenuDeselect,
      } = this;
      function recursive(tree) {
        const elements = [];
        for (let i = 0, len = tree.length; i < len; i += 1) {
          const item = tree[i];
          let element = null;
          const { props } = item;
          if (item.type === CMP_TYPE_ENUM.GROUP) {
            // search 时 无子元素的组 不显示
            if (!showSearch || (showSearch && item.childrens.length > 0)) {
              element = h(
                'v-menu-item-group',
                {
                  props: {
                    title: props.label,
                  },
                },
                recursive(item.childrens)
              );
            }
          } else if (item.type === CMP_TYPE_ENUM.OPTION) {
            element = h(
              'v-menu-item',
              {
                ref: 'menuItemRefs',
                refInFor: true,
                style: {
                  'user-select': 'none',
                },
                props: {
                  name: String(props.value),
                  label: String(props.label),
                  disabled: props.disabled,
                },
                attrs: {
                  unselectable: 'unselectable',
                  tabindex: '-1',
                },
              },
              [item.props.content]
            );
          }
          if (element) {
            elements.push(element);
          }
        }
        return elements;
      }

      const menuAttrs = {
        props: {
          prefixCls: `${prefixCls}-menu`,
          selectedKeys: value.map(v => v.value),
          multiple,
          theme,
          mode: 'vertical',
        },
      };
      if (multiple) {
        menuAttrs.on = {
          select: onMenuSelect,
          deselect: onMenuDeselect,
        };
      } else {
        menuAttrs.on = {
          click: onMenuSelect,
        };
      }

      const menu = h('v-menu', menuAttrs, recursive(menuTree));

      return h('div', { ref: 'menuWrapRef' }, [menu]);
    },
    mounted() {
      this.scrollIntoView('mounted');
    },
    updated() {
      this.$nextTick(() => {
        this.scrollIntoView('updated');
      });
    },
    methods: {
      scrollIntoView(from) {
        const { $refs, value } = this;
        const { menuWrapRef, menuItemRefs } = $refs;
        log('from=%o', from);
        log('value=%o', value);
        log('menuWrapRef %o', menuWrapRef);
        log('menuItemRef %o', menuItemRefs);

        if (!value || !value.length) {
          return;
        }
        let val = value[0];
        if (from === 'updated') {
          val = value[value.length - 1];
        }
        const activeElement = menuItemRefs.filter(v => v.isSelected && val.value === v.name)[0];
        if (activeElement) {
          scrollIntoViewIfNeed(activeElement.$el, {
            boundary: menuWrapRef.$el || menuWrapRef,
            centerIfNeeded: true,
          });
        }
      },
      onMenuSelect({ item }) {
        log('onMenuSelect %o ', {
          title: item.label,
          label: item.label,
          value: item.name,
          disabled: item.disabled,
        });
        this.$emit('menu-select', {
          title: item.label,
          label: item.label,
          value: item.name,
          disabled: item.disabled,
        });
      },
      onMenuDeselect({ item }) {
        this.$emit('menu-deselect', {
          title: item.label,
          label: item.label,
          value: item.name,
          disabled: item.disabled,
        });
      },
      createContainer(parent) {
        const { UUID } = parent;
        return {
          type: this.rootUid === UUID ? CMP_TYPE_ENUM.ROOT : CMP_TYPE_ENUM.GROUP,
          self: parent,
          props: {
            label: parent.label,
          },
          childrens: [],
        };
      },
      createMenuTree() {
        const { descendants: descs, rootUid, createContainer } = this;
        const map = new Map();
        for (let i = 0, len = descs.length; i < len; i += 1) {
          const item = descs[i];
          const { parent, UUID } = item;
          const { UUID: pUUID } = parent;
          let contain = null;
          if (map.has(pUUID)) {
            contain = map.get(pUUID);
          } else {
            contain = createContainer(parent);
            map.set(pUUID, contain);
          }
          let current = null;
          // option
          if (item.type === CMP_TYPE_ENUM.OPTION) {
            const { vm } = item;
            const slotDefault = vm.$slots.default;
            current = {
              type: item.type,
              self: item,
              props: {
                content: slotDefault || vm.label || vm.value,
                label: vm.label || vm.value,
                value: vm.value,
                disabled: vm.disabled,
              },
            };
          } else if (item.type === CMP_TYPE_ENUM.GROUP) {
            // group 要与父级关联
            if (map.has(UUID)) {
              current = map.get(UUID);
            } else {
              current = createContainer(item.vm);
              map.set(UUID, current);
            }
          }
          contain.childrens.push(current);
        }
        return map.get(rootUid).childrens;
      },
    },
    components: {
      VMenu,
      VMenuItemGroup,
      VMenuItem,
    },
  };
</script>
