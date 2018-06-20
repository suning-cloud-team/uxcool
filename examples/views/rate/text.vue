<template>
  <div class="demo">
    <h4>text</h4>
    <span>
      <ux-rate v-model="value"
               allow-half/>
      <span>
        {{ value ? value : 0 }} stars
      </span>
    </span>
  </div>
</template>


<script>
  import { Rate } from '@suning/uxcool';

  export default {
    components: {
      UxRate: Rate,
    },
    data() {
      return {
        value: 2,
      };
    },
  };
</script>
