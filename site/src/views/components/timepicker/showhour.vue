<template>
  <ux-demo :height="200"
           title="自定义展示列">
    <div slot="demo">
      <ux-timepicker v-model="value"
                     :show-second="false" />
      <ux-timepicker format="H:m"
                     @change="onChange" />
    </div>
    <div slot="desc">
      可以使用`format`或`show-hour`,`show-minute`,`show-second` 参数设置列显示, 如果`format`存在则以`format`为准
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/showhour.vue';

  export default {
    data() {
      return {
        code,
        value: new Date(2018, 10, 10, 10, 20, 25),
      };
    },

    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
