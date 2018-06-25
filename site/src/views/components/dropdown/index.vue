<template>
  <article class="doc">
    <h1 class="ux-heading">Dropdown
      <span class="subtitle">下拉菜单</span>
    </h1>
    <basic-demo/>
    <container-demo />
    <button-demo />
    <position-demo />
    <disable-demo />
    <event-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <h3 class="mume-header"
        id="uxdropdown">UxDropdown</h3>

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
          <td>visible</td>
          <td>是否显示 (v-model)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>trigger</td>
          <td>触发事件,可用值:
            <code>hover</code>,
            <code>click</code> ,
            <code>focus</code>,
            <code>none</code>,当值为
            <code>none</code>时为手动控制</td>
          <td>String|Array</td>
          <td>hover</td>
        </tr>
        <tr>
          <td>get-popup-container</td>
          <td>自定义渲染区域,默认
            <code>body</code>
          </td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>close-on-select</td>
          <td>选择后关闭</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>placement</td>
          <td>弹出区域,可用值:
            <code>bottomLeft</code>,
            <code>bottomCenter</code>,
            <code>bottomRight</code>,
            <code>topLeft</code>,
            <code>topCenter</code>,
            <code>topRight</code>
          </td>
          <td>String</td>
          <td>bottomLeft</td>
        </tr>
        <tr>
          <td>overlay-class</td>
          <td>自定义
            <code>overlay</code>class</td>
          <td>String|Array|Object</td>
          <td></td>
        </tr>
        <tr>
          <td>overlay-style</td>
          <td>自定义
            <code>overlay</code> style</td>
          <td>Object</td>
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
          <td>trigger</td>
          <td>自定义触发元素</td>
        </tr>
        <tr>
          <td>overlay</td>
          <td>自定义弹出元素</td>
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
          <td>visible-change</td>
          <td>当菜单显示状态改变时触发</td>
          <td>Function(visible)</td>
        </tr>
        <tr>
          <td>overlay-click</td>
          <td>当
            <code>overlay</code>被点击时触发</td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxdropdownbutton">UxDropdownButton</h3>

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
          <td>按钮类型,可选值:
            <code>primary</code> ,
            <code>ghost</code>,
            <code>dashed</code>,
            <code>danger</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>可选值:
            <code>small</code>,
            <code>default</code>,
            <code>large</code>
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
      </tbody>
    </table>
    <blockquote>
      <p>同时也支持
        <code>UxDropdown</code>属性</p>
    </blockquote>
    <h4 class="mume-header"
        id="slots-1">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>overlay</td>
          <td>自定义弹出元素</td>
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
          <td>visible-change</td>
          <td>当菜单显示状态改变时触发</td>
          <td>Function(visible)</td>
        </tr>
        <tr>
          <td>overlay-click</td>
          <td>当
            <code>overlay</code>被点击时触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>click</td>
          <td>当
            <code>button</code>被点击时触发</td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import ContainerDemo from './container.vue';
  import ButtonDemo from './button.vue';
  import PositionDemo from './position.vue';
  import DisableDemo from './disable.vue';
  import EventDemo from './event.vue';

  export default {
    components: {
      BasicDemo,
      ContainerDemo,
      ButtonDemo,
      PositionDemo,
      DisableDemo,
      EventDemo,
    },
  };
</script>
