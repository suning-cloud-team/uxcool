<template>
  <div>
    <ux-radio-group name="a"
                    :options="opts5" />
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
