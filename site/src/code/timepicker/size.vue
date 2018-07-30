<template>
  <div>
    <ux-timepicker v-model="value"
                   size="small" /> <br><br>
    <ux-timepicker v-model="value" />
    <br><br>
    <ux-timepicker v-model="value"
                   size="large" />
  </div>
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

