const code = `
<template>
  <div class="demo-badge-group">
    <ux-badge status="success"></ux-badge>
    <ux-badge status="error"></ux-badge>
    <ux-badge status="default"></ux-badge>
    <ux-badge status="processing"></ux-badge>
    <ux-badge status="warning"></ux-badge>
  </div>
  <div class="demo-badge-group">
    <ux-badge status="success" text="success"></ux-badge>
    <ux-badge status="error" text="error"></ux-badge>
    <ux-badge status="default" text="default"></ux-badge>
    <ux-badge status="processing" text="processing"></ux-badge>
    <ux-badge status="warning" text="warning"></ux-badge>
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