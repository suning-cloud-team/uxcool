export default `
<template>
  <ux-chart :options="options"></ux-chart>
</template>

<script>

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
      radius: '55%',
      center: ['50%', '50%'],
      data: [{ value: 30, name: '灾难' }, { value: 80, name: '警告' }, { value: 40, name: '严重' }],
    },
  ],
};

export default {
  data() {
    return {
      options,
    };
  },
};
</script>
`;