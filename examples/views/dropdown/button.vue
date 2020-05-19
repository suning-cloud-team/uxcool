<template>
  <div class="demo">
    <h4>button</h4>
    <div ref="containerRef"
         class="demo">
      <ux-button @click="changeVisible">change visible</ux-button>
      <br>
      <br>
      <h4>control</h4>
      <ux-dropdown-button v-model="visible"
                          :get-popup-container="getContainer"
                          trigger="none">
        dropdown button
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试3
          </ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试4
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown-button>

      <h4> close-on-select="false"</h4>
      <ux-dropdown-button :get-popup-container="getContainer"
                          :close-on-select="false">
        dropdown button
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试3
          </ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试4
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown-button>
    </div>
  </div>
</template>
<script>
  import { Icon, Dropdown, Menu, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxIcon: Icon,
      UxDropdown: Dropdown,
      uxDropdownButton: Dropdown.Button,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
      UxButton: Button,
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      changeVisible() {
        this.visible = !this.visible;
      },
      getContainer() {
        return this.$refs.containerRef;
      },
    },
  };
</script>
