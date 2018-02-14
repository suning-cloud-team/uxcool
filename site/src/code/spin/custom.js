export default `
<template>
  <ux-spin tip="loading"></ux-spin>
  <ux-spin tip="loading" spin-style="width:100%">
    <span slot="tip" style="color: red">
      loading...
    </span>
  </ux-spin>
</template>`;