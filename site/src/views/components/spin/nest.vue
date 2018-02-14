<template>
  <ux-demo title="嵌套">
    <div slot="demo">
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
    </div>
    <div slot="desc">可以把
      <code>spin</code>作为容器，嵌套内容。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<style lang="scss" scoped>
  .area,
  .area2 {
    background: #eee;
    margin: 0 auto;
  }
  .area {
    width: 200px;
    height: 200px;
  }
  .area2 {
    width: 500px;
    height: 500px;
  }
  .ux-layout-dark {
    .area,
    .area2 {
      background: rgba(0, 0, 0, 0.2);
    }
  }
</style>


<script>
  import { mapState } from 'vuex';
  import code from '@/code/spin/nest';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: mapState(['theme']),
  };
</script>
