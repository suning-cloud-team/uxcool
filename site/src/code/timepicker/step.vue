<template>
  <ux-timepicker v-model="value"
                 :minute-step="15"
                 hour-step="2"
                 second-step="10" />
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
