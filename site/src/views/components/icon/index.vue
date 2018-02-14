<template>
  <div class="doc icon-wrap">
    <h1 class="ux-heading">Icon
      <span class="subtitle">图标</span>
    </h1>
    <h2 class="ux-heading">
      如何使用
    </h2>
    <ux-code>
      {{code}}
    </ux-code>
    <h2 class="ux-heading">图标列表</h2>

    <ux-row>
      <ux-col :lg="4"
              :md="6"
              :sm="8"
              v-for="(icon, i) in list"
              :key="i">
        <div class="icon-item">
          <ux-icon :type="icon.name"></ux-icon>
          <div class="icon-item-name">{{icon.name}}</div>
          <div class="icon-item-code">{{icon.font}}</div>
        </div>
      </ux-col>
    </ux-row>
  </div>
</template>

<script>
  import list from './icon';

  export default {
    data() {
      return {
        list,
        code: '<ux-icon type="down"></ux-icon>',
      };
    },
  };
</script>

<style lang="scss" scoped>
  .icon-item {
    padding: 20px;
    text-align: center;

    i {
      margin-bottom: 10px;
      font-size: 30px;
    }

    &-name {
      margin-bottom: 10px;
      font-size: 16px;
    }

    &-code {
      font-size: 12px;
    }
  }
</style>

