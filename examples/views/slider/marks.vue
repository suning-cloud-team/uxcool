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
    <div class="demo">
      <Slider :min="200"
              :max="200000"
              :marks="marks3"
              :step="false" />
    </div>
    <p>marks 但不显示dot</p>
    <div class="demo">
      <Slider style="width:500px"
              :min="0"
              :max="2000"
              :marks="marks2"
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
      20: '20℃',
      50: '50℃',
      100: {
        style: {
          color: '#f50',
        },
        // 受限于vue的节点唯一原则,此处只支持原生html标签
        label: <strong>100℃</strong>,
      },
    };
  }
  function getMarks3() {
    // 不可少
    // eslint-disable-next-line
    const h = this.$createElement;
    return {
      200: '',
      10000: '10000',
      20000: '20000',
      200000: {
        style: {
          color: '#f50',
        },
        // 受限于vue的节点唯一原则,此处只支持原生html标签
        label: <strong>200000</strong>,
      },
    };
  }

  function getMarks2() {
    // 不可少
    // eslint-disable-next-line
    const h = this.$createElement;
    return {
      ...Array(200)
        .fill(0)
        .reduce((r, v, i) => {
          const nr = r;
          nr[i] = {
            isDot: false,
          };
          return r;
        }, {}),
      200: '200',
      500: '500',
      1500: '1500',
      2000: '2000',
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
        marks2: {},
        marks3: {},
      };
    },
    created() {
      setTimeout(() => {
        this.marks = this.getMarks();
      }, 1500);
      this.marks2 = this.getMarks2();
      this.marks3 = this.getMarks3();
    },
    methods: {
      getMarks,
      getMarks2,
      getMarks3,
    },
  };
</script>
