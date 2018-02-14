<template>
  <ux-demo title="基本用法">
    <div slot="demo">
      <ux-spin></ux-spin>
    </div>
    <div slot="desc">用于加载提示。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/spin/basic'
export default {
  data () {
    return {
      code
    };
  }
}
</script>
