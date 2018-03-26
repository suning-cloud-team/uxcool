<template>
  <div>
    <ux-radio disabled
              label="disabled" />
    <br>
    <ux-radio :disabled="tDisabled"
              label="disabled" />
    <ux-radio :disabled="tDisabled"
              checked
              label="disabled" />
    <ux-button @click="toggleDisabled">toggle disabled</ux-button>
  </div>
</template>

<script>
  import code from '@/code/radio/disabled.vue';

  export default {
    data() {
      return {
        code,
        tDisabled: false,
      };
    },
    methods: {
      toggleDisabled() {
        this.tDisabled = !this.tDisabled;
      },
    },
  };
</script>
