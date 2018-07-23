<template>
  <article class="doc">
    <h1 class="ux-heading">TreeSelect
      <span class="subtitle">树选择</span>
    </h1>
    <basic-demo/>
    <async-demo />
    <search-demo />
    <multiple-demo />
    <checkable-demo />
    <hr>
    <ux-heading level="2">API</ux-heading>
    <h3 class="mume-header">UxTree</h3>

    <h4 class="mume-header">Props</h4>

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
          <td>value</td>
          <td>值</td>
          <td>String|Number|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>大小,可选值:
            <code>large</code>,
            <code>small</code>,
            <code>default</code>,</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>visible</td>
          <td>是否显示下拉面板</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>multiple</td>
          <td>是否支持多选,(
            <code>tree-checkable=true</code>时,自动设置为
            <code>true</code>)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-arrow</td>
          <td>是否显示下拉箭头(
            <strong>仅单选有效</strong>)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-search</td>
          <td>是否显示搜索框(
            <strong>仅单选有效, 多选搜索框一直显示</strong>)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>search-placeholder</td>
          <td>搜索框 placeholder(
            <strong>仅单选有效</strong>)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>auto-clear-search-value</td>
          <td>当选中值时是否清楚搜索框内容</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>max-tag-count</td>
          <td>多选时最多显示多少个
            <code>tag</code>
          </td>
          <td>Number|String</td>
          <td></td>
        </tr>
        <tr>
          <td>max-tag-placeholder</td>
          <td>隐藏
            <code>tag</code>时显示的按钮文案</td>
          <td>String|Function(hideNodes)=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>max-tag-text-length</td>
          <td>
            <code>tag</code>最多显示文案长度</td>
          <td>Number|String</td>
          <td></td>
        </tr>
        <tr>
          <td>show-checked-strategy</td>
          <td>
            <code>checkable</code>模式时,选中项显示方式,可选值:
            <code>SHOW_ALL</code> 显示所有选中节点,
            <code>SHOW_PARENT</code>显示所有最上层的父节点, 以及父节点未选中的子节点,
            <code>SHOW_CHILD</code>显示所有选中的子节点,</td>
          <td>String</td>
          <td>SHOW_CHILD</td>
        </tr>
        <tr>
          <td>tree-data</td>
          <td>树数据</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>tree-checkable</td>
          <td>是否显示
            <code>checkbox</code>
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>tree-check-strict</td>
          <td>是否使用严格选中模式</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>tree-default-expandAll</td>
          <td>是否默认展开所有节点(大数据量时
            <strong>慎用</strong>)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>tree-expanded-keys</td>
          <td>展开的节点
            <code>key</code>列表</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>lazy</td>
          <td>是否延时加载树数据</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>load-data</td>
          <td>异步加载数据</td>
          <td>Function(node)=&gt;Promise</td>
          <td></td>
        </tr>
        <tr>
          <td>render-content</td>
          <td>自定义树节点内容</td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>filter-option</td>
          <td>自定义树过滤函数</td>
          <td>Function(searchInput, originNode)=&gt;Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>not-found-content</td>
          <td>自定义过滤无节点时文案</td>
          <td>Not Found</td>
          <td></td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示清除按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>选择框
            <code>placeholder</code>
          </td>
          <td>String</td>
          <td>Please select</td>
        </tr>
        <tr>
          <td>popup-class</td>
          <td>自定义下拉面板类名</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>popup-style</td>
          <td>自定义下拉面板样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>get-popup-container</td>
          <td>自定义下拉面板包裹容器</td>
          <td>Function()=&gt;HTMLElement</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header">Events</h4>

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
          <td>change</td>
          <td>选中值变化时触发</td>
          <td>Function(value)</td>
        </tr>
        <tr>
          <td>search</td>
          <td>搜索框变化时触发</td>
          <td>Function(searchValue)</td>
        </tr>
      </tbody>
    </table>

  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import AsyncDemo from './async.vue';
  import SearchDemo from './search.vue';
  import MultipleDemo from './multiple.vue';
  import CheckableDemo from './checkable.vue';

  export default {
    components: {
      BasicDemo,
      AsyncDemo,
      SearchDemo,
      MultipleDemo,
      CheckableDemo,
    },
  };
</script>
