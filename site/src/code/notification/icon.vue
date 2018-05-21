<template>
  <div>
    <ux-button @click="open">success icon</ux-button>
    <ux-button @click="open1">bells icon</ux-button>
    <ux-button @click="open2">green bells icon</ux-button>
    <ux-button @click="open3">jsx icon</ux-button>
    <ux-button @click="open4">custom String icon</ux-button>
  </div>
</template>

<script>
  import { UxNotification, UxIcon } from '@suning/uxcool';

  export default {
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

