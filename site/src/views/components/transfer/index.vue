<template>
  <article class="doc">
    <h1 class="ux-heading">Transfer
      <span class="subtitle">穿梭框</span>
    </h1>
    <basic-demo/>
    <target-demo/>
    <search-demo/>
    <event-demo/>
    <render-demo/>
    <custom-demo/>
    <huge-demo/>
    <hr>
    <ux-heading id="api"
                level="2">API
    </ux-heading>

    <h3 class="mume-header"
        id="uxtransfer">UxTransfer</h3>

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
          <td>row-key</td>
          <td>自定义唯一性标示</td>
          <td>String,Function(item)</td>
          <td></td>
        </tr>
        <tr>
          <td>data-source</td>
          <td>数据源,需包含
            <code>key</code>字段,或通过
            <code>row-key</code>属性指定唯一标示,</td>
          <td>Array&lt;Object{key,title,label,disabled}&gt;</td>
          <td></td>
        </tr>
        <tr>
          <td>target-keys</td>
          <td>需在右侧显示的数据
            <code>key</code> 的集合(v-model)</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>selected-keys</td>
          <td>默认选中项
            <code>key</code> 的集合(左右两侧可一同设置)</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>render-item</td>
          <td>自定义渲染每行数据, 可返回
            <code>Object</code>,可包括
            <code>title</code>,
            <code>label</code>属性,也可返回
            <code>VNode</code>或
            <code>String</code>
          </td>
          <td>Function(item,direction)</td>
          <td></td>
        </tr>
        <tr>
          <td>list-style</td>
          <td>自定义穿梭框样式,
            <strong>当
              <code>lazy</code>模式时,不能设置
              <code>height</code>,只能通过
              <code>lazy</code>的
              <code>remain</code>属性撑开高度</strong>
          </td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>titles</td>
          <td>标题集合</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>operations</td>
          <td>自定义操作按钮文案</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>show-search</td>
          <td>是否显示搜索框</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>filter-option</td>
          <td>自定义搜索框筛选函数 -empty</td>
          <td>Function(searchText, item)=&gt;Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>search-placeholder</td>
          <td>搜索框 placeholder</td>
          <td>String</td>
          <td>请输入搜索内容</td>
        </tr>
        <tr>
          <td>not-found-content</td>
          <td>自定义列表为空时文案</td>
          <td>String</td>
          <td>无匹配结果</td>
        </tr>
        <tr>
          <td>lazy</td>
          <td>
            <code>lazy</code>模式,可设置
            <code>Object{height: 33, remain: 4}</code>,
            <code>height</code>:每行数据高度,
            <code>remain</code>:保留多少行(设置后可自动撑开高度),或
            <code>false</code>关闭
            <code>lazy</code>模式</td>
          <td>{height:33, remain:4}</td>
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
          <td>leftFooter</td>
          <td>自定义
            <code>左侧 footer</code> 内容(支持
            <code>slot-scope</code>和
            <code>slot</code>)
          </td>
        </tr>
        <tr>
          <td>rightFooter</td>
          <td>自定义
            <code>右侧 footer</code> 内容(支持
            <code>slot-scope</code>和
            <code>slot</code>)</td>
        </tr>
        <tr>
          <td>renderItem</td>
          <td>自定义渲染每行数据(只支持
            <code>slot-scope</code>)</td>
        </tr>
        <tr>
          <td>notFoundContent</td>
          <td>自定义列表为空时内容</td>
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
          <td>change</td>
          <td>穿梭框数据转移时触发</td>
          <td>Function(targetKeys, direction, moveKeys)</td>
        </tr>
        <tr>
          <td>select-change</td>
          <td>选中项改变时触发</td>
          <td>Function(sourceSelectedKeys, targetSelectedKeys, direction, changedKeys, checked)</td>
        </tr>
        <tr>
          <td>scroll</td>
          <td>列表滚动式触发</td>
          <td>Function(direction,DomEvent)</td>
        </tr>
        <tr>
          <td>search-change</td>
          <td>搜索框内容改变时触发</td>
          <td>Function(direction, searchText)</td>
        </tr>
        <tr>
          <td>search-clear</td>
          <td>搜索框清除时触发</td>
          <td>Function(direction)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import CustomDemo from './custom.vue';
  import EventDemo from './event.vue';
  import HugeDemo from './huge.vue';
  import RenderDemo from './render.vue';
  import SearchDemo from './search.vue';
  import TargetDemo from './target.vue';

  export default {
    components: {
      BasicDemo,
      CustomDemo,
      EventDemo,
      HugeDemo,
      RenderDemo,
      SearchDemo,
      TargetDemo,
    },
  };
</script>
