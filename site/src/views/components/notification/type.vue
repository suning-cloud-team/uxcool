<template>
  <ux-demo title="类型"
           :height="200">
    <div slot="demo"
         class="gutter-group">
      <ux-button @click="open('success')">success</ux-button>
      <ux-button @click="open('info')">info</ux-button>
      <ux-button @click="open('warn')">warn</ux-button>
      <ux-button @click="open('warning')">warning</ux-button>
      <ux-button @click="open('error')">error</ux-button>
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
  import code from '@/code/notification/type.vue';

  export default {
    data() {
      return {
        code,
        placements: {
          error: 'topLeft',
          warning: 'bottomLeft',
          info: 'bottomRight',
        },
      };
    },
    methods: {
      open(type) {
        const { placements } = this;
        UxNotification[type]({
          title: 'notification',
          description: 'this is description',
          duration: type === 'error' ? 10000 : 4500,
          placement: type in placements ? placements[type] : 'topRight',
        });
      },
    },
  };
</script>

