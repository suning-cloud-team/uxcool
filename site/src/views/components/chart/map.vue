<template>
  <ux-demo title="地图"
           :height="200">
    <div slot="demo">
      <div ref="container"
           style="position: relative;">
        <ux-chart :options="mapOption"
                  ref="china"
                  height="500px"
                  :theme="theme"
                  @click="clickProvince"
                  v-show="!provinceMode"></ux-chart>
        <ux-chart ref="province"
                  :options="provinceOption"
                  height="500px"
                  :theme="theme"
                  v-show="provinceMode"></ux-chart>
      </div>
    </div>
    <div slot="desc">一般各类目内部之间的比较和外部的比较。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/chart/map';

  import UxChart from '@suning/uxcool/es/extra/chart';
  import UxMessage from '@suning/uxcool/es/message';

  // import chinaGeo from './chinaGeo';
  import chinaGeo from '@suning/uxcool/es/extra/chart/chinaGeo';

  // 注册全国地图和各省份地图
  Object.keys(chinaGeo).forEach(key => {
    UxChart.registerMap(key, chinaGeo[key]);
  });

  const mapOption = {
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
    },
    series: [
      {
        name: '数据示例',
        type: 'map',
        mapType: 'China',
        data: chinaGeo.China.features.map(({ properties }) => ({
          name: properties.name,
          value: Math.round(Math.random() * 1000),
        })),
      },
    ],
  };

  const provinceOption = {
    tooltip: {
      trigger: 'item',
    },
    visualMap: {
      min: 0,
      max: 1000,
      calculable: true,
    },
    series: [],
  };

  export default {
    data() {
      return {
        provinceMode: false,
        mapOption,
        provinceOption,
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      clickProvince({ name }) {
        const { top } = this.$refs.container.getBoundingClientRect();

        UxMessage.info({
          content: '点击地图画布空白区域返回全国地图',
          noticeStyle: {
            position: 'absolute',
            top: `${Math.max(top, 60)}px`,
            width: '100%',
          },
        });
        this.provinceMode = true;

        this.provinceOption.series = [
          {
            name: '数据示例',
            type: 'map',
            mapType: name,
            data: chinaGeo[name].features.map(({ properties }) => ({
              name: properties.name,
              value: Math.round(Math.random() * 200),
            })),
          },
        ];
        // 一开始隐藏的图显示后需要手动调一下resize方法
        this.$nextTick(() => {
          this.$refs.province.chart.resize();
        });
      },
    },
    mounted() {
      this.$refs.province.chart.getZr().on('click', e => {
        // 点击的空白区域
        if (!e.target) {
          this.provinceMode = false;
          this.provinceOption.series = [];

          this.$nextTick(() => {
            this.$refs.china.chart.resize();
          });
        }
      });
    },
  };
</script>
