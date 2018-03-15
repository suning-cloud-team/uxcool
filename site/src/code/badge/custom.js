const code = `
<template>
  <div class="demo-badge-group">
    <ux-badge count="25">
    </ux-badge>
    <ux-badge count="4" :custom-style="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}"></ux-badge>
    <ux-badge count="109" :custom-style="{background: 'green'}"></ux-badge>
  </div>
  <div class="demo-badge-group">
    <ux-badge count="25">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="4" :custom-style="{backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset'}">
      <div class="demo-badge"></div>
    </ux-badge>
    <ux-badge count="109" :custom-style="{background: 'green'}">
      <div class="demo-badge"></div>
    </ux-badge>
  </div>
</template>`;
export default code;
