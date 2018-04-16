<template>
  <ux-demo title="自定义按钮"
           :height="200">
    <div slot="demo">
      <div class="demo">
        <ux-backtop style="bottom:100px">
          <span class="to-top">T</span>
        </ux-backtop>
      </div>
    </div>
    <div slot="desc">
      自定义回到顶部按钮
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/backtop/custom.vue';

  export default {
    data() {
      return {
        code,
      };
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
