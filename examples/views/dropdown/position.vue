<template>
  <div class="demo">
    <h4>normal</h4>
    <div class="demo">
      <ux-dropdown placement="topLeft">
        <ux-button slot="trigger">
          topLeft
        </ux-button>
        <ux-menu slot="overlay">
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="topCenter">
        <ux-button slot="trigger">
          topCenter
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="topRight">
        <ux-button slot="trigger">
          topRight
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="bottomLeft">
        <ux-button slot="trigger">
          bottomLeft
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="bottomCenter">
        <ux-button slot="trigger">
          bottomCenter
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
      <ux-dropdown placement="bottomRight">
        <ux-button slot="trigger">
          bottomRight
        </ux-button>
        <ux-menu slot="overlay"
                 multiple>
          <ux-menu-item v-for="(v,i) in menus"
                        :key="i"
                        :name="v.name">
            {{ v.label }}
          </ux-menu-item>
        </ux-menu>
      </ux-dropdown>
    </div>
  </div>
</template>
<script>
  import { Icon, Dropdown, Menu, Button } from '@suning/uxcool';

  function mock(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({ name: `sub-menu-item-${i}`, label: `测试${i}-${i}-测试${i}-${i}` }));
  }
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
        menus: mock(5),
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

<style scoped>
  .demo .ux-btn {
    margin-left: 10px;
  }
</style>
