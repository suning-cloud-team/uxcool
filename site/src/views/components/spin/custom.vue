<template>
  <ux-demo title="自定义内容与样式">
    <div slot="demo">
      <ux-spin tip="loading"></ux-spin>
      <ux-spin tip="loading" spin-style="width:100%">
        <span slot="tip" style="color: red">
          loading...
        </span>
      </ux-spin>
    </div>
    <div slot="desc">可以通过<code>tip</code>属性或者slot设置提示信息。可以通过<code>spin-style</code>属性设置自定义样式。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/spin/custom'
export default {
  data () {
    return {
      code
    };
  }
}
</script>
