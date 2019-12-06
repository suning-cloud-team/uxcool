<template>
  <div>
    <h3>value</h3>
    <p>placement: {{ placement }}</p>
    <ux-button @click="change">change placement</ux-button>
    <ux-multi-date-picker v-model="val"
                          :placement="placement" />
  </div>
</template>

<script>
  import { Datepicker, Button } from '@suning/uxcool';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
      UxButton: Button,
    },
    data() {
      return {
        val: null,
        placement: 'bottomRight',
      };
    },
    methods: {
      change() {
        const placement = ['bottomLeft', 'bottomRight', 'topRight', 'topLeft'][
          Math.floor(Math.random() * 4)
        ];
        this.placement = placement;
      },
    },
  };
</script>
