const colorPalette = [
  '#009dd8',
  '#ff9500',
  '#893eff',
  '#00b70d',
  '#00a7b4',
  '#ff56a1',
  '#009946',
  '#db802e',
  '#00d8ff',
  '#00ffc0',
  '#ffb300',
  '#7ed321',
  '#ff81f5',
  '#f8e81c',
  '#c48cff',
  '#b8ff65',
];

const textColor = '#666';
const lineColor = '#ddd';

const axisCommon = () => ({
  axisLine: {
    show: false,
  },
  axisTick: {
    show: false,
  },
  axisLabel: {
    textStyle: {
      color: textColor,
    },
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: lineColor,
    },
  },
  splitArea: {
    show: true,
    areaStyle: {
      color: 'rgba(255,255,255,.5)',
      opacity: 0.5,
    },
  },
});

const theme = {
  color: colorPalette,
  backgroundColor: 'transparent',
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#999',
        type: 'dashed',
      },
      crossStyle: {
        color: '#999',
      },
    },
    padding: 10,
  },
  legend: {
    textStyle: {
      color: textColor,
    },
    inactiveColor: '#999',
    icon: 'rect',
    itemWidth: 10,
    itemHeight: 10,
  },
  textStyle: {
    color: textColor,
  },
  title: {
    textStyle: {
      color: textColor,
      fontWeight: 'normal',
    },
    subtextStyle: {
      color: 'rgba(255,255,255,0.4)',
    },
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: textColor,
      },
      emphasis: {
        borderColor: 'rgba(255,255,255,0.8)',
      },
    },
  },
  dataZoom: {
    backgroundColor: 'rgba(47, 69, 84, 0)',
    dataBackgroundColor: 'rgba(255, 255, 255, .4)',
    fillerColor: 'rgba(167, 183, 204, 0.5)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: textColor,
    },
  },
  visualMap: {
    left: 'left',
    itemWidth: 30,
    inRange: {
      color: ['#c8f1ff', '#46caf6'],
    },
    outOfRange: {
      color: ['#fff'],
    },
    textStyle: {
      color: textColor,
    },
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 2,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbol: 'circle',
    symbolSize: 2,
    smooth: false,
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: 2,
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    symbol: 'circle',
    symbolSize: 4,
    smooth: false,
  },
  pie: {
    label: {
      normal: {
        color: textColor,
        padding: [0, 15],
      },
    },
    labelLine: {
      normal: {
        length: 10,
        length2: 40,
      },
    },
  },
  map: {
    itemStyle: {
      normal: {
        borderColor: '#ccc',
        areaColor: '#fff',
        borderWidth: 1,
      },
      emphasis: {
        borderColor: '#00C7DD',
        areaColor: '#AAF6FF',
        borderWidth: 2,
      },
    },
    label: {
      emphasis: {
        show: true,
        color: '#00C7DD',
      },
    },
  },
  timeline: {
    lineStyle: {
      color: textColor,
    },
    itemStyle: {
      normal: {
        color: colorPalette[1],
      },
    },
    label: {
      normal: {
        textStyle: {
          color: textColor,
        },
      },
    },
    controlStyle: {
      normal: {
        color: textColor,
        borderColor: textColor,
      },
    },
  },
  timeAxis: axisCommon(),
  logAxis: axisCommon(),
  valueAxis: axisCommon(),
  categoryAxis: axisCommon(),
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: textColor,
        },
      },
      emphasis: {
        textStyle: {
          color: textColor,
        },
      },
    },
  },
  graph: {
    color: colorPalette,
  },
  gauge: {
    title: {
      textStyle: {
        color: textColor,
      },
    },
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B',
      },
    },
  },
};

export default theme;
