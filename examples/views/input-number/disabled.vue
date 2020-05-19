<template>
  <div>
    <h6>disabled, readonly</h6>

    <div class="demo">
      <ux-input-number v-model="val"
                       :readonly="readonly"
                       :disabled="disabled" />
      <br>
      <br>
      <ux-button @click="toggleReadonly">readonly = {{ readonly }}</ux-button>
      <ux-button @click="toggleDisabled">disabled = {{ disabled }}</ux-button>
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
      onChange(val) {
        console.log('onChange', val);
      },
      toggleReadonly() {
        this.readonly = !this.readonly;
      },
      toggleDisabled() {
        this.disabled = !this.disabled;
      },
    },
  };
</script>
