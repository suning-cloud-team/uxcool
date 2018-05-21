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
    </div>
    <div slot="desc"></div>
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

