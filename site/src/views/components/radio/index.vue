<template>
  <article class="doc">
    <h1 class="ux-heading">Radio
      <span class="subtitle">单选框</span>
    </h1>
    <basic-demo/>
    <disabled-demo/>
    <single-demo/>
    <group-demo/>
    <group-name-demo/>
    <vertical-demo/>
    <button-demo/>
    <size-demo/>
    <hr>
    <ux-heading level="2"
                id="api">
      API
    </ux-heading>
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
          <td>label</td>
          <td>radio label 值</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>name</td>
          <td>radio name</td>
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
        id="uxradiobutton">UxRadioButton</h3>

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
          <td>label</td>
          <td>radio label 值</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>name</td>
          <td>radio name</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxradiogroup">UxRadioGroup</h3>

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
          <td>type</td>
          <td>radio 组类型 defalut|button</td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>name</td>
          <td>设置 group 中 radio 的 name</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>options</td>
          <td>radio 列表</td>
          <td>Array&lt;Object:{label,value,disabled}|String&gt;</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>选中值</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>disabled</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>设置 radioButton 大小, type='button'时有效. large|default|small</td>
          <td>String</td>
          <td>default</td>
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
          <td>Function(checkedVal:String,prevCheckedVal:String)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import ButtonDemo from './button.vue';
  import DisabledDemo from './disabled.vue';
  import GroupNameDemo from './groupName.vue';
  import SingleDemo from './single.vue';
  import SizeDemo from './size.vue';
  import GroupDemo from './group.vue';
  import VerticalDemo from './vertical.vue';

  export default {
    components: {
      BasicDemo,
      ButtonDemo,
      DisabledDemo,
      GroupDemo,
      GroupNameDemo,
      SingleDemo,
      SizeDemo,
      VerticalDemo,
    },
  };
</script>
