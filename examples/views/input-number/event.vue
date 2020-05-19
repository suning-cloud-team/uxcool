<template>
  <div>
    <h6>event</h6>

    <div class="demo">
      value: {{val}}
      <ux-input-number v-model="val"
                       :min="1"
                       :max="10"
                       @input="onInput"
                       @change="onChange"
                       @input-change="onInputChange" />
    </div>
  </div>
</template>


<script>
  import { InputNumber, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxInputNumber: InputNumber,
      UxButton: Button,
    },
    data() {
      return {
        val: 0,
        readonly: undefined,
        disabled: false,
      };
    },
    methods: {
      onChange(val, prevVal) {
        console.log('onChange', val, prevVal);
      },
      onInput(val) {
        console.log('onInput', val);
      },
      onFocus(e) {
        console.log('onFocus', e);
      },
      onBlur(e) {
        console.log('onBlur', e);
      },
      onKeypress(e) {
        console.log('onKeypress', e);
      },
      onInputChange(val) {
        console.log('onInputChange', val);
      },
    },
  };
</script>
