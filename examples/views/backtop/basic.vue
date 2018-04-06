<template>
  <div>
    <div class="demo"
         style="height:1500px">
      <backtop />
    </div>

    <div class="demo">
      <backtop style="bottom:100px">
        <span class="to-top">T</span>
      </backtop>
    </div>
    <div class="demo">
      <backtop :visibility-height="200"
               style="bottom:140px" />
    </div>

    <!-- <custom-demo /> -->
  </div>
</template>

<script>
  import { Backtop } from '@suning/uxcool';
  import CustomDemo from './custom.vue';

  export default {
    components: {
      Backtop,
      CustomDemo,
    },
  };
</script>

<style lang="scss" scoped>
  .to-top {
    display: block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: #fff;
    background: #008eff;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
  }
</style>
