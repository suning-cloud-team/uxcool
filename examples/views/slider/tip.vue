<template>
  <div>
    <h4>tip</h4>
    <div class="demo">
      <Slider :tip-formatter="tipFormat" />
    </div>
    <div class="demo">
      <Slider range
              :tip-formatter="rangeTipFormat" />
    </div>

    <h4>no tip</h4>
    <div class="demo">
      <Slider :tip-formatter="false" />
      <Slider range
              :tip-formatter="false" />
    </div>
  </div>
</template>

<script>
  import { Slider } from '@suning/uxcool';

  export default {
    components: {
      Slider,
    },
    methods: {
      tipFormat(v) {
        return `${v}%`;
      },
      rangeTipFormat(v, index) {
        return `${index}-${v}`;
      },
    },
  };
</script>
