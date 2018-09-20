<template>
  <div class="app-main">
    <slot></slot>
    <div class="footer-nav">
      <router-link tabindex="-1"
                   :class="linkClasses(i)"
                   v-if="nav"
                   v-for="(nav,i) in footerNavs"
                   :key="i"
                   :to="{name: nav.name}">
        <template v-if="i===0">
          <ux-icon type="arrow_left"></ux-icon>{{ nav.title }}
        </template>
        <template v-else>
          {{ nav.title }}
          <ux-icon type="arrow_right"></ux-icon>
        </template>

      </router-link>
    </div>

    <input id="pagename"
           v-model="pageName"
           type="hidden">
    <input id="resourceType"
           type="hidden"
           value="uxcoolVue">
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex';

  export default {
    computed: { ...mapState(['pageName']), ...mapGetters(['footerNavs']) },
    methods: {
      linkClasses(i) {
        return {
          previous: i === 0,
          next: i === 1,
        };
      },
    },
  };
</script>

<style lang="scss">
  .footer-nav {
    background: #f8f8f8;
  }
</style>
