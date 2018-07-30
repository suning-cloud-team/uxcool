<template>
  <ux-timepicker :open-value="openValue"
                 format="H:m" />
</template>

<script>
  export default {
    data() {
      return {
        openValue: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
  };
</script>
