<template>
  <article class="doc">
    <h1 class="ux-heading">Select
      <span class="subtitle">下拉框</span>
    </h1>

    <demo-basic></demo-basic>
    <demo-multiple></demo-multiple>
    <demo-search></demo-search>

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxSelect Props</caption>
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
          <td>选中值</td>
          <td>String,Number,Array</td>
          <td></td>
        </tr>
        <tr>
          <td>mode</td>
          <td>select类型</td>
          <td>multiple|default</td>
          <td>default</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示清除按钮</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-search</td>
          <td>mode=default时是否可搜索</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>占位符</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>show-arrow</td>
          <td>mode=default时是否显示下拉箭头</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>dropdown-menu-style</td>
          <td>自定义下拉框样式</td>
          <td>Array,Object</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxSelect Events</caption>
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
          <td>值变化后触发</td>
          <td>Function(value)</td>
        </tr>
        <tr>
          <td>select</td>
          <td>Option选中后触发</td>
          <td>Function(value, option)</td>
        </tr>
        <tr>
          <td>deselect</td>
          <td>mode!=default时,Option取消选中后触发</td>
          <td>Function(value, option)</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxOption Props</caption>
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
          <td>唯一值(required)</td>
          <td>String,Number</td>
          <td></td>
        </tr>
        <tr>
          <td>label</td>
          <td>选项标签(不设置默认为value值)</td>
          <td>String</td>
          <td></td>
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
      <caption>UxOptionGroup Props</caption>
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
          <td>label</td>
          <td>分组组名(required)</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </article>
</template>


<script>
  import DemoBasic from './basic.vue';
  import DemoMultiple from './multiple.vue';
  import DemoSearch from './search.vue';

  export default {
    components: {
      DemoBasic,
      DemoMultiple,
      DemoSearch,
    },
  };
</script>
