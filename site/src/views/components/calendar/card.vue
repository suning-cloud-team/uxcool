<template>
  <ux-demo :height="200"
           title="卡片模式">
    <div slot="demo">
      <ux-calendar :fullscreen="false"
                   style="width:350px;border:1px solid #d9d9d9; border-radius: 4px"
                   @change="onChange" />
    </div>
    <div slot="desc">
      用于空间有限的容器
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/calendar/card.vue';

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
