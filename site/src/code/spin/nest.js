export default `
<template>
  <ux-spin>
    <div class="area"></div>
  </ux-spin>
  <ux-spin wrap-class="custom-wrap-a" 
        spin-class="custom-spin-b"
        size="small">
    <span slot="tip">loading text</span>
    <div class="area">
    </div>
  </ux-spin>
  <ux-spin wrap-class="custom-wrap-a" 
          spin-class="custom-spin-b" 
          size="large">
    <span slot="tip">loading text</span>
    <div class="area2">
    </div>
  </ux-spin>
</template>`;