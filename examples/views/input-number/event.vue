<template>
  <div>
    <h6>event</h6>

    <div class="demo">
      <ux-input-number v-model="val"
                       @input="onInput"
                       @change="onChange"
                       @keypress="onKeypress"
                       @focus="onFocus"
                       @blur="onBlur" />
    </div>
  </div>
</template>


<script>
  import { InputNumber, Button } from '@suning/uxcool';

  export default {
    components: {
      UxInputNumber: InputNumber,
      UxButton: Button,
    },
    data() {
      return {
        val: 5,
        readonly: false,
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
    },
  };
</script>
