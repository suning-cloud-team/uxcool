<template>
  <div class="container  clearfix"
       :style="style">
    <ul class="routes">
      <li v-for="(route,i) in routes"
          :key="i">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
    </ul>
    <ux-button @click="changeTheme">theme: {{ theme }}</ux-button>
    <router-view style="margin-left:200px;overflow:hidden" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Button } from '@suning/uxcool';
  import '@suning/uxcool/src/components/style/index.scss';
  import './index.scss';

  export default {
    components: {
      UxButton: Button,
    },
    props: {
      routes: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    computed: {
      ...mapState(['theme']),
      style() {
        const { theme } = this;

        const style = {};
        if (theme === 'dark') {
          style.background = '#1f344f';
        }
        return style;
      },
    },
    methods: {
      changeTheme() {
        const { theme } = this;
        this.$store.commit('changeTheme', theme === 'light' ? 'dark' : 'light');
      },
    },
  };
</script>

<style lang="scss" scoped>
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
    }
    &.routes {
      float: left;
      margin-bottom: 20px;
    }
  }

  .container {
    padding: 20px;
    // background: #222;
  }
</style>
