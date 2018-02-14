<template>
  <ux-demo title="折线图" :height="200">
    <div slot="demo">
      <ux-chart :options="options" :theme="theme"></ux-chart>
    </div>
    <div slot="desc">一般用于展示数据在某个维度的波动关系。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/chart/line';

const options = {
  title: {
    text: '告警级别分析',
    textStyle: {
      fontSize: '12px',
    },
    left: '3%',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['系统1', '系统2'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: [
      '0:00',
      '2:00',
      '4:00',
      '6:00',
      '8:00',
      '10:00',
      '12:00',
      '14:00',
      '16:00',
      '18:00',
      '20:00',
      '22:00',
    ],
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '10%'],
  },
  color: ['#FFB300', '#00FFC0'],
  series: [
    {
      name: '系统1',
      type: 'line',
      data: [500, 600, 510, 620, 400, 550, 590, 580, 600, 580, 650, 440],
    },
    {
      name: '系统2',
      type: 'line',
      data: [200, 400, 500, 400, 1000, 700, 900, 800, 0, 300, 200, 250],
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
