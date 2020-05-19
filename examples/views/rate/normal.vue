<template>

  <div class="demo">
    <h4>basic</h4>
    <ux-rate />
  </div>
</template>


<script>
  import { Rate } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxRate: Rate,
    },
  };
</script>
