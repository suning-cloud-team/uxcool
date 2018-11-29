<template>
  <div>
    <div class="demo">
      <h4>horizontal</h4>
      <ux-menu mode="horizontal"
               theme="dark">
        <ux-menu-item name="item-1">
          item-1
        </ux-menu-item>
        <ux-menu-item name="item-2">
          item-2
        </ux-menu-item>
        <ux-sub-menu name="sub-menu-1"
                     title="sub-menu-1">
          <template slot="title">
            this is slot title
          </template>
          <ux-menu-item name="sub-menu-1-1">sub-menu-1-1</ux-menu-item>
          <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-2"
                     title="sub-menu-2">
          <ux-menu-item disabled
                        name="sub-menu-2-1">sub-menu-1-1</ux-menu-item>
          <ux-sub-menu title="sub-menu-2-2"
                       name="sub-menu-2-2">
            <ux-menu-item name="sub-menu-2-2-1">sub-menu-1-1</ux-menu-item>
            <ux-menu-item name="sub-menu-2-2-2">sub-menu-1-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-3"
                     title="sub-menu-3">
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-1-1">sub-menu-3-1-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-2-1">sub-menu-3-2-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item name="sub-menu-3-3"
                        title="sub-menu-3-3">
            sub-menu-3-3
          </ux-menu-item>
          <ux-sub-menu name="sub-menu-3-4"
                       title="sub-menu-3-4">
            <ux-menu-item name="sub-menu-3-4-1">sub-menu-3-4-1</ux-menu-item>
            <ux-menu-item name="sub-menu-3-4-2">sub-menu-3-4-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
      </ux-menu>
    </div>

    <h4>event</h4>
    <div class="demo">
      <ux-menu style="width:200px;"
               has-title-attr
               @click="onMenuClick"
               @select="onMenuSelect"
               @deselect="onMenuDeselect">
        <ux-menu-item name="item-1">
          item-1
        </ux-menu-item>
        <ux-menu-item name="item-2">
          item-2
        </ux-menu-item>
        <ux-sub-menu name="sub-menu-1"
                     title="sub-menu-1">
          <ux-menu-item name="sub-menu-1-1"
                        data-a="1">sub-menu-1-21</ux-menu-item>
          <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-2"
                     title="sub-menu-2">
          <ux-menu-item disabled
                        name="sub-menu-2-1">sub-menu-1-1</ux-menu-item>
          <ux-sub-menu title="sub-menu-2-2"
                       name="sub-menu-2-2">
            <ux-menu-item name="sub-menu-2-2-1">sub-menu-1-1</ux-menu-item>
            <ux-menu-item name="sub-menu-2-2-2">sub-menu-1-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-3"
                     title="sub-menu-3">
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-1-1">sub-menu-3-1-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-2-1">sub-menu-3-2-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item name="sub-menu-3-3"
                        title="sub-menu-3-3">
            sub-menu-3-3
          </ux-menu-item>
          <ux-sub-menu name="sub-menu-3-4"
                       title="sub-menu-3-4">
            <ux-menu-item name="sub-menu-3-4-1">sub-menu-3-4-1</ux-menu-item>
            <ux-menu-item name="sub-menu-3-4-2">sub-menu-3-4-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
      </ux-menu>
    </div>

    <h4>open keys</h4>
    <div class="demo">
      <ux-menu :open-keys="openKeys"
               theme="dark"
               style="width:200px;"
               @open-change="onOpenChange">
        <ux-menu-item name="item-1">
          item-1
        </ux-menu-item>
        <ux-menu-item name="item-2">
          item-2
        </ux-menu-item>
        <ux-sub-menu name="sub-menu-1"
                     title="sub-menu-1">
          <ux-menu-item name="sub-menu-1-1">sub-menu-1-1</ux-menu-item>
          <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-2"
                     title="sub-menu-2">
          <ux-menu-item disabled
                        name="sub-menu-2-1">sub-menu-1-1</ux-menu-item>
          <ux-sub-menu title="sub-menu-2-2"
                       name="sub-menu-2-2">
            <ux-menu-item name="sub-menu-2-2-1">sub-menu-1-1</ux-menu-item>
            <ux-menu-item name="sub-menu-2-2-2">sub-menu-1-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
        <ux-sub-menu name="sub-menu-3"
                     title="sub-menu-3">
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-1-1">sub-menu-3-1-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item-group title="测试-group">
            <ux-menu-item name="sub-menu-3-2-1">sub-menu-3-2-1</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item name="sub-menu-3-3"
                        title="sub-menu-3-3">
            sub-menu-3-3
          </ux-menu-item>
          <ux-sub-menu name="sub-menu-3-4"
                       title="sub-menu-3-4">
            <ux-menu-item name="sub-menu-3-4-1">sub-menu-3-4-1</ux-menu-item>
            <ux-menu-item name="sub-menu-3-4-2">sub-menu-3-4-2</ux-menu-item>
          </ux-sub-menu>
        </ux-sub-menu>
      </ux-menu>
    </div>
    <selected-demo />
    <collapsed-demo />
    <unique-demo />
  </div>
</template>

<script>
  import { UxMenu } from '@suning/uxcool';
  import SelectedDemo from './selected.vue';
  import CollapsedDemo from './collapsed.vue';
  import UniqueDemo from './unique.vue';

  const { SubMenu: UxSubMenu, MenuItemGroup: UxMenuItemGroup, MenuItem: UxMenuItem } = UxMenu;
  export default {
    components: {
      UxMenu,
      UxSubMenu,
      UxMenuItemGroup,
      UxMenuItem,
      SelectedDemo,
      CollapsedDemo,
      UniqueDemo,
    },
    data() {
      return {
        openKeys: ['sub-menu-2'],
      };
    },
    created() {
      setTimeout(() => {
        this.openKeys = ['sub-menu-3'];
      }, 1500);
    },
    methods: {
      onMenuClick(...args) {
        console.log('onMenuClick', ...args);
      },
      onMenuSelect(...args) {
        console.log('onMenuSelect', ...args);
      },
      onMenuDeselect(...args) {
        console.log('onMenuDeselect', ...args);
      },
      onOpenChange(...args) {
        console.log('onOpenChange', ...args);
      },
    },
  };
</script>
