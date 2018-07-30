<template>
  <ux-demo :height="200"
           title="禁用时分秒">
    <div slot="demo">
      <h4>disable hours</h4>
      <ux-timepicker :disabled-hours="disabledHours" />
      <h4>disable minutes</h4>
      <ux-timepicker :disabled-minutes="disabledMinutes" />
      <h4>disable seconds</h4>
      <ux-timepicker :disabled-seconds="disabledSeconds" />
    </div>
    <div slot="desc">
      选择禁用的时分秒
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/disabledHours.vue';

  export default {
    data() {
      return {
        code,
        value: new Date(2018, 7, 20, 0, 45, 25),
      };
    },
    methods: {
      disabledHours() {
        return [10, 20, '15'];
      },
      disabledMinutes(hour) {
        return hour === 18 ? [1, 5, 17, 12, '58'] : [];
      },
      disabledSeconds(hour, minute) {
        return hour === 19 && minute === 50 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 20] : [];
      },
    },
  };
</script>
