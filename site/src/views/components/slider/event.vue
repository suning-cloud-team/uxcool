<template>
  <ux-demo title="事件"
           :height="200">
    <div slot="demo">
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
    <div slot="desc">
      当
      <code>Slider</code>值发生改变时,触发
      <code>change</code>事件; 当
      <code>mouseup</code>时,触发
      <code>after-change</code>事件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/slider/event.vue';

  export default {
    data() {
      return {
        code,
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
