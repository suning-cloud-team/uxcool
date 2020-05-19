<template>
  <div>
    <h4>event</h4>
    <p>
      <code>Slider</code>发生变化时,触发
      <code>change</code>事件, 在
      <code>onmouseup</code>后,会触发
      <code>after-change</code>事件
    </p>
    <div class="demo">
      <Slider @change="onChange" />
    </div>
    <div class="demo">
      <Slider range
              :step="10"
              v-model="rangeVal"
              @change="onChange"
              @after-change="onAfterChange" />
    </div>
  </div>
</template>

<script>
  import { Slider } from '@cloud-sn/uxcool';

  export default {
    components: { Slider },
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
