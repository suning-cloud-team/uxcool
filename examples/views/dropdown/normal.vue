<template>
  <div class="demo">
    <h4>normal</h4>
    <div class="demo">
      <ux-dropdown>
        <a slot="trigger">hover me
          <ux-icon type="down" />
        </a>
        <ux-menu ref="menuRef"
                 slot="overlay">
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试3
          </ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试4
          </ux-menu-item>
          <ux-sub-menu name="sub-menu-1"
                       title="sub-menu-1">
            <!-- <template slot="title">
              <ux-icon type="box" />
              <span>this is slot title</span>
            </template> -->
            <ux-menu-item name="sub-menu-1-1">sub-menu-1-1</ux-menu-item>
            <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
          </ux-sub-menu>
        </ux-menu>
      </ux-dropdown>
    </div>
  </div>
</template>
<script>
  import { Icon, Dropdown, Menu, Button } from '@suning/uxcool';

  export default {
    components: {
      UxIcon: Icon,
      UxDropdown: Dropdown,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
      UxSubMenu: Menu.SubMenu,
      UxButton: Button,
    },
    data() {
      return {
        c: { abc: true },
        d: 'ccc',
        visible: false,
      };
    },
    created() {},
    methods: {
      getContainer() {
        return this.$refs.containerRef;
      },
    },
  };
</script>
