<template>
  <div>
    <section>
      <h3>饼图示例</h3>
      <figure>
        <ux-chart :options="pieOption" />
      </figure>
    </section>
    <section>
      <h3>环形图示例</h3>
      <figure>
        <ux-chart :options="doughnutOption" />
      </figure>
    </section>
    <section>
      <h3>柱状图示例</h3>
      <figure>
        <ux-chart :options="barOption" />
      </figure>
    </section>
    <section>
      <h3>折线图示例</h3>
      <figure>
        <ux-chart :options="lineOption" />
      </figure>
    </section>
    <section>
      <h3>堆叠区域图示例</h3>
      <figure>
        <ux-chart :options="areaOption" />
      </figure>
    </section>
    <section>
      <h3>异步加载示例</h3>
      <figure>
        <ux-chart :options="asyncOption"
                  :loading="loading"
                  :msg="msg"
                  :show-msg="showMsg"
                  loading-tip="正在加载" />
      </figure>
      <ux-button @click="loadData">load</ux-button>
    </section>
    <section>
      <h3>地图示例</h3>
      <figure>
        <ux-chart v-show="!provinceMode"
                  :options="mapOption"
                  height="500px"
                  @click="clickProvince" />
        <ux-chart v-show="provinceMode"
                  ref="province"
                  :options="provinceOption"
                  height="500px" />
      </figure>
    </section>
    <section>
      <h3>自定义主题示例</h3>
      <figure>
        <ux-chart :options="barOption"
                  theme="ovilia-green" />
      </figure>
      <figure>
        <ux-chart :options="barOption"
                  theme="uxcool" />
      </figure>
    </section>
  </div>
</template>

<script>
  // import 'echarts/lib/chart/bar';
  // import 'echarts/lib/chart/pie';
  // import 'echarts/lib/chart/line';
  // import 'echarts/lib/chart/map';
  // import 'echarts/lib/component/title';
  // import 'echarts/lib/component/geo';
  // import 'echarts/lib/component/visualMap';
  // import 'echarts';

  import UxChart from '@suning/uxcool/src/extra/chart/Chart.vue';
  import UxButton from '@suning/uxcool/src/components/button/index';
  import UxMessage from '@suning/uxcool/src/components/message/index';

  import '@suning/uxcool/src/components/button/style/index.scss';
  import '@suning/uxcool/src/components/message/style/index.scss';
  import '@suning/uxcool/src/extra/chart/style/index.scss';

  import { getPieOption, getBarOption, getLineOption, getAreaOption, getMapOption } from './data';
  import chinaGeo from './chinaGeo';

  import theme from './theme.json';

  // 注册全国地图和各省份地图
  Object.keys(chinaGeo).forEach((key) => {
    UxChart.registerMap(key, chinaGeo[key]);
  });

  UxChart.registerTheme('ovilia-green', theme);

  const pieOption = getPieOption();
  const doughnutOption = getPieOption();
  const barOption = getBarOption();
  const lineOption = getLineOption();
  const areaOption = getAreaOption();
  const asyncOption = getAreaOption();
  const mapOption = getMapOption();
  const provinceOption = getMapOption();

  // 环形图只是饼图的一种，设置一下内外径就好了
  doughnutOption.series[0].radius = ['35%', '55%'];

  mapOption.series = [
    {
      name: '数据示例',
      type: 'map',
      mapType: 'China',
      data: chinaGeo.China.features.map(({ properties }) => ({
        name: properties.name,
        value: Math.round(Math.random() * 1000),
      })),
    },
  ];

  export default {
    components: {
      UxChart,
      UxButton,
      UxMessage,
    },
    data() {
      return {
        loading: false,
        showMsg: false,
        msg: '',
        pieOption,
        doughnutOption,
        barOption,
        lineOption,
        areaOption,
        asyncOption,
        mapOption,
        provinceOption,
        provinceMode: false,
      };
    },
    mounted() {
      this.$refs.province.chart.getZr().on('click', (e) => {
        // 点击的空白区域
        if (!e.target) {
          this.provinceMode = false;
          this.provinceOption.series = [];
        }
      });
    },
    methods: {
      loadData() {
        this.loading = true;

        setTimeout(() => {
          this.asyncOption.series = [];
          this.loading = false;
          this.msg = '此时间段内无数据';
          this.showMsg = true;
        }, 1000);
      },
      clickProvince({ name }) {
        UxMessage.info('点击地图画布空白区域返回全国地图');
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
  };
</script>
