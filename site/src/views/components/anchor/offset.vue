<template>
  <ux-demo title="顶部偏移"
           :height="200">
    <div slot="demo">
      <div id="offsetDemo"
           class="demo">
        offsetDemo
        <ux-anchor :offset-top="100">
          <ux-anchor-link href="#offsetDemo"
                          title="basic demo" />
          <ux-anchor-link href="#targetDemo"
                          title="target demo" />
        </ux-anchor>
      </div>
      <div id="targetDemo"
           class="demo"
           style="margin:200px 0">
        target demo
      </div>
    </div>
    <div slot="desc">可以通过
      <code>offsetTop</code>属性设置滚动后距离窗口顶部的偏移量。</div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/anchor/offset.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

