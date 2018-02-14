<template>
  <div class="icon-wrap">
    <div class="icon-item"
         v-for="(icon,i) in list"
         :key="i">
      <ux-icon :type="icon.name"
               :key="i"></ux-icon>
      <div class="icon-item-name">{{icon.name}}</div>
      <div>{{icon.font}}</div>
    </div>
  </div>
</template>

<script>
  import UxIcon from '../../../src/components/icon';
  import list from './icon';

  export default {
    data() {
      return {
        list,
      };
    },
    components: {
      UxIcon,
    },
  };
</script>

<style lang="scss" scoped>
  .icon-wrap {
    overflow: hidden;
  }
  .icon-item {
    float: left;
    width: calc(100% / 6);
    padding: 20px;
    text-align: center;
    cursor: pointer;
    &:hover,
    &:focus {
      background: #eee;
    }
    .fu {
      font-size: 24px;
      margin-bottom: 10px;
    }
    &-name {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
</style>

