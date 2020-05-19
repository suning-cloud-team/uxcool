<template>
  <div>
    <h6>focus, blur</h6>

    <div class="demo">
      <ux-input-number ref="inputRef"
                       v-model="val"
                       @focus="onFocus"
                       @blur="onBlur" />
      <br>
      <br>
      <ux-button @click="focus">focus</ux-button>
      <ux-button @click="blur">blur</ux-button>
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
        val: 5,
        readonly: false,
        disabled: false,
      };
    },
    methods: {
      focus() {
        const { $refs: { inputRef } } = this;
        if (inputRef) {
          inputRef.focus();
        }
      },
      blur() {
        const { $refs: { inputRef } } = this;
        if (inputRef) {
          inputRef.blur();
        }
      },
      onFocus(e) {
        console.log('onFocus', e);
      },
      onBlur(e) {
        console.log('onBlur', e);
      },
    },
  };
</script>
