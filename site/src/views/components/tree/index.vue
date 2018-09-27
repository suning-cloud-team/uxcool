<template>
  <article class="doc">
    <h1 class="ux-heading">Tree
      <span class="subtitle">树</span>
    </h1>
    <basic-demo />
    <async-demo />
    <filter-demo />
    <render-demo />
    <huge-demo />
    <hr>
    <ux-heading id="api"
                level="2">API</ux-heading>
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
          <td>selected-keys</td>
          <td>需选中节点的
            <code>key</code>
          </td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>checked-keys</td>
          <td>需选中节点
            <code>checkbox</code>框的
            <code>key</code>
          </td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>expanded-keys</td>
          <td>需展开节点的
            <code>key</code>
          </td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>row-key</td>
          <td>自定义唯一性标示</td>
          <td>String|Function(originNode)</td>
          <td>key</td>
        </tr>
        <tr>
          <td>show-line</td>
          <td>是否显示连接线</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>selectable</td>
          <td>设置节点是否可被选中</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>checkable</td>
          <td>&#x662F;&#x5426;&#x663E;&#x793A;<code>Checkbox</code></td>
          <td>BOolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>check-strict</td>
          <td>父子节点之间是否不再关联选中</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>multiple</td>
          <td>是否可多选节点</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>default-expand-all</td>
          <td>是否默认展开所有节点,(
            <strong>大数据量时慎用</strong>),非响应属性</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>default-expand-parent</td>
          <td>是否当子节点展开时,父节点也同时展开, 非响应属性</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>default-expand-parent</td>
          <td>是否当子节点展开时,父节点也同时展开, 非响应属性</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>lazy</td>
          <td>是否异步加载</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>load-data</td>
          <td>异步加载数据函数</td>
          <td>Function(treeNode)=&gt;Promise</td>
          <td></td>
        </tr>
        <tr>
          <td>render-content</td>
          <td>自定义渲染内容</td>
          <td>Function({NOde: TreeNode})=&gt;VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>filter-option</td>
          <td>自定义过滤函数</td>
          <td>Function(searchInput, originNode)=&gt;Boolean</td>
          <td></td>
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
          <td>renderContent</td>
          <td>自定义渲染内容</td>
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
          <td>check</td>
          <td>
            <code>checkbox</code>被选中时触发</td>
          <td>Function(checkedKeys,{checked:Boolean,checkedNodes,halfCheckedKeys, node:OriginNode, vm,e:DomEvent})</td>
        </tr>
        <tr>
          <td>expand</td>
          <td>节点展开时触发</td>
          <td>Function(expandedKeys, {expanded:Boolean, expandedNodes, node:OriginNode, vm, e:DomEvent})</td>
        </tr>
        <tr>
          <td>select</td>
          <td>节点选中时触发</td>
          <td>Function(selectedKeys, {selected: Boolean, selectedNodes, node:OriginNode, vm, e:domEvent})</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="methods">Methods</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>方法名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>filter</td>
          <td>筛选树节点</td>
          <td>Function(searchInput)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import AsyncDemo from './async.vue';
  import FilterDemo from './filter.vue';
  import HugeDemo from './huge.vue';
  import RenderDemo from './render.vue';

  export default {
    components: {
      BasicDemo,
      AsyncDemo,
      FilterDemo,
      HugeDemo,
      RenderDemo,
    },
  };
</script>
