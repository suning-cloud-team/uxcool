<template>
  <ux-demo :height="200"
           title="事件">
    <div slot="demo">
      <ux-calendar @select="onSelect"
                   @panel-change="onPanelChange"
                   @change="onChange" />
    </div>
    <div slot="desc">
      事件监听
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/calendar/event.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onPanelChange(...args) {
        console.log('onPanelChange', ...args);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
