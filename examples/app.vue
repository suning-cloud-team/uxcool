<template>
  <div class="container">
    <ul class="routes">
      <li v-for="(route,i) in routes"
          :key="i">
        <router-link :to="route.path">{{route.name}}</router-link>
      </li>
    </ul>
    {{ amd }}
    <router-view/>
  </div>
</template>

<script>
  import '@suning/uxcool/src/components/style/index.scss';
  import './index.scss';
  import amd from './a.md';

  export default {
    name: 'App',
    props: {
      routes: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        amd,
      };
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
      margin-bottom: 20px;
    }
  }

  .container {
    padding: 20px;
    // background: #222;
  }
</style>
