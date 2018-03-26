export default `
<template>
  <div>
    <ux-switch disabled/>
    <ux-switch disabled
               checked/>
    <br>
    <ux-switch :disabled="disabled"
               checked/>
    <ux-button @click="toggleDisabled">
      toggle disabled
    </ux-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        disabled: true,
      };
    },
    methods: {
      toggleDisabled() {
        this.disabled = !this.disabled;
      },
    },
  };
</script>`;
