<template>
  <article class="doc">
    <h1 class="ux-heading">Menu
      <span class="subtitle">菜单</span>
    </h1>
    <demo-horizontal></demo-horizontal>
    <demo-inline></demo-inline>
    <!-- <demo-theme></demo-theme> -->
    <demo-unique></demo-unique>

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <div class="api">
      <table class="api-table">
        <caption>UxMenu Props</caption>
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
            <td>theme</td>
            <td>主题</td>
            <td>String</td>
            <td>light</td>
          </tr>
          <tr>
            <td>mode</td>
            <td>菜单类型 , 支持水平 , 内嵌两种模式</td>
            <td>horizontal | inline</td>
            <td>inline</td>
          </tr>
          <tr>
            <td>inline-indent</td>
            <td>inline 模式时菜单缩进宽度</td>
            <td>24</td>
            <td></td>
          </tr>
          <tr>
            <td>selected-keys</td>
            <td>选中的菜单项</td>
            <td>String[]</td>
            <td></td>
          </tr>
          <tr>
            <td>open-keys</td>
            <td>展开的 vSubMenu 项 ,name 属性关联</td>
            <td>String[]</td>
            <td></td>
          </tr>
          <tr>
            <td>visible</td>
            <td>是否展示</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>unique-opened</td>
            <td>是否同时只展开一个菜单</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxMenu Events</caption>
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
            <td>click</td>
            <td>点击 UxMenuItem 触发</td>
            <td>Function({name,item, eventPath,domevent})</td>
            <td></td>
          </tr>
          <tr>
            <td>open-change</td>
            <td>UxSubMenu 展开或关闭时触发</td>
            <td>Function(openKeys:String[])</td>
            <td></td>
          </tr>
          <tr>
            <td>deselect</td>
            <td>UxMenuItem 取消选中时触发</td>
            <td>Function(selectedKeys:String[])</td>
            <td></td>
          </tr>
          <tr>
            <td>select</td>
            <td>UxMenuItem 选中时触发</td>
            <td>Functioin(selectedKeys:String[])</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxMenuItem Props</caption>
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
            <td>name</td>
            <td>唯一标识</td>
            <td>String|Number</td>
            <td>''</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxSubMenu Props</caption>
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
            <td>name</td>
            <td>唯一标识</td>
            <td>String|Number</td>
            <td>''</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>是否禁用</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>title</td>
            <td>分组标题</td>
            <td>String</td>
            <td>''</td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxSubMenu Events</caption>
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
            <td>click</td>
            <td>点击 UxSubMenu 时触发</td>
            <td>Function({name, domEvent})</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxMenuItemGroup Props</caption>
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
            <td>分组标题</td>
            <td>String</td>
            <td>''</td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
<script>
  import DemoHorizontal from './horizontal.vue';
  import DemoInline from './inline.vue';
  import DemoTheme from './theme.vue';
  import DemoUnique from './unique.vue';

  export default {
    components: {
      DemoHorizontal,
      DemoInline,
      DemoTheme,
      DemoUnique,
    },
  };
</script>
