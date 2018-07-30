<template>
  <ux-demo :height="200"
           title="虚拟节点">
    <div slot="demo">
      <ux-timeline>
        <span slot="pending"
              style="green">this is slot pending</span>
        <ux-icon slot="pendingDot"
                 type="horn_o" />
        <ux-timeline-item>A</ux-timeline-item>
        <ux-timeline-item>B</ux-timeline-item>
        <ux-timeline-item>C</ux-timeline-item>
      </ux-timeline>
    </div>
    <div slot="desc">
      自定义虚拟节点
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timeline/pending.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
