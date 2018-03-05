<template>
  <article class="doc">
    <h1 class="ux-heading">Topology
      <span class="subtitle">拓扑图</span>
    </h1>

    <ux-heading level="2"
                id="overview">概述</ux-heading>
    <p>拓扑图底层使用
      <code>jsPlumb</code>连接节点，使用
      <code>jquery.panzoom</code>插件实现缩放和平移，使用
      <code>Dagre</code>实现节点布局。算法使用比较原始，所以实现效果并不一定完美，只能作为参考。</p>

    <demo-basic></demo-basic>
    <demo-async></demo-async>
    <demo-zoom></demo-zoom>

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
          <td>jsPlumbOption</td>
          <td>jsPlumb构造函数配置项，具体可以参照
            <a href="https://jsplumbtoolkit.com/community/doc/defaults.html"
               target="_blank">jsPlumb文档</a>
          </td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>graphOption</td>
          <td>dagre 布局配置项，{rankdir: 'TB', align: 'LR', nodesep: 30, edgesep:10, ranksep: 100, marginx: 50, marginy: 50 },具体可参照
            <a href="https://github.com/dagrejs/dagre/wiki#configuring-the-layout"
               target="_blank">dagre wiki</a>
          </td>
          <td>Object</td>
          <td>{}</td>
        </tr>
        <tr>
          <td>nodeClz</td>
          <td>拓扑节点类名。</td>
          <td>String</td>
          <td>'ux-topo-node'</td>
        </tr>
        <tr>
          <td>zoomable</td>
          <td>在画布上按住
            <code>Ctrl</code>滚动鼠标是否可缩放图。</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>panIgnoreChildrensEvents</td>
          <td>panzoom插件是否忽略子元素的时间。当设置为false时，拖拽拓扑节点会移动整个图。</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>minScale</td>
          <td>最小缩放比例。</td>
          <td>Number</td>
          <td>0.4</td>
        </tr>
        <tr>
          <td>maxScale</td>
          <td>最大缩放比例。</td>
          <td>Number</td>
          <td>2</td>
        </tr>
        <tr>
          <td>incScale</td>
          <td>缩放比例步长。</td>
          <td>Number</td>
          <td>0.1</td>
        </tr>
        <tr>
          <td>links</td>
          <td>包含节点连接信息的数组。结构为[{from: 'fromId', to: 'toId'}]</td>
          <td>Array</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>Methods</caption>
      <thead>
        <tr>
          <th>方法名</th>
          <th>描述</th>
          <th>参数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>panzoom</td>
          <td>调用panzoom插件实现缩放平移等操作，详见
            <a href="https://github.com/timmywil/jquery.panzoom"
               target="_blank">jquery.panzoom</a>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>on-zoom-change</td>
          <td>缩放时触发, 返回当前缩放比例</td>
          <td>Function(scale)</td>
        </tr>
      </tbody>
    </table>
  </article>

</template>

<style lang="scss">
  // .ux-topo-node {
  //   width: 100px;
  //   height: 100px;
  //   border: 1px solid #ccc;
  //   line-height: 100px;
  //   border-radius: 50%;
  //   text-align: center;
  // }
</style>

<script>
  import demoBasic from './basic.vue';
  import demoAsync from './async.vue';
  import demoZoom from './zoom.vue';

  export default {
    components: {
      demoBasic,
      demoAsync,
      demoZoom,
    },
  };
</script>
