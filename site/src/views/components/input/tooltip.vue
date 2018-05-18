<template>
  <ux-demo title="格式化显示"
           :height="200">
    <div slot="demo">
      <ux-tooltip trigger="focus"
                  placement="topLeft"
                  tooltip-class="input-tooltip"
                  :content="tooltipVal">
        <ux-input v-model="inputVal"
                  style="width:150px;" />
      </ux-tooltip>
    </div>
    <div slot="desc">
      结合
      <code>tooltip</code> 组件, 实现数值输入框, 方便内容超长时的全量显示
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/tooltip.vue';

  export default {
    data() {
      return {
        code,
        inputVal: '',
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
      tooltipVal() {
        const { inputVal = '' } = this;
        const r = inputVal;
        const arr = r.split('.');
        arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return arr.join('.');
      },
    },
  };
</script>
<style >
  .input-tooltip .ux-tooltip-inner {
    min-width: 32px;
    min-height: 33px;
  }
</style>
