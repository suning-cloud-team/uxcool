<template>
  <ux-calendar :valid-range="validRange"
               @change="onChange" />
</template>

<script>
  export default {
    data() {
      return {
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

