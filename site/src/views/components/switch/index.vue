<template>
  <article class="doc">
    <h1 class="ux-heading">Switch
      <span class="subtitle">开关</span>
    </h1>
    <basic-demo />
    <disabled-demo />
    <loading-demo />
    <size-demo />
    <text-demo />
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
          <td>是否选中</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>checkedChildren</td>
          <td>选中时内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>uncheckedChildren</td>
          <td>非选中时内容</td>
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
          <td>loading</td>
          <td>是否显示为加载中</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>设置大小,可选值:
            <code>small</code>,
            <code>default</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>autofocus</td>
          <td>自动获取焦点</td>
          <td>Boolean</td>
          <td>false</td>
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
          <td>checkedChildren</td>
          <td>选中时内容</td>
        </tr>
        <tr>
          <td>uncheckedChildren</td>
          <td>非选中时内容</td>
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
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>change</td>
          <td>切换 switch 后触发</td>
          <td>Function(checked)</td>
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
          <td>获得焦点</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>失去焦点</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import DisabledDemo from './disabled.vue';
  import LoadingDemo from './loading.vue';
  import SizeDemo from './size.vue';
  import TextDemo from './text.vue';

  export default {
    components: {
      BasicDemo,
      DisabledDemo,
      LoadingDemo,
      SizeDemo,
      TextDemo,
    },
  };
</script>
