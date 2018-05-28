<template>
  <div>
    <ux-button @click="open">open custom notification</ux-button>
    <ux-button @click="open1">open no closable notification</ux-button>
    <ux-button @click="open2">open no closable no description notification</ux-button>
    <ux-button @click="open3">open danger html content</ux-button>
    <ux-button @click="open4">open jsx content</ux-button>
  </div>
</template>

<script>
  import { UxNotification, UxButton } from '@suning/uxcool';

  export default {
    methods: {
      open() {
        const close = UxNotification.open({
          title: 'notification',
          description: 'this is description',
          btn: (
            <UxButton
              type="primary"
              size="small"
              on-click={() => {
                close();
              }}
            >
              confirm
            </UxButton>
          ),
        });
      },
      open1() {
        const close = UxNotification.open({
          title: 'notification',
          description: 'this is description',
          closable: false,
          btn: (
            <UxButton
              type="primary"
              size="small"
              on-click={() => {
                close();
              }}
            >
              confirm
            </UxButton>
          ),
        });
      },
      open2() {
        const close = UxNotification.open({
          title: 'notification',
          closable: false,
          btn: (
            <UxButton
              type="primary"
              size="small"
              on-click={() => {
                close();
              }}
            >
              confirm
            </UxButton>
          ),
        });
      },
      open3() {
        UxNotification.open({
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
        UxNotification.open({
          title: 'notification',
          description: <span style="color:green">this is jsx description</span>,
        });
      },
    },
  };
</script>

