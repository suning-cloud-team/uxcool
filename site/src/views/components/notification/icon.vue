<template>
  <ux-demo title="图标"
           :height="200">
    <div slot="demo"
         class="gutter-group">
      <ux-button @click="open">success icon</ux-button>
      <ux-button @click="open1">bells icon</ux-button>
      <ux-button @click="open2">blue bells icon</ux-button>
      <ux-button @click="open3">jsx icon</ux-button>
      <ux-button @click="open4">custom String icon</ux-button>
    </div>
    <div slot="desc">可以通过
      <code>icon</code> 属性指定通知图标类型及样式。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { UxNotification, UxIcon } from '@suning/uxcool';
  import code from '@/code/notification/icon.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      open() {
        UxNotification.open({
          title: 'notificationnotificationnotificationnotificationnotification',
          description: 'this is icon description',
          icon: 'success',
          duration: 1500,
        });
      },
      open1() {
        UxNotification.open({
          title: 'notification',
          icon: {
            type: 'bells',
          },
        });
      },
      open2() {
        UxNotification.open({
          title: 'notificationnotificationnotificationnotificationnotification',
          icon: {
            type: 'bells',
            style: {
              color: 'skyblue',
            },
          },
        });
      },

      open3() {
        UxNotification.open({
          title: 'notificationnotificationnotificationnotificationnotification',
          icon: <UxIcon type="question_circle" style="color:red" />,
        });
      },
      open4() {
        UxNotification.open({
          title: 'notificationnotificationnotificationnotificationnotification',
          icon: {
            type: 'bells',
            style: {
              color: 'orange',
            },
          },
        });
      },
    },
  };
</script>

