<template>
  <div>
    <ux-radio />
    <br>
    <ux-radio>inner label</ux-radio>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        opts5: ['aa', 'bb', 'cc'],
      };
    },
  };
</script>
