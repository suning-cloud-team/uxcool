<template>
  <ux-demo title="自定义显示时长">
    <div slot="demo">
      <ux-button @click="info">显示10秒</ux-button>
    </div>
    <div slot="desc">可以通过
      <code>duration</code>指定显示时长，也可以通过
      <code>UxMessage.config</code>全局设置。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';
  import code from '@/code/message/duration';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      info() {
        UxMessage.info({ content: '10秒后消失', duration: 10000 });
      },
    },
  };
</script>
