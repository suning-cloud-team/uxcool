<template>
  <div :class="clazz"
       :style="canvasStyle">
    <div ref="canvas"
         :style="canvasStyle" />
    <div v-show="loading"
         :class="loadingClass">
      <div class="loader">
        <svg class="circular"
             viewBox="25 25 50 50">
          <circle class="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none" />
        </svg>
        <div>{{ loadingTip }}</div>
      </div>
    </div>

    <div v-if="showMsg && !loading"
         :class="msgClass">
      <div :class="msgBoxClass">
        <p>{{ msg }}</p>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
  import echarts from 'echarts';
  // import 'echarts/lib/component/tooltip';
  // import 'echarts/lib/component/legend';
  import debounce from 'lodash/debounce';

  // default theme
  import light from './theme/light';
  import dark from './theme/dark';
  import uxcool from './theme/uxcool';

  // enumerating ECharts events for now
  const ACTION_EVENTS = [
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'geoselectchanged',
    'geoselected',
    'geounselected',
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'axisareaselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',
    'brush',
    'brushselected',
  ];

  const MOUSE_EVENTS = [
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mousedown',
    'mouseup',
    'globalout',
  ];

  const prefixCls = 'ux-chart';

  // register theme
  echarts.registerTheme('light', light);
  echarts.registerTheme('dark', dark);
  echarts.registerTheme('uxcool', uxcool);

  export default {
    name: 'UxChart',
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: '400px',
      },
      initOption: {
        type: Object,
        default() {
          return {};
        },
      },
      theme: {
        type: [String, Object],
        default() {
          return 'light';
        },
      },
      group: String,
      autoResize: {
        type: Boolean,
        default: true,
      },
      shallowWatch: Boolean,
      loading: Boolean,
      loadingTip: String,
      msg: {
        type: String,
        default: '暂无数据',
      },
      showMsg: Boolean,
      options: Object,
    },
    data() {
      return {
        loadingClass: `${prefixCls}-loading`,
        msgClass: `${prefixCls}-msg`,
        msgBoxClass: `${prefixCls}-msg-box`,
        chart: null,
      };
    },
    computed: {
      clazz() {
        return [`${prefixCls}`, this.theme];
      },
      canvasStyle() {
        return {
          width: this.width,
          height: this.height,
          position: 'relative',
        };
      },
    },
    watch: {
      group(group) {
        if (this.chart) {
          this.chart.group = group;
        }
      },
      theme: {
        deep: true,
        handler() {
          this.refresh();
        },
      },
    },

    created() {
      this.$watch(
        'options',
        (opt) => {
          if (!this.chart) {
            this.init();
          } else {
            this.chart.setOption(opt, true);
          }
        },
        {
          deep: !this.shallowWatch,
        }
      );
    },
    mounted() {
      if (this.options) {
        this.init();
      }
    },
    activated() {
      if (this.autoResize && this.chart) {
        this.chart.resize();
      }
    },
    beforeDestroy() {
      this.destroy();
    },
    methods: {
      mergeOption(...args) {
        if (this.chart) {
          this.chart.setOption(...args);
        }
      },

      init() {
        if (this.chart) {
          return;
        }

        const chart = echarts.init(this.$refs.canvas, this.theme, this.initOption);

        if (this.group) {
          chart.group = this.group;
        }

        chart.setOption(this.options, true);

        // expose ECharts events as custom events
        ACTION_EVENTS.forEach((event) => {
          chart.on(event, (params) => {
            this.$emit(event, params);
          });
        });
        MOUSE_EVENTS.forEach((event) => {
          chart.on(event, (params) => {
            this.$emit(event, params);
          });
        });

        if (this.autoResize) {
          this.resizeHandler = debounce(
            () => {
              chart.resize();
            },
            100,
            { leading: true }
          );
          window.addEventListener('resize', this.resizeHandler);
        }

        this.chart = chart;
      },
      destroy() {
        if (this.autoResize) {
          window.removeEventListener('resize', this.resizeHandler);
        }

        if (this.chart) {
          this.chart.dispose();
        }
        this.chart = null;
      },
      refresh() {
        this.destroy();
        this.init();
      },
    },
    // static methods
    connect(group) {
      let chartGroup = group;
      if (typeof group !== 'string') {
        chartGroup = group.map(chart => chart.chart);
      }
      echarts.connect(chartGroup);
    },
    disconnect(group) {
      echarts.disConnect(group);
    },
    registerMap(...args) {
      echarts.registerMap(...args);
    },
    registerTheme(...args) {
      echarts.registerTheme(...args);
    },
  };
</script>
