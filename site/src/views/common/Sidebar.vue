<template>
  <aside class="ux-layout-sidebar-wrapper"
         style="width: 230px;">
    <nav class="ux-layout-sidebar">
      <ux-menu @click="onMenuClick"
               :inline-indent="40"
               :theme="theme"
               :selected-keys="activeKeys"
               class="sidebar-menu">
        <template v-for="item in menuData">
          <ux-menu-item-group v-if="item.children"
                              :title="item.group">
            <ux-menu-item v-for="subItem in item.children"
                          :name="subItem.name"
                          :key="subItem.name">{{subItem.title}}</ux-menu-item>
          </ux-menu-item-group>
          <ux-menu-item :name="item.name"
                        v-else>{{item.title}}</ux-menu-item>
        </template>
      </ux-menu>
    </nav>
  </aside>
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
