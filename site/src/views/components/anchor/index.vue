<template>
  <article class="doc">
    <h1 class="ux-heading">Anchor
      <span class="subtitle">锚点</span>
    </h1>

    <demo-basic />
    <demo-container />
    <demo-offset />
    <demo-before-hash-change />
    <demo-before-scroll />

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <table class="api-table">
      <caption>UxAnchor Props</caption>
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
          <td>show-ink</td>
          <td>是否显示小圆点</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>offsetTop</td>
          <td>距离顶部偏移量</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>bounds</td>
          <td>锚点区域边界 ,单位
            <code>px</code>
          </td>
          <td>Number</td>
          <td>5</td>
        </tr>
        <tr>
          <td>get-container</td>
          <td>自定义容器</td>
          <td>Function=&gt;HTMLElement</td>
          <td>()=&gt;window</td>
        </tr>
        <tr>
          <td>before-hash-change</td>
          <td>路由改变前置动作(如果返回值为<code>false</code>则阻止默认路由行为)</td>
          <td>(href)=&gt;Boolean</td>
          <td>()=&gt;true</td>
        </tr>
        <tr>
          <td>before-scroll</td>
          <td>页面滚动前置动作(如果返回值为<code>false</code>则阻止默认滚动行为)</td>
          <td>(href)=&gt;Boolean</td>
          <td>()=&gt;true</td>
        </tr>
      </tbody>
    </table>
    <table class="api-table">
      <caption>UxAnchorLink Props</caption>
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
          <td>链接标题</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>href</td>
          <td>锚点链接</td>
          <td>String</td>
          <td>#</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxAnchorLink Slots</caption>
      <thead>
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>title</td>
          <td>自定义标题</td>
        </tr>
      </tbody>
    </table>

  </article>
</template>

<script>
  import demoBasic from './basic.vue';
  import demoContainer from './container.vue';
  import demoOffset from './offset.vue';
  import demoBeforeHashChange from './before-hash-change.vue';
  import demoBeforeScroll from './before-scroll.vue';

  export default {
    components: {
      demoBasic,
      demoContainer,
      demoOffset,
      demoBeforeHashChange,
      demoBeforeScroll
    },
  };
</script>
