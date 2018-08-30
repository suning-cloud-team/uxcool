<template>
  <ux-calendar @select="onSelect"
               @panel-change="onPanelChange"
               @change="onChange" />
</template>

<script>
  export default {
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
