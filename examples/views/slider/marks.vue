<template>
  <div>
    <h4>marks and included=true</h4>
    <div class="demo">
      <Slider :marks="marks" />
    </div>

    <div class="demo">
      <Slider range
              :marks="marks" />
    </div>
    <h4>included = false</h4>
    <div class="demo">
      <Slider :marks="marks"
              :included="false" />
    </div>
    <div class="demo">
      <Slider range
              :marks="marks"
              :included="false" />
    </div>

    <h4>marks and step</h4>
    <div class="demo">
      <Slider :marks="marks"
              :step="5" />
    </div>
    <div class="demo">
      <Slider range
              :marks="marks"
              :step="5" />
    </div>
    <h4>step = false</h4>
    <p>仅选中marks的值</p>
    <div class="demo">
      <Slider :marks="marks"
              :step="false" />
    </div>
    <div class="demo">
      <Slider range
              :marks="marks"
              :step="false" />
    </div>
    <h4>dots</h4>
    <div class="demo">
      <Slider dots
              :step="5" />
    </div>
    <div class="demo">
      <Slider range
              :marks="marks"
              dots
              :step="5" />
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
      StrongCmp: {
        render() {
          return <strong>{this.$slots.default}</strong>;
        },
      },
    },
    data() {
      return {
        marks: {},
      };
    },
    created() {
      this.marks = this.getMarks();
    },
    methods: {
      getMarks,
    },
  };
</script>
