<template>
  <ux-calendar :fullscreen="false"
               style="width:350px;border:1px solid #d9d9d9; border-radius: 4px"
               @change="onChange" />
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
