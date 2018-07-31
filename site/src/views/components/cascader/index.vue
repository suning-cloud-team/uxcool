<template>
  <article class="doc">
    <h1 class="ux-heading">Cascader
      <span class="subtitle">级联选择</span>
    </h1>
    <basic-demo />
    <hover-demo />
    <disabled-demo />
    <custom-demo />
    <change-on-select-demo />
    <event-demo />
    <async-demo />
    <render-demo />
    <focus-demo />
    <hr>
    <ux-heading id="api"
                level="2">API</ux-heading>

    <h3 class="mume-header">UxCascader</h3>

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
          <td>data-source</td>
          <td>数据源</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>load-data</td>
          <td>动态加载数据</td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>值(v-model),数组位置与层级对应</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>popup-class</td>
          <td>自定义弹层类名</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>popup-style</td>
          <td>自定义弹层样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>popup-placement</td>
          <td>弹层位置, 可选值:
            <code>topLeft</code>,
            <code>topRight</code>,
            <code>bottomLeft</code>,
            <code>bottomRight</code>
          </td>
          <td>String</td>
          <td>bottomLeft</td>
        </tr>
        <tr>
          <td>popup-visible</td>
          <td>控制弹层是否显示</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>get-popup-container</td>
          <td>自定义弹层容器</td>
          <td>Function()=&gt;HTMLElement</td>
          <td></td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>输入框占位文案</td>
          <td>String</td>
          <td>请选择</td>
        </tr>
        <tr>
          <td>size</td>
          <td>输入框大小,可选址:
            <code>large</code>,
            <code>small</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否可清除</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>expand-trigger</td>
          <td>触发弹层方式,可选值:
            <code>hover</code>,
            <code>click</code>
          </td>
          <td>String</td>
          <td>click</td>
        </tr>
        <tr>
          <td>change-on-select</td>
          <td>是否实时更新选中值</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>field-names</td>
          <td>自定义
            <code>data-source</code>中的
            <code>label</code>,
            <code>value</code>,
            <code>children</code>
            键名</td>
          <td>Object</td>
          <td>{ label: 'label', value:'value', children: 'children'}</td>
        </tr>
        <tr>
          <td>display-render</td>
          <td>自定义选中值渲染函数</td>
          <td>Function=&gt;VNode</td>
          <td>(labels, nodes)=&gt; labels.join(' \ ')</td>
        </tr>
        <tr>
          <td>render-label</td>
          <td>自定义
            <code>label</code>
            渲染函数</td>
          <td>Function=&gt;VNode</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 id="slots"
        class="mume-header">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>renderLabel</td>
          <td>自定义渲染
            <code>label</code>(仅支持
            <code>slot-scope</code>)
          </td>
        </tr>
      </tbody>
    </table>
    <h4 id="events"
        class="mume-header">Events</h4>

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
          <td>选择完成后触发</td>
          <td>Function(values,nodes)</td>
        </tr>
        <tr>
          <td>popup-visible-change</td>
          <td>显示/隐藏 弹窗后触发</td>
          <td>Function(visible)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import HoverDemo from './hover.vue';
  import DisabledDemo from './disabled.vue';
  import CustomDemo from './custom.vue';
  import changeOnSelectDemo from './changeOnSelect.vue';
  import EventDemo from './event.vue';
  import AsyncDemo from './async.vue';
  import RenderDemo from './render.vue';
  import FocusDemo from './focus.vue';

  export default {
    components: {
      BasicDemo,
      HoverDemo,
      DisabledDemo,
      CustomDemo,
      changeOnSelectDemo,
      EventDemo,
      AsyncDemo,
      RenderDemo,
      FocusDemo,
    },
  };
</script>
