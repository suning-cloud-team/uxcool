<template>
  <article class="doc">
    <h1 class="ux-heading">Tree
      <span class="subtitle">树</span>
    </h1>
    <basic-demo />
    <async-demo />
    <async-rebuild-demo />
    <filter-demo />
    <render-demo />
    <huge-demo />
    <virtual-tree-demo/>
    <variable-tree-demo/>
    <pagemode-tree-demo/>
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
          <td>Boolean</td>
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
        <tr>
          <td>rebuildAsyncTree</td>
          <td>重置异步树</td>
          <td>Function(nodes)</td>
        </tr>
        <tr>
          <td>getStoreNode</td>
          <td>根据key获取组件内部渲染节点用的节点数据，内部方法，一般不推荐使用。</td>
          <td>Function(key) => Object | null</td>
        </tr>
      </tbody>
    </table>

    <h4 class="mume-header"
        id="vitual-tree-api">UxVirtualTree API</h4>
    <table class="api-table">
      <caption>UxTree API均支持，同时新增以下几个API</caption>
      <thead>
      <tr>
        <th>参数名</th>
        <th>描述</th>
        <th>类型</th>
        <th>默认</th>
      </tr>
      </thead>
      <tbody>
      <!--virtual tree own api-->
      <tr>
        <td>view-count</td>
        <td>视窗显示条目的个数</td>
        <td>Number</td>
        <td>30</td>
      </tr>
      <tr>
        <td>bench</td>
        <td>已生成但在视窗外的条目个数，默认值与view-count一致</td>
        <td>Number</td>
        <td></td>
      </tr>
      <tr>
        <td>pagemode</td>
        <td>是否让虚拟列表随着窗口页面滚动</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>auto-height</td>
        <td>是否自动计算每列高度，适用于行高不一致的情况</td>
        <td>Boolean</td>
        <td>false</td>
      </tr>
      <tr>
        <td>scrollelement</td>
        <td>让列表滚动的父元素，即使用父元素的滚动条来控制树的滚动展示，如果pagemode设置为true，那么这个属性将无效</td>
        <td>HTMLElement</td>
        <td>false</td>
      </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import AsyncDemo from './async.vue';
  import AsyncRebuildDemo from './async-rebuild.vue';
  import FilterDemo from './filter.vue';
  import HugeDemo from './huge.vue';
  import RenderDemo from './render.vue';
  import VirtualTreeDemo from './virtual-tree.vue';
  import VariableTreeDemo from './variable-tree.vue';
  import PagemodeTreeDemo from './pagemode-tree.vue';

  export default {
    components: {
      BasicDemo,
      AsyncDemo,
      AsyncRebuildDemo,
      FilterDemo,
      HugeDemo,
      RenderDemo,
      VirtualTreeDemo,
      VariableTreeDemo,
      PagemodeTreeDemo,
    },
  };
</script>
