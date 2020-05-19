<template>
  <div>
    <h4>custom</h4>
    <div class="demo">
      <ux-button @click="open">open custom notification</ux-button>
      <ux-button @click="open1">open no closable notification</ux-button>
      <ux-button @click="open2">open no closable no description notification</ux-button>
      <ux-button @click="open3">open danger html content</ux-button>
      <ux-button @click="open4">open jsx content</ux-button>
    </div>
  </div>
</template>


<script>
  import { Notification, Button } from '@cloud-sn/uxcool';
  import IconDemo from './icon.vue';
  import TypeDemo from './type.vue';

  export default {
    components: {
      UxButton: Button,
      IconDemo,
      TypeDemo,
    },
    methods: {
      open() {
        const close = Notification.open({
          title: 'notification',
          description: 'this is description',
          btn: (
            <Button
              type="primary"
              size="small"
              on-click={() => {
                close();
              }}
            >
              confirm
            </Button>
          ),
        });
      },
      open1() {
        const close = Notification.open({
          title: 'notification',
          description: 'this is description',
          closable: false,
          btn: (
            <Button
              type="primary"
              size="small"
              on-click={() => {
                close();
              }}
            >
              confirm
            </Button>
          ),
        });
      },
      open2() {
        const close = Notification.open({
          title: 'notification',
          closable: false,
          btn: (
            <Button
              type="primary"
              size="small"
              on-click={() => {
                close();
              }}
            >
              confirm
            </Button>
          ),
        });
      },
      open3() {
        Notification.open({
          title: 'notification',
          description: '<span style="color:red">this is dangerouslySetInnerHTML description</span>',
          dangerouslySetInnerHTML: true,
          icon: {
            type: 'clock_circle',
            style: {
              color: 'red',
            },
          },
        });
      },
      open4() {
        Notification.open({
          title: 'notification',
          description: <span style="color:green">this is jsx description</span>,
        });
      },
    },
  };
</script>
