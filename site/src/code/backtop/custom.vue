<template>
  <div>
    <div class="demo">
      <ux-backtop style="bottom:100px">
        <span class="to-top">T</span>
      </ux-backtop>
    </div>
  </div>
</template>

<script>
  export default {};
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
