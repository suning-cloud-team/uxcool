<template>
  <ux-demo title="环形图示例" :height="200">
    <div slot="demo">
      <ux-chart :options="options" :theme="theme"></ux-chart>
    </div>
    <div slot="desc">用于展示各类型数据的比例关系，但弱于饼图。</div>
    <ux-code slot="code">{{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/chart/doughnut';

const options = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} &ensp; {c} <br>{d}%',
  },
  legend: {
    show: false,
  },
  series: [
    {
      name: '未处理事件',
      type: 'pie',
      radius: ['35%', '55%'],
      center: ['50%', '50%'],
      data: [{ value: 30, name: '灾难' }, { value: 80, name: '警告' }, { value: 40, name: '严重' }],
    },
  ],
};

export default {
  data() {
    return {
      options,
      code,
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
};
</script>
