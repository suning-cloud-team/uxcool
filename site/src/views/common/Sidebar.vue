<template>
  <nav class="app-sidebar">
    <ux-menu :inline-indent="40"
             :theme="theme"
             :selected-keys="activeKeys"
             class="sidebar-menu"
             @click="onMenuClick">
      <template v-for="item in menuData">
        <ux-menu-item-group v-if="item.children"
                            :title="item.group"
                            :key="item.group">
          <ux-menu-item v-for="subItem in item.children"
                        :name="subItem.name"
                        :key="subItem.name">{{ subItem.title }}
            <sup v-if="subItem.deprecated"
                 class="deprecated">Deprecated</sup>
          </ux-menu-item>
        </ux-menu-item-group>
        <ux-menu-item v-else
                      :name="item.name"
                      :key="item.name">{{ item.title }}
          <sup v-if="item.deprecated"
               class="deprecated">Deprecated</sup>
        </ux-menu-item>
      </template>
    </ux-menu>
  </nav>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      theme() {
        return this.$store.state.theme;
      },
      ...mapGetters(['menuData', 'selectedRouteName']),
      activeKeys() {
        return [this.selectedRouteName];
      },
    },
    methods: {
      onMenuClick({ name }) {
        this.$router.push({ name });
      },
    },
  };
</script>

<style lang="scss">
  .app-sidebar {
    height: 100%;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;

    .deprecated {
      margin-left: 10px;
      color: #999;
    }
  }
</style>
