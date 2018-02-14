<template>
  <ux-demo title="其他类型">
    <div slot="demo">
      <ux-button theme="success"
                 @click="success">成功</ux-button>
      <ux-button theme="danger"
                 @click="error">失败</ux-button>
      <ux-button theme="warning"
                 @click="warning">警告</ux-button>
    </div>
    <div slot="desc">可以用来显示成功、失败和警告类提示。
      <code></code>
    </div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';
  import code from '@/code/message/type';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      success() {
        UxMessage.success({
          noticeStyle: {
            color: 'green',
          },
          content: 'This is success message',
          duration: 2500,
          onClose() {
            console.log('success on-close');
          },
        });
      },
      error() {
        UxMessage.error('This is error message');
      },
      warning() {
        UxMessage.warning('This is success message');
      },
    },
  };
</script>
