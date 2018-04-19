<template>
  <article class="doc">
    <h1 class="ux-heading">Button
      <span class="subtitle">按钮</span>
    </h1>
    <basic-demo />
    <icon-demo />
    <disabled-demo />
    <ghost-demo />
    <group-demo />
    <loading-demo />
    <size-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxButton Props</caption>
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
          <td>type</td>
          <td>button 类型,可选值:
            <code>primary</code>,
            <code>ghost</code>,
            <code>dashed</code>,
            <code>danger</code>或不设
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>shape</td>
          <td>button 形状,可选值:
            <code>circle</code> 或 不设
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>button 大小, 可选值 :
            <code>small</code>,
            <code>default</code>,
            <code>large</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>loading</td>
          <td>显示加载图标</td>
          <td>Boolean|{delay:Number}</td>
          <td>false</td>
        </tr>
        <tr>
          <td>htmlType</td>
          <td>button html 类型,
            <code>submit</code>,
            <code>button</code>,
            <code>reset</code>
          </td>
          <td>String</td>
          <td>button</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>自定义 icon (默认支持 uxCool 图标库图标)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>ghost</td>
          <td>背景透明</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>href</td>
          <td>button 链接(内部使用 a 标签代替 button 标签, 支持 a 标签属性)</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxButton Events</caption>
      <thead>
        <tr>
          <th>事件名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>click</td>
          <td>点击 button 时触发</td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxButtonGroup Props</caption>
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
          <td>size</td>
          <td>button 大小, 可选值 :
            <code>small</code>,
            <code>default</code>,
            <code>large</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </article>
</template>


<script>
  import BasicDemo from './basic.vue';
  import DisabledDemo from './disabled.vue';
  import GhostDemo from './ghost.vue';
  import GroupDemo from './group.vue';
  import IconDemo from './icon.vue';
  import LoadingDemo from './loading.vue';
  import SizeDemo from './size.vue';

  export default {
    components: {
      BasicDemo,
      DisabledDemo,
      GhostDemo,
      GroupDemo,
      IconDemo,
      LoadingDemo,
      SizeDemo,
    },
  };
</script>
