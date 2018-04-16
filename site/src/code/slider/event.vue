<template>
  <div>
    <div class="demo">
      <ux-slider @change="onChange" />
    </div>
    <div class="demo">
      <ux-slider range
                 :step="10"
                 v-model="rangeVal"
                 @change="onChange"
                 @after-change="onAfterChange" />
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        rangeVal: [20, 60],
      };
    },
    methods: {
      onChange(val) {
        console.log('change', val);
      },
      onAfterChange(val) {
        console.log('on after change', val);
      },
    },
  };
</script>
