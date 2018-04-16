<template>
  <div>
    <h4>tip</h4>
    <div class="demo">
      <ux-slider :value="20"
                 :tip-formatter="tipFormat" />
    </div>
    <div class="demo">
      <ux-slider range
                 :value="[20, 40]"
                 :tip-formatter="rangeTipFormat" />
    </div>

    <h4>no tip</h4>
    <div class="demo">
      <ux-slider :value="20"
                 :tip-formatter="false" />
      <ux-slider range
                 :value="[20,40]"
                 :tip-formatter="false" />
    </div>
  </div>
</template>

<script>
  export default {
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
