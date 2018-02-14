<template>
  <aside class="ux-layout-sidebar-wrapper">
    <nav class="ux-layout-sidebar">
      <ux-menu @click="onMenuClick"
               :inline-indent="40"
               :theme="theme"
               :selected-keys="activeKeys">
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

<style lang="scss">
.ux-layout-sidebar .ux-menu {
  margin-bottom: 30px;
  border-right: 0;
}
</style>


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
