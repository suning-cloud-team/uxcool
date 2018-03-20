<template>
  <div>
    <div class="demo">
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

    <!--vertical -->
    <div class="demo">
      <ux-menu style="width:200px;">
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

    <!--vertical -->
    <div class="demo">
      <ux-menu theme="dark"
               style="width:200px;">
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
  </div>
</template>

<script>
  import '@suning/uxcool/src/components/menu/style/index.scss';
  import { UxMenu, UxMenuItem, UxMenuItemGroup, UxSubMenu } from '@suning/uxcool/src/components/menu';
  // import { UxMenu } from '@suning/uxcool';

  // const { SubMenu: UxSubMenu, MenuItemGroup: UxMenuItemGroup, MenuItem: UxMenuItem } = UxMenu;
  export default {
    components: {
      UxMenu,
      UxSubMenu,
      UxMenuItemGroup,
      UxMenuItem,
    },
  };
</script>
