<template>
  <div class="demo">
    <h4>disable</h4>
    <div class="demo">
      <ux-dropdown disabled>
        <a slot="trigger">hover me
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
  import { Icon, Dropdown, Menu, Button } from '@suning/uxcool';

  export default {
    components: {
      UxIcon: Icon,
      UxDropdown: Dropdown,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
      UxButton: Button,
    },
    data() {
      return {
        c: { abc: true },
        d: 'ccc',
        visible: false,
      };
    },
    methods: {
      getContainer() {
        return this.$refs.containerRef;
      },
    },
  };
</script>
