<template>
  <div class="container">
    <ul class="routes">
      <li v-for="(route,i) in routes"
          :key="i">
        <router-link :to="route.path">{{route.name}}</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import '@suning/uxcool/src/components/style/index.scss';
  import './index.scss';

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
