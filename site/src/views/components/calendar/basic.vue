<template>
  <ux-demo :height="200"
           title="基本使用">
    <div slot="demo">
      <ux-calendar @change="onChange" />
    </div>
    <div slot="desc">
      基本使用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/calendar/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
