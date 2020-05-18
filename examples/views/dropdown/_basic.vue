<template>
  <div>
    <div class="demo">
      <ux-dropdown visible>
        <input slot="trigger"
               :style="style"
               dd="a">
        <div slot="overlay">abc</div>
      </ux-dropdown>

    </div>
    <div class="demo">
      {{isShow}}
      <ux-dropdown trigger="click">
        <ux-icon slot="trigger"
                 type="filter">trigger</ux-icon>
        <template slot-scope="props"
                  slot="scope">
          <span>a</span>
        </template>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item name="sub-menu-item-3-1">sub-menu-item-1</ux-menu-item>
          <ux-menu-item name="sub-menu-item-3-2">sub-menu-item-2</ux-menu-item>
          <ux-menu-item name="sub-menu-item-4">
            测试3
          </ux-menu-item>
          <ux-menu-item v-if="isShow"
                        name="sub-menu-item-4">
            测试4
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
    </div>
    <container-demo />
    <button-demo />
  </div>
</template>
<script>
  import { Icon, Dropdown, Menu, Button } from '@cloud-sn/uxcool';
  import ContainerDemo from './container.vue';
  import ButtonDemo from './button.vue';

  export default {
    components: {
      UxIcon: Icon,
      UxDropdown: Dropdown,
      UxMenuItem: Menu.MenuItem,
      UxMenu: Menu,
      UxButton: Button,
      ContainerDemo,
      ButtonDemo,
    },
    data() {
      return {
        c: { abc: true },
        style: {
          width: '150px',
        },
        visible: false,
        isShow: true,
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = false;
        this.style = {
          width: '200px',
        };
      }, 3500);
    },
    methods: {
      onMenuClick(e) {
        console.log('onMenuClick', e);
      },
      changeVisible() {
        this.visible = !this.visible;
      },
    },
  };
</script>
