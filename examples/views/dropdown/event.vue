<template>
  <div class="demo">
    <h4>disable</h4>
    <div class="demo">
      <ux-dropdown @overlay-click="onClick">
        <a slot="trigger">hover me and click overlay item
          <ux-icon type="down" />
        </a>
        <ux-menu slot="overlay">
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4"
                        disabled>
            测试3
          </ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试4
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
    </div>
  </div>
</template>
<script>
  import { Icon, Dropdown, Menu, Button, Message } from '@suning/uxcool';

  export default {
    components: {
      UxIcon: Icon,
      UxDropdown: Dropdown,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
      UxButton: Button,
    },
    methods: {
      onClick({ item }) {
        Message.info(item.name);
      },
    },
  };
</script>
