<template>
  <div class="demo"
       style="width: 400px">
    <h4>Collapsed</h4>
    <ux-button icon="menu_fold"
               @click="onClick" /> collapsed: {{ collapsed }}
    <ux-menu :inline-collapsed="collapsed"
             :open-keys="openKeys"
             theme="dark">
      <ux-menu-item name="item-1">
        <ux-icon type="account" />
        <span>item-1 <strong>abc</strong></span>
      </ux-menu-item>
      <ux-menu-item name="item-2">
        <ux-icon type="sixangle_three" />
        <span>item-2</span>
      </ux-menu-item>
      <ux-sub-menu name="sub-menu-1"
                   title="sub-menu-1">
        <template slot="title">
          <ux-icon type="box" />
          <span>this is slot title</span>
        </template>
        <ux-menu-item name="sub-menu-1-1">sub-menu-1-1</ux-menu-item>
        <ux-menu-item name="sub-menu-1-2">sub-menu-1-2</ux-menu-item>
      </ux-sub-menu>
      <ux-sub-menu name="sub-menu-2"
                   title="sub-menu-2">
        <template slot="title">
          <ux-icon type="safty" />
          <span>sub-menu-2</span>
        </template>
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
        <template slot="title">
          <ux-icon type="bells" />
          <span>sub-menu-3</span>
        </template>
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
          <ux-menu-item name="sub-menu-3-4-3">sub-menu-3-4-3</ux-menu-item>
        </ux-sub-menu>
      </ux-sub-menu>
    </ux-menu>
  </div>
</template>


<script>
  import { Menu, Button, Icon } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMenu: Menu,
      UxMenuItem: Menu.Item,
      UxSubMenu: Menu.SubMenu,
      UxMenuItemGroup: Menu.ItemGroup,
      UxButton: Button,
      UxIcon: Icon,
    },
    data() {
      return {
        collapsed: true,
        openKeys: ['sub-menu-3'],
      };
    },
    created() {
      setTimeout(() => {
        this.openKeys = ['sub-menu-2'];
      }, 5500);
    },
    methods: {
      onClick() {
        this.collapsed = !this.collapsed;
      },
    },
  };
</script>
