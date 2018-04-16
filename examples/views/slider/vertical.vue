<template>
  <div>
    <h4>vertical</h4>
    <div class="demo">
      <Slider style="height:300px;"
              vertical
              :value="30" />
    </div>
    <div class="demo">
      <Slider style="height:300px;"
              range
              vertical
              :value="[20,30,70]" />
    </div>

    <div class="demo">
      <Slider style="height:300px;"
              range
              vertical
              :marks="marks"
              :value="[20,30,70]" />
    </div>
  </div>
</template>

<script>
  import { Slider } from '@suning/uxcool';

  function getMarks() {
    // 不可少
    // eslint-disable-next-line
    const h = this.$createElement;
    return {
      0: '0°C',
      26: '26°C',
      37: '37°C',
      100: {
        style: {
          color: '#f50',
        },
        // 受限于vue的节点唯一原则,此处只支持原生html标签
        label: <strong>100°C</strong>,
      },
    };
  }
  export default {
    components: {
      Slider,
    },
    data() {
      return {
        marks: {},
      };
    },
    created() {
      this.marks = getMarks.call(this);
    },
  };
</script>

<style scoped>
  .demo {
    float: left;
    height: 300px;
  }
</style>

