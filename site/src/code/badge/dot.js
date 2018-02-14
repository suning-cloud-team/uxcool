const code = `
<template>
  <div>
    <ux-badge dot
              :theme="theme">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge :dot="true"
              :theme="theme">text</ux-badge>
    <ux-badge :dot="true"
              :theme="theme">
      <i class="fu fu-account"></i>
    </ux-badge>
  </div>
</template>

<style>
  .demo-badge-group {
    margin-bottom: 10px;

    .ux-badge + .ux-badge {
      margin-left: 20px;
    }
  }
</style>`;

export default code;
