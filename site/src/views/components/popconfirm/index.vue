<template>
  <article class="doc">
    <h1 class="ux-heading">Popconfirm
      <span class="subtitle">气泡确认框</span>
    </h1>
    <basic-demo/>
    <disabled-demo/>
    <slot-demo/>
    <custom-demo/>
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
          <td>title</td>
          <td>内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>okText</td>
          <td>确定按钮文案</td>
          <td>String</td>
          <td>确定</td>
        </tr>
        <tr>
          <td>okType</td>
          <td>确定按钮 类型与
            <code>button</code>类型对应
          </td>
          <td>String</td>
          <td>primary</td>
        </tr>
        <tr>
          <td>cancelText</td>
          <td>取消按钮文案</td>
          <td>String</td>
          <td>取消</td>
        </tr>
      </tbody>
    </table>
    <blockquote>
      <p>更多属性请参考
        <a href="http://uxcool.cnsuning.com/vue/index.html#/components/tooltip">UxTooltip</a>
      </p>
    </blockquote>
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
          <td>title</td>
          <td>自定义内容</td>
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
          <td>confirm</td>
          <td>点击确定按钮时触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>cancel</td>
          <td>点击取消按钮时触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>visible-change</td>
          <td>popconfirm 显示/隐藏时触发</td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import DisabledDemo from './disabled.vue';
  import CustomDemo from './custom.vue';
  import SlotDemo from './slot.vue';

  export default {
    components: {
      BasicDemo,
      DisabledDemo,
      CustomDemo,
      SlotDemo,
    },
  };
</script>
