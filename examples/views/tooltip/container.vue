<template>
  <div ref="wrapRef"
       class="demo">
    <h4>popup container</h4>
    <ux-tooltip :get-popup-container="getPopupContainer"
                trigger="click">
      <div slot="content">
        测试1<br>测试2
      </div>
      <button class="ux-btn">Bottom</button>
    </ux-tooltip>
  </div>
</template>

<script>
  import { Tooltip as UxTooltip } from '@cloud-sn/uxcool';

  export default {
    components: { UxTooltip },
    methods: {
      getPopupContainer() {
        return this.$refs.wrapRef;
      },
    },
  };
</script>
