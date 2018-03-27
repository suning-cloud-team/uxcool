<template>
  <article class="doc">
    <h1 class="ux-heading">Checkbox
      <span class="subtitle">多选框</span>
    </h1>
    <basic-demo/>
    <change-demo/>
    <group-demo/>
    <layout-demo/>
    <select-all-demo/>
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

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
          <td>checked</td>
          <td>是否选中(v-model 绑定)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>value</td>
          <td>值</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>null</td>
        </tr>
        <tr>
          <td>indeterminate</td>
          <td>设置 indeterminate 状态</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>label</td>
          <td>checkbox label 值</td>
          <td>String</td>
          <td></td>
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
          <td>切换选中时触发</td>
          <td>Function(e:{target,domEvent})</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="methods">Methods</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>focus</td>
          <td>设置焦点</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>设置焦点</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxcheckboxgroup">UxCheckboxGroup</h3>

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
          <td>options</td>
          <td>checkbox 列表</td>
          <td>Array&lt;Object:{label,value,disabled}|String&gt;</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>选中值</td>
          <td>Array&lt;String&gt;</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>disabled</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="events-1">Events</h4>

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
          <td>切换时调用</td>
          <td>Function(checkedVal:Array, prevCheckedVal: Array)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import ChangeDemo from './change.vue';
  import DisabledDemo from './disabled.vue';
  import GroupDemo from './group.vue';
  import LayoutDemo from './layout.vue';
  import SelectAllDemo from './selectAll.vue';

  export default {
    components: {
      BasicDemo,
      ChangeDemo,
      DisabledDemo,
      GroupDemo,
      LayoutDemo,
      SelectAllDemo,
    },
  };
</script>
