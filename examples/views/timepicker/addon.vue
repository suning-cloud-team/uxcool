<template>
  <div class="demo">
    <h4>addon</h4>
    <ux-timepicker v-model="value"
                   :visible="visible"
                   @popup-visible-change="onPopupVisibleChange">
      <button slot="addon"
              @click="onOk">ok</button>
    </ux-timepicker>
  </div>
</template>


<script>
  import { Timepicker } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxTimepicker: Timepicker,
    },
    data() {
      return {
        visible: false,
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
    created() {
      setTimeout(() => {
        this.value = new Date(2018, 7, 20, 17, 15, 12);
      }, 1500);
    },
    methods: {
      onOk() {
        this.visible = false;
      },
      onPopupVisibleChange(visible) {
        this.visible = visible;
      },
    },
  };
</script>
