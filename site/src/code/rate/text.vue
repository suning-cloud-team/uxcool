<template>
  <span>
    <ux-rate v-model="value"
             allow-half/>
    <span>
      {{ value ? value : 0 }} stars
    </span>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        value: 2,
      };
    },
  };
</script>
