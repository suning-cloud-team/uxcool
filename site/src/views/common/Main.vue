<template>
  <main class="ux-layout-main-wrapper">
    <slot name="header"></slot>
    <div class="ux-layout-main">
      <slot></slot>
      <div class="ux-layout-footer-nav">
        <router-link tabindex="-1"
                     :class="linkClasses(i)"
                     v-if="nav"
                     v-for="(nav,i) in footerNavs"
                     :key="i"
                     :to="{name: nav.name}">
          <template v-if="i===0">
            <ux-icon type="arrow_left"></ux-icon>{{nav.title}}
          </template>
          <template v-else>
            {{nav.title}}
            <ux-icon type="arrow_right"></ux-icon>
          </template>

        </router-link>
      </div>
    </div>
  </main>
</template>
<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['footerNavs']),
    methods: {
      linkClasses(i) {
        return {
          left: i === 0,
          right: i === 1,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  .ux-layout-footer-nav {
    padding: 20px;
    text-align: right;
    overflow: hidden;
    .left,
    .right {
      &:focus {
        text-decoration: none;
      }
    }
    .left {
      // float: left;
      .fu {
        margin-right: 8px;
      }
    }

    .right {
      // float: right;
      margin-left: 30px;
      .fu {
        margin-left: 8px;
      }
    }
  }
</style>
