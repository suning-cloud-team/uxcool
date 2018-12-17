const colorPalette = [
  '#47A2FF',
  '#59CB74',
  '#FBD44C',
  '#53C8D1',
  '#F3657D',
  '#9860E5',
  '#445289',
  '#EBA675',
  '#73B988',
  '#5452D2',
];

// 坐标系公共配置
const axisCommon = () => ({
  axisLine: {
    lineStyle: {
      color: '#dbdbdb',
    },
  },
  axisLabel: {
    color: '#333',
  },
  splitLine: {
    lineStyle: {
      color: '#e4e4e4',
      type: 'dashed',
    },
  },
});

const theme = {
  color: colorPalette,
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#b4b4b4',
      },
      shadowStyle: {
        color: '#003879',
        opacity: 0.06,
      },
    },
    backgroundColor: 'rgba(4, 16, 42, .8)',
    padding: 16,
    borderRadius: 2,
  },
  legend: {
    textStyle: {
      color: '#666',
    },
  },
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  logAxis: axisCommon(),
  timeAxis: axisCommon(),
  line: {
    areaStyle: {
      opacity: 0.16,
    },
  },
  pie: {
    label: {
      color: '#333',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#dae2e4',
    },
  },
};

export default theme;
