<template>
  <div>
    <h4>normal</h4>
    <div class="demo">
      <Slider :rail-style="{background:'red'}" />
    </div>
    <div class="demo">
      <Slider range />
    </div>
  </div>
</template>

<script>
  import { Slider } from '@cloud-sn/uxcool';

  export default {
    components: { Slider },
  };
</script>
