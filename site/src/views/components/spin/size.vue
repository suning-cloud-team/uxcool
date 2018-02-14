<template>
  <ux-demo title="不同尺寸">
    <div slot="demo">
      <ux-spin size="small" tip="small"></ux-spin>
      <ux-spin tip="normal"></ux-spin>
      <ux-spin size="large" tip="large"></ux-spin>
    </div>
    <div slot="desc">通过<code>size</code>设置不同尺寸大小。可选值为<code>small</small></code>和<code>large</code>,不设置为默认大小。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/spin/size'
export default {
  data () {
    return {
      code
    };
  }
}
</script>
