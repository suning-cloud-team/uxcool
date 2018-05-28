<template>
  <ux-demo title="事件"
           :height="200">
    <div slot="demo"
         class="gutter-group">
      <ux-button @click="open">open notification</ux-button>
    </div>
    <div slot="desc">
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { UxNotification } from '@suning/uxcool';
  import code from '@/code/notification/event.vue';

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
          onClose() {
            console.log('close notification');
          },
        });
      },
    },
  };
</script>

