<template>
  <div class="demo">
    <h4>clear</h4>
    <ux-rate :value="3"
             :allow-clear="false" />
    <span>allow-clear: false</span>
    <br>
    <ux-rate :value="2" />
    <span>allow-clear: true</span>
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
