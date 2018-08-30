<template>
  <ux-demo :height="200"
           title="自定义有限范围">
    <div slot="demo">
      <ux-calendar :valid-range="validRange"
                   @change="onChange" />
    </div>
    <div slot="desc">
      自定义有限范围
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/calendar/validRange.vue';

  export default {
    data() {
      return {
        code,
        validRange: [new Date(), new Date()],
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>

