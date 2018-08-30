<template>
  <ux-select v-model="value"
             :disabled="disabled"
             allow-clear
             style="width:200px;"
             show-search>
    <ux-option value="A"
               label="A1" />
    <ux-option value="B"
               label="B2" />
    <ux-option value="C"
               label="C3" />
  </ux-select>
</template>

<script>
  export default {
    data() {
      return {
        value: ['A'],
        disabled: false,
      };
    },
    created() {
      setTimeout(() => {
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 3500);
      }, 1500);
    },
  };
</script>
