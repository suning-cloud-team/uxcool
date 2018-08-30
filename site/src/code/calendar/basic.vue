<template>
  <ux-calendar @change="onChange" />
</template>

<script>
  export default {
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
