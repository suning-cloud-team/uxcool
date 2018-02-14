<template>
  <article class="doc">
    <h1 class="ux-heading">Message<span class="subtitle">全局提示</span></h1>

    <ux-heading level="2" id="overview">概述</ux-heading>
    <p>全局展示操作提示，在顶部展示，并自动消失。</p>

    <demo-basic></demo-basic>
    <demo-type></demo-type>
    <demo-duration></demo-duration>
    <demo-html></demo-html>

    <hr>
    <ux-heading level="2" id="api">API</ux-heading>
    <ux-heading level="3" id="methods">UxMessage.method()</ux-heading>

    <p>包括:</p>
    <ul class="list-styled">
      <li>
        <p><code>UxMessage.info</code></p>
      </li>
      <li>
        <p><code>UxMessage.success</code></p>
      </li>
      <li>
        <p><code>UxMessage.error</code></p>
      </li>
      <li>
        <p><code>UxMessage.warning</code></p>
      </li>
      <li>
        <p><code>UxMessage.warn</code></p>
        <!-- * `UxMessage.loading` -->
      </li>
    </ul>
    <p>以上方法, 接收一个
      <code>Object</code> 作为参数, 具体属性如下:</p>
    <table class="ux-table ux-table-striped-vertical api-table">
      <caption>Params</caption>
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
          <td>content</td>
          <td>内容</td>
          <td>String|JSX|VNode|Html</td>
          <td></td>
        </tr>
        <tr>
          <td>dangerouslySetInnerHTML</td>
          <td>content 是否作为 html 处理</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>duration</td>
          <td>自动关闭延迟, 单位 ms</td>
          <td>Number</td>
          <td>1500</td>
        </tr>
        <tr>
          <td>noticeClass</td>
          <td>自定义类名</td>
          <td>String|Array|Object</td>
          <td></td>
        </tr>
        <tr>
          <td>noticeStyle</td>
          <td>自定义样式</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>onClose</td>
          <td>消息关闭时的回调</td>
          <td>Function</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <p>注意</p>
    <blockquote>
      <p>content 为 JSX 类型时, 需要编译环境支持</p>
    </blockquote>

    <ux-heading level="3" id="global">全局配置和销毁</ux-heading>
    <ul class="list-styled">
      <li>
        <p><code>UxMessage.config</code></p>
      </li>
      <li>
        <p><code>UxMessage.detroy</code></p>
      </li>
    </ul>
    <p>
      <code>UxMessage.config</code> 接收一个
      <code>Object</code>作为参数, 具体属性如下</p>

    <table class="ux-table ux-table-striped-vertical api-table">
      <caption>Params</caption>
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
          <td>getContainer</td>
          <td>自定义消息渲染位置</td>
          <td>Function=&gt;HTMLElement</td>
          <td>()=&gt;document.body</td>
        </tr>
        <tr>
          <td>top</td>
          <td>消息容器距离顶部距离</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>duration</td>
          <td>默认自动关闭延迟,单位 ms</td>
          <td>Number</td>
          <td>1500</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
import demoBasic from './basic.vue';
import demoType from './type.vue';
import demoDuration from './duration.vue';
import demoHtml from './html.vue';

export default {
  components: {
    demoBasic,
    demoType,
    demoDuration,
    demoHtml,
  },
};
</script>
