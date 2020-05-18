<template>
  <div class="demo">
    <h4>showHour</h4>
    <p>可以使用`format`或`show-hour`,`show-minute`,`show-second` 参数设置列显示, 如果`format`存在则以`format`为准</p>
    <ux-timepicker v-model="value"
                   :show-second="false" />
    <ux-timepicker format="H:m"
                   @change="onChange" />
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
        value: new Date(2018, 10, 10, 10, 20, 25),
        // openValue: new Date(2018, 10, 10, 0, 45, 25),
      };
    },
    created() {
      setTimeout(() => {
        // this.openValue = new Date(2018, 10, 10, 20, 20, 25);
      }, 4500);
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
