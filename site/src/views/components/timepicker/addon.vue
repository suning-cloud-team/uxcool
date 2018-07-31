<template>
  <ux-demo :height="200"
           title="附加内容">
    <div slot="demo">
      <ux-timepicker v-model="value"
                     :visible="visible"
                     @popup-visible-change="onPopupVisibleChange">
        <button slot="addon"
                @click="onOk">ok</button>
      </ux-timepicker>
    </div>
    <div slot="desc">
      使用
      <code>addon slot</code>在底部自定义附加内容
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/timepicker/addon.vue';

  export default {
    data() {
      return {
        code,
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
