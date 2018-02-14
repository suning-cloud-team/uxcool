<template>
  <ux-demo title="HTML片段">
    <div slot="demo">
      <ux-button @click="info">使用HTML片段</ux-button>
    </div>
    <div slot="desc">在
      <code>content</code>受信任情况下，可以通过设置
      <code>dangerouslySetInnerHTML</code>为true, 将
      <code>content</code>内容作为HTML处理。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';
  import code from '@/code/message/html';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      info() {
        UxMessage.info({
          content: 'this is a <strong style="color: red;">html</strong> message',
          dangerouslySetInnerHTML: true,
        });
      },
    },
  };
</script>
