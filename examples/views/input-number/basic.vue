<template>
  <div>
    <div class="demo">
      <ux-input-number novalidate
                       v-model="val1"
                       :min="1"
                       :max="10"
                       @change="onChange" />
    </div>

    <div class="demo">
      <ux-input-number :min="0"
                       :max="10"
                       @change="onChange" />
    </div>
    <div class="demo">
      <h4>step=0.1</h4>
      <ux-input-number novalidate
                       :value="val2"
                       :step="0.1"
                       :min="min"
                       :max="max"
                       name="abc"
                       @change="onChange" />
    </div>
    <div class="demo">
      <h4>step=0.01</h4>
      <ux-input-number novalidate
                       :value="val2"
                       :step="0.01"
                       :min="0"
                       :max="10"
                       @change="onChange" />
    </div>
    <div class="demo">
      <h4>precision=1</h4>
      <ux-input-number novalidate
                       :value="val2"
                       :step="0.1"
                       :min="0"
                       :max="10"
                       :precision="1"
                       @change="onChange" />
    </div>
    <div class="demo">
      <ux-input-number size="large" />
      <ux-input-number size="small" />
    </div>

    <disabled-demo />

    <focus-demo/>
    <event-demo/>
  </div>
</template>


<script>
  import { InputNumber } from '@suning/uxcool';
  import DisabledDemo from './disabled.vue';
  import EventDemo from './event.vue';
  import FocusDemo from './focus.vue';

  export default {
    components: {
      UxInputNumber: InputNumber,
      DisabledDemo,
      FocusDemo,
      EventDemo,
    },
    data() {
      return {
        val1: 0,
        val2: 12,
        min: 0,
        max: 10,
      };
    },
    created() {
      setTimeout(() => {
        // this.val2 = '12.xx';
        // this.min = 0;
        // this.max = 5;
      }, 1500);
    },
    methods: {
      onChange(val) {
        console.log('onChange', val);
      },
    },
  };
</script>
