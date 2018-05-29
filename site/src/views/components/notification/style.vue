<template>
  <ux-demo title="样式"
           :height="200">
    <div slot="demo"
         class="gutter-group">
      <ux-button @click="open">open notification</ux-button>
    </div>
    <div slot="desc">可以通过
      <code>style</code> 属性指定通知提示框样式。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { UxNotification } from '@suning/uxcool';
  import code from '@/code/notification/style.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      open() {
        UxNotification.open({
          title: 'notification',
          description: 'this is description',
          duration: 0,
          style: {
            width: '500px',
            marginLeft: `${384 - 500}px`,
          },
          className: 'custom-class',
        });
      },
    },
  };
</script>

