<template>
  <!--vertical -->
  <div class="demo">
    <ux-menu :selected-keys="selectedKeys"
             :open-keys="openKeys"
             theme="dark"
             style="width:200px;">
      <template v-for="item in menus">
        <ux-menu-item v-if="!item.children"
                      :key="item.name"
                      :name="item.name">
          {{ item.label }}
        </ux-menu-item>
        <ux-sub-menu v-else
                     :title="item.label"
                     :key="item.name"
                     :name="item.name">
          <ux-menu-item v-for="children in item.children"
                        :key="children.name"
                        :name="children.name">
            {{ children.label }}
          </ux-menu-item>
        </ux-sub-menu>
      </template>
    </ux-menu>
  </div>

</template>


<script>
  import { Menu } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxMenu: Menu,
      UxSubMenu: Menu.SubMenu,
      UxMenuItem: Menu.MenuItem,
      UxMenuItemGroup: Menu.MenuItemGroup,
    },
    data() {
      return {
        selectedKeys: ['a-1-1'],
        openKeys: ['a-1'],
        menus: [
          {
            name: 'a-1',
            label: 'l-a-1',
            children: [
              {
                name: 'a-1-1',
                label: 'l-a-1-1',
              },
              {
                name: 'a-1-2',
                label: 'l-a-1-2',
              },
            ],
          },
          { name: 'b-1', label: 'l-b-1' },
          { name: 'c-1', label: 'l-c-1' },
        ],
      };
    },
    created() {
      setTimeout(() => {
        this.selectedKeys = ['n-a-1-2'];
        this.menus = [
          {
            name: 'a-1',
            label: 'l-n-a-1',
            children: [
              {
                name: 'n-a-1-1',
                label: 'l-n-a-1-1',
              },
              {
                name: 'n-a-1-2',
                label: 'l-n-a-1-2',
              },
            ],
          },
          { name: 'n-b-1', label: 'l-n-b-1' },
          { name: 'n-c-1', label: 'l-n-c-1' },
        ];
      }, 2500);
    },
  };
</script>
