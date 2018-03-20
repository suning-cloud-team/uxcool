<template>
  <article class="doc">
    <h1 class="ux-heading">Chart
      <span class="subtitle">图表</span>
    </h1>

    <pie-chart></pie-chart>
    <doughnut-chart></doughnut-chart>
    <bar-chart></bar-chart>
    <line-chart></line-chart>
    <area-chart></area-chart>
    <async-chart></async-chart>
    <map-chart></map-chart>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>Props</caption>
      <thead>
        <tr>
          <th>属性</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>width</td>
          <td>图表宽度</td>
          <td>String</td>
          <td>100%</td>
        </tr>
        <tr>
          <td>height</td>
          <td>图表高度</td>
          <td>String</td>
          <td>400px</td>
        </tr>
        <tr>
          <td>init-option</td>
          <td>初始化图表的附加参数，详见
            <a href="http://echarts.baidu.com/api.html#echarts.init"
               target="_blank">Echarts文档</a>
          </td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>theme</td>
          <td>Echarts主题,可以是一个主题的配置对象，也可以是注册过的主题名称。响应式属性。</td>
          <td>String | Object</td>
          <td>'dark'</td>
        </tr>
        <tr>
          <td>group</td>
          <td>图表分组，用于联动。响应式属性。</td>
          <td>String </td>
          <td>-</td>
        </tr>
        <tr>
          <td>auto-resize</td>
          <td>是否自动调整尺寸</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>shallow-watch</td>
          <td>是否浅watch。对于一些对性能有要求的，开启浅侦查可以提高性能。不过注意当图表配置项变化时，需要改变对应的配置项对象引用。</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>loading</td>
          <td>是否加载中状态</td>
          <td>Boolean </td>
          <td>false</td>
        </tr>
        <tr>
          <td>loading-tip</td>
          <td>加载中提示语</td>
          <td>String </td>
          <td>-</td>
        </tr>
        <tr>
          <td>show-msg</td>
          <td>是否显示图表提示消息</td>
          <td>Boolean </td>
          <td>false</td>
        </tr>
        <tr>
          <td>msg</td>
          <td>图表提示语， 当且仅当
            <code>loading</code>为false以及
            <code>show-msg</code>为true时才显示。</td>
          <td>String </td>
          <td>暂无数据</td>
        </tr>
        <tr>
          <td>options</td>
          <td>图表配置项，required, 响应式属性。 详见
            <a href="http://echarts.baidu.com/option.html"
               target="_blank">Echarts文档</a>
          </td>
          <td>Object </td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>静态方法</caption>
      <thead>
        <tr>
          <th>方法名</th>
          <th>方法签名</th>
          <th>描述</th>
        </tr>
        <tr>
          <td>connect</td>
          <td>function (group: string|Array)</td>
          <td>底层调用echarts.connect(group), 详见
            <a href="http://echarts.baidu.com/api.html#echarts.connect"
               target="_blank">echarts.connect</a>
          </td>
        </tr>
        <tr>
          <td>disconnect</td>
          <td>function (group: string)</td>
          <td>底层调用echarts.disconnect(group), 详见
            <a href="http://echarts.baidu.com/api.html#echarts.disconnect"
               target="_blank">echarts.disconnect</a>
          </td>
        </tr>
        <tr>
          <td>registerMap</td>
          <td>function (mapName: string, geoJson: Object, specialAreas?: Object)</td>
          <td>注册可用的地图，必须在包括 geo 组件或者 map 图表类型的时候才能使用。详见
            <a href="http://echarts.baidu.com/api.html#echarts.registerMap"
               target="_blank">echarts.registerMap</a>
          </td>
        </tr>
        <tr>
          <td>registerTheme</td>
          <td>function (themeName: string, theme: Object)</td>
          <td>详见
            <a href="http://echarts.baidu.com/api.html#echarts.registerTheme"
               target="_blank">echarts.registerTheme </a>
          </td>
        </tr>
      </thead>
    </table>
  </article>
</template>

<script>
  import pieChart from './pie.vue';
  import doughnutChart from './doughnut.vue';
  import barChart from './bar.vue';
  import lineChart from './line.vue';
  import areaChart from './area.vue';
  import asyncChart from './async.vue';

  export default {
    components: {
      pieChart,
      doughnutChart,
      barChart,
      lineChart,
      areaChart,
      asyncChart,
      mapChart: () => import('./map.vue'),
    },
  };
</script>
