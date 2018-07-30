<template>
  <article class="doc">
    <h1 class="ux-heading">List
      <span class="subtitle">列表</span>
    </h1>
    <size-demo />
    <grid-demo />
    <grid-responsive-demo />
    <load-more-demo />
    <pagination-demo />
    <vertical-demo />
    <render-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxlist">UxList</h3>

    <h4 class="mume-header"
        id="props">Props</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>data-source</td>
          <td>数据源</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>render-item</td>
          <td>渲染函数</td>
          <td>Function({item,index})</td>
          <td></td>
        </tr>
        <tr>
          <td>bordered</td>
          <td>是否显示边框</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>grid</td>
          <td>栅格配置,详见下表</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>item-layout</td>
          <td>
            <code>UxListItem</code>布局方式, 默认水平,设置为
            <code>vertical</code>时,为垂直排布</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>loading</td>
          <td>是否加载中,更多配置,请参考
            <code>Spin</code>组件</td>
          <td>Boolean|Object</td>
          <td>false</td>
        </tr>
        <tr>
          <td>pagination</td>
          <td>分页,支持
            <code>Pagination</code>配置</td>
          <td>Boolean|Object</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>大小,可选值:
            <code>small</code>,
            <code>default</code>,
            <code>large</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>split</td>
          <td>是否展示分割线</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>header</td>
          <td>头部内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>footer</td>
          <td>底部内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>empty-text</td>
          <td>无内容文案</td>
          <td>String</td>
          <td>暂无数据</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="events">Events</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>回调</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>pagination-change</td>
          <td>点击分页时触发</td>
          <td>Function(current,pageSize)</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>header</td>
          <td>自定义头部内容</td>
        </tr>
        <tr>
          <td>footer</td>
          <td>自定义底部内容</td>
        </tr>
        <tr>
          <td>loadMore</td>
          <td>自定义加载更多</td>
        </tr>
        <tr>
          <td>emptyText</td>
          <td>自定义无内容文案</td>
        </tr>
        <tr>
          <td>renderItem</td>
          <td>自定义渲染内容,只支持
            <code>slot-scope</code>, 参数为
            <code>Object{item,index}</code>
          </td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxlist-pagination-props">UxList pagination props</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>position</td>
          <td>分页显示位置,可选值:
            <code>top</code>,
            <code>bottom</code>,
            <code>both</code>
          </td>
          <td>String</td>
          <td>bottom</td>
        </tr>
      </tbody>
    </table>
    <p>更多配置,请查看
      <code>Pagination</code> 组件。</p>
    <h3 class="mume-header"
        id="uxlist-grid-props">UxList grid props</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>gutter</td>
          <td>元素间隔</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>column</td>
          <td>列数</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>xs</td>
          <td>
            <code>&lt;768px</code>时列数</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>sm</td>
          <td>
            <code>&gt;=768px</code>时列数</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>md</td>
          <td>
            <code>&gt;=992px</code>时列数</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>lg</td>
          <td>
            <code>&gt;=1200px</code>时列数</td>
          <td>Number</td>
          <td></td>
        </tr>
        <tr>
          <td>xl</td>
          <td>
            <code>&gt;=1600px</code>时列数</td>
          <td>Number</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxlistitem">UxListItem</h3>

    <h4 class="mume-header"
        id="props-1">Props</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>actions</td>
          <td>操作</td>
          <td>Array&lt;VNode&gt;
          </td>
          <td></td>
        </tr>
        <tr>
          <td>extra</td>
          <td>额外内容</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots-1">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>actions</td>
          <td>自定义操作</td>
        </tr>
        <tr>
          <td>extra</td>
          <td>自定义额外内容</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxlistitemmeta">UxListItemMeta</h3>

    <h4 class="mume-header"
        id="props-2">Props</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>参数名</th>
          <th>描述</th>
          <th>类型</th>
          <th>默认</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>标题</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>desc</td>
          <td>描述</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots-2">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>avatar</td>
          <td>自定义头像(
            <code>itemLayout === vertical</code>时不显示))</td>
        </tr>
        <tr>
          <td>title</td>
          <td>自定义标题</td>
        </tr>
        <tr>
          <td>desc</td>
          <td>自定义模式</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import SizeDemo from './size.vue';
  import GridDemo from './grid.vue';
  import GridResponsiveDemo from './grid-responsive.vue';
  import LoadMoreDemo from './loadmore.vue';
  import PaginationDemo from './pagination.vue';
  import VerticalDemo from './vertical.vue';
  import RenderDemo from './render.vue';

  export default {
    components: {
      BasicDemo,
      SizeDemo,
      GridDemo,
      GridResponsiveDemo,
      LoadMoreDemo,
      PaginationDemo,
      VerticalDemo,
      RenderDemo,
    },
  };
</script>
