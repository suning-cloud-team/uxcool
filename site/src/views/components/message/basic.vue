<template>
  <ux-demo title="基本用法">
    <div slot="demo">
      <ux-button theme="primary"
                 @click="info">普通提示</ux-button>
    </div>
    <div slot="desc">顶部显示，默认1.5秒后消失。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';
  import code from '@/code/message/basic';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      info() {
        UxMessage.info('This is info message');
      },
    },
  };
</script>
