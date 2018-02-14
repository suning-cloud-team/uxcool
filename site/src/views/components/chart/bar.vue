<template>
  <ux-demo title="柱状图" :height="200">
    <div slot="demo">
      <ux-chart :options="options" :theme="theme"></ux-chart>
    </div>
    <div slot="desc">一般各类目内部之间的比较和外部的比较。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/chart/bar';

const options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    right: '4%',
    data: ['系统1', '系统2', '系统3'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: {
    type: 'value',
    name: '访问量',
  },
  series: [
    {
      name: '系统1',
      type: 'bar',
      stack: 'total',
      barWidth: '30%',
      data: [320, 302, 301, 334, 390, 330, 320],
    },
    {
      name: '系统2',
      type: 'bar',
      stack: 'total',
      barWidth: '30%',
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: '系统3',
      type: 'bar',
      stack: 'total',
      barWidth: '30%',
      data: [220, 182, 191, 234, 290, 330, 310],
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
