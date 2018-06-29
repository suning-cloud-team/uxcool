<template>
  <article class="doc">
    <h1 class="ux-heading">Rate
      <span class="subtitle">评分</span>
    </h1>
    <basic-demo />
    <half-demo />
    <text-demo />
    <disabled-demo />
    <clear-demo />
    <event-demo/>
    <custom-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxrate">UxRate</h3>

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
          <td>value</td>
          <td>值</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>count</td>
          <td>star 数量</td>
          <td>Number</td>
          <td>5</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否只读</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>allow-half</td>
          <td>是否允许半选</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否支持再次点击后清除</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>character</td>
          <td>自定义字符</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>autofocus</td>
          <td>是否自动获取焦点</td>
          <td>Boolean</td>
          <td>false</td>
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
          <td>选择 star 时回调</td>
          <td>Function(value:Number)</td>
        </tr>
        <tr>
          <td>hover-change</td>
          <td>鼠标在
            <code>rate</code>上移动时触发</td>
          <td>Function(value: Number)</td>
        </tr>
        <tr>
          <td>focus</td>
          <td>获取焦点是触发</td>
          <td>Function()</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>失去焦点是触发</td>
          <td>Function()</td>
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
          <td>character</td>
          <td>自定义字符(
            <strong>只支持
              <code>slot-scope</code>
            </strong>)</td>
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
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import HalfDemo from './half.vue';
  import TextDemo from './text.vue';
  import DisabledDemo from './disabled.vue';
  import ClearDemo from './clear.vue';
  import CustomDemo from './custom.vue';
  import EventDemo from './event.vue';

  export default {
    components: {
      BasicDemo,
      HalfDemo,
      TextDemo,
      DisabledDemo,
      ClearDemo,
      CustomDemo,
      EventDemo,
    },
  };
</script>
