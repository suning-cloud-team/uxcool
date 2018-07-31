<template>
  <ux-timepicker v-model="value"
                 disabled />
</template>

<script>
  export default {
    data() {
      return {
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
