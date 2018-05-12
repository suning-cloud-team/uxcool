<template>
  <div>
    <h4>icon</h4>
    <div class="demo">
      <ux-button @click="open">open success icon</ux-button>
      <ux-button @click="open1">open bells</ux-button>
      <ux-button @click="open2">open green bells</ux-button>
      <ux-button @click="open3">open jsx icon</ux-button>
      <ux-button @click="open4">open custom String icon</ux-button>
    </div>
  </div>
</template>


<script>
  import { Notification, Button, Icon } from '@suning/uxcool';

  export default {
    components: {
      UxButton: Button,
    },
    methods: {
      open() {
        Notification.open({
          title: 'notificationnotificationnotificationnotificationnotification',
          description: 'this is icon description',
          icon: 'success',
          duration: 1500,
        });
      },
      open1() {
        Notification.open({
          title: 'notification',
          icon: {
            type: 'bells',
          },
        });
      },
      open2() {
        Notification.open({
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
        Notification.open({
          title: 'notificationnotificationnotificationnotificationnotification',
          icon: <Icon type="question_circle" style="color:red" />,
        });
      },
      open4() {
        Notification.open({
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
