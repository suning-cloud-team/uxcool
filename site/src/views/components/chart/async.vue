<template>
  <ux-demo title="异步加载" :height="200">
    <div slot="demo">
      <div>
        <ux-chart :options="options"
                  :loading="loading"
                  :msg="msg"
                  :show-msg="showMsg"
                  :theme="theme"
                  loading-tip="正在加载"></ux-chart>
        <ux-button @click="loadData">load</ux-button>
      </div>
    </div>
    <div slot="desc">一般用于展示数据在某个维度的波动关系和总量。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/chart/async';

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

export default {
  data() {
    return {
      options,
      loading: false,
      showMsg: false,
      msg: '',
      code,
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    loadData() {
      this.loading = true;

      setTimeout(() => {
        this.options.series = [];
        this.loading = false;
        this.msg = '此时间段内无数据';
        this.showMsg = true;
      }, 1000);
    },
  },
};
</script>
