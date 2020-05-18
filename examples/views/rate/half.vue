<template>

  <div class="demo">
    <h4>half</h4>
    <ux-rate :value="1.5"
             allow-half />
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
