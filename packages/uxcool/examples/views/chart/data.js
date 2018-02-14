export function getPieOption() {
  return {
    title: {
      text: '未处理事件',
      x: 'center',
    },
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
        center: ['50%', '60%'],
        data: [
          { value: 30, name: '灾难' },
          { value: 80, name: '警告' },
          { value: 40, name: '严重' },
        ],
      },
    ],
  };
}

export function getLineOption() {
  return {
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
}

export function getBarOption() {
  return {
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
}

export function getAreaOption() {
  return {
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
    series: [
      {
        name: '系统1',
        type: 'line',
        lineStyle: {
          normal: {
            color: '#F66',
          },
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(255, 51, 51,.6)', // 0% 处的颜色
                },
                {
                  offset: 0.95,
                  color: 'rgba(255,107,107,0)', // 100% 处的颜色
                },
              ],
            },
          },
        },
        itemStyle: {
          normal: {
            color: '#F66',
          },
        },
        data: [200, 400, 500, 400, 1000, 700, 900, 800, 0, 300, 200, 250],
      },
    ],
  };
}

export function getMapOption() {
  return {
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
    },
    series: [
      // {
      //   name: '数据示例',
      //   type: 'map',
      //   mapType: 'China',
      //   data: [
      //     { name: '北京', value: Math.round(Math.random() * 1000) },
      //     { name: '天津', value: Math.round(Math.random() * 1000) },
      //     { name: '上海', value: Math.round(Math.random() * 1000) },
      //     { name: '重庆', value: Math.round(Math.random() * 1000) },
      //     { name: '河北', value: Math.round(Math.random() * 1000) },
      //     { name: '河南', value: Math.round(Math.random() * 1000) },
      //     { name: '云南', value: Math.round(Math.random() * 1000) },
      //     { name: '辽宁', value: Math.round(Math.random() * 1000) },
      //     { name: '黑龙江', value: Math.round(Math.random() * 1000) },
      //     { name: '湖南', value: Math.round(Math.random() * 1000) },
      //     { name: '安徽', value: Math.round(Math.random() * 1000) },
      //     { name: '山东', value: Math.round(Math.random() * 1000) },
      //     { name: '新疆', value: Math.round(Math.random() * 1000) },
      //     { name: '江苏', value: Math.round(Math.random() * 1000) },
      //     { name: '浙江', value: Math.round(Math.random() * 1000) },
      //     { name: '江西', value: Math.round(Math.random() * 1000) },
      //     { name: '湖北', value: Math.round(Math.random() * 1000) },
      //     { name: '广西', value: Math.round(Math.random() * 1000) },
      //     { name: '甘肃', value: Math.round(Math.random() * 1000) },
      //     { name: '山西', value: Math.round(Math.random() * 1000) },
      //     { name: '内蒙古', value: Math.round(Math.random() * 1000) },
      //     { name: '陕西', value: Math.round(Math.random() * 1000) },
      //     { name: '吉林', value: Math.round(Math.random() * 1000) },
      //     { name: '福建', value: Math.round(Math.random() * 1000) },
      //     { name: '贵州', value: Math.round(Math.random() * 1000) },
      //     { name: '广东', value: Math.round(Math.random() * 1000) },
      //     { name: '青海', value: Math.round(Math.random() * 1000) },
      //     { name: '西藏', value: Math.round(Math.random() * 1000) },
      //     { name: '四川', value: Math.round(Math.random() * 1000) },
      //     { name: '宁夏', value: Math.round(Math.random() * 1000) },
      //     { name: '海南', value: Math.round(Math.random() * 1000) },
      //     { name: '台湾', value: Math.round(Math.random() * 1000) },
      //     { name: '香港', value: Math.round(Math.random() * 1000) },
      //     { name: '澳门', value: Math.round(Math.random() * 1000) },
      //     { name: '南海诸岛', value: Math.round(Math.random() * 1000) },
      //   ],
      // },
    ],
  };
}
