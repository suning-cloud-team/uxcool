<template>
  <article class="doc">
    <h1 class="ux-heading">Alert
      <span class="subtitle">警告提示</span>
    </h1>
    <basic-demo/>
    <type-demo/>
    <closable-demo/>
    <description-demo/>
    <icon-demo/>
    <slot-demo/>
    <banner-demo/>
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
          <td>banner</td>
          <td>是否用作顶部公告</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>type</td>
          <td>类型,可选值:
            <code>warning</code>,
            <code>success</code>,
            <code>info</code>,
            <code>error</code>
          </td>
          <td>String</td>
          <td>info,banner=true 时,默认
            <code>warning</code>
          </td>
        </tr>
        <tr>
          <td>closable</td>
          <td>是否可关闭</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>close-text</td>
          <td>自定义关闭文案</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>message</td>
          <td>提示内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>description</td>
          <td>额外的提示内容</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>show-icon</td>
          <td>是否显示 Icon</td>
          <td>Boolean</td>
          <td>false,banner=true 时,默认为
            <code>true</code>
          </td>
        </tr>
        <tr>
          <td>icon-type</td>
          <td>自定义 icon 图标</td>
          <td>String</td>
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
          <td>closeText</td>
          <td>自定义关闭 Icon</td>
        </tr>
        <tr>
          <td>message</td>
          <td>自定义提示内容</td>
        </tr>
        <tr>
          <td>description</td>
          <td>自定义额外提示内容</td>
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
          <td>close</td>
          <td>关闭 Alert 时触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>after-close</td>
          <td>关闭 Alert 动效结束后触发</td>
          <td>Function()</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import BasicDemo from './basic.vue';
  import BannerDemo from './banner.vue';
  import ClosableDemo from './closable.vue';
  import DescriptionDemo from './description.vue';
  import IconDemo from './icon.vue';
  import TypeDemo from './type.vue';
  import SlotDemo from './slot.vue';

  export default {
    components: {
      BasicDemo,
      BannerDemo,
      ClosableDemo,
      DescriptionDemo,
      IconDemo,
      TypeDemo,
      SlotDemo,
    },
  };
</script>
