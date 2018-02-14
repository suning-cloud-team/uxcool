export default `
<template>
  <div class="demo-badge-group">
    <ux-badge count="9">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="99">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="999">
      <div class="demo-badge"></div>
    </ux-badge>
  </div>
  <div class="demo-badge-group">
    <ux-badge count="99" overflow-count="10">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="1000" overflow-count="999">
      <div class="demo-badge"></div>
    </ux-badge>
  </div>
  <div class="demo-badge-group">
    <ux-badge count="0">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="0" show-zero>
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="0" :show-zero="true">
      <div class="demo-badge"></div>
    </ux-badge>
  </div>
</template>

<style lang="scss">
  .demo-badge-group {
    margin-bottom: 10px;

    .ux-badge + .ux-badge {
      margin-left: 20px;
    }
  }
    
  .demo-badge {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: #eee;
  }
</style>
`;