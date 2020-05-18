<template>

  <div class="demo">
    <h4>disabled</h4>
    <ux-rate :value="3"
             disabled/>
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
