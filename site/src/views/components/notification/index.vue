<template>
  <article class="doc">
    <h1 class="ux-heading">Notification
      <span class="subtitle">通知提示框</span>
    </h1>

    <demoIcon />
    <demoType />
    <demoCustom />
    <demoStyle />
    <demoConfig />
    <demoEvent />

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <ul>
      <li>
        <p>
          <code>UxNotification.open(config)</code>
        </p>
      </li>
      <li>
        <p>
          <code>UxNotification.success(config)</code>
        </p>
      </li>
      <li>
        <p>
          <code>UxNotification.error(config)</code>
        </p>
      </li>
      <li>
        <p>
          <code>UxNotification.info(config)</code>
        </p>
      </li>
      <li>
        <p>
          <code>UxNotification.warn(config)</code>
        </p>
      </li>
      <li>
        <p>
          <code>UxNotification.warning(config)</code>
        </p>
      </li>
    </ul>
    <p>以上方法,返回一个 方法 用于关闭相应 Notification, 接收一个
      <code>Object</code> 作为参数, 具体属性如下:</p>

    <table class="api-table">
      <caption>Props</caption>
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
          <td>标题(
            <code>required</code>)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>description</td>
          <td>内容(
            <code>required</code>)</td>
          <td>String | Html | VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>dangerouslySetInnerHTML</td>
          <td>当
            <code>description</code>为 html 时,需设置此项为
            <code>true</code>
          </td>
          <td>false</td>
          <td></td>
        </tr>
        <tr>
          <td>className</td>
          <td>自定义 notice class</td>
          <td>Array|Object|String</td>
          <td></td>
        </tr>
        <tr>
          <td>style</td>
          <td>自定义 notice style</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>placement</td>
          <td>弹出位置,可选值:
            <code>topLeft</code>,
            <code>topRight</code> ,
            <code>bottomLeft</code> ,
            <code>bottomRight</code>
          </td>
          <td>String</td>
          <td>topRight</td>
        </tr>
        <tr>
          <td>duration</td>
          <td>显示时长,设置为
            <code>0</code> 时,不自动关闭,单位
            <code>ms</code>
          </td>
          <td>Number</td>
          <td>4500</td>
        </tr>
        <tr>
          <td>icon</td>
          <td>图标</td>
          <td>String|VNode|{type:'', style: {}}</td>
          <td></td>
        </tr>
        <tr>
          <td>btn</td>
          <td>在 notice 内添加自定义按钮</td>
          <td>VNode</td>
          <td></td>
        </tr>
        <tr>
          <td>closable</td>
          <td>是否显示关闭图标</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>onClose</td>
          <td>notice 关闭时的回调</td>
          <td>Function()</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE%E5%92%8C%E9%94%80%E6%AF%81">全局配置和销毁</h4>

    <p>还提供了全局配置和销毁方法, 调用前配置一次, 全局生效</p>
    <ul>
      <li>
        <p>
          <code>UxNotification.config(options)</code>
        </p>
      </li>
      <li>
        <p>
          <code>UxNotification.destroy()</code>
        </p>
      </li>
    </ul>
    <pre data-role="codeBlock"
         data-info="javascript"
         class="language-javascript">UxNotification<span class="token punctuation">.</span><span class="token function">config</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  placment<span class="token punctuation">:</span> <span class="token string">'topLeft'</span><span class="token punctuation">,</span>
  duration<span class="token punctuation">:</span> <span class="token number">1500</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</pre>
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
          <td>top</td>
          <td>距离顶部位置,当
            <code>placment</code>为
            <code>topLeft</code> ,
            <code>topRight</code>时,此配置有效,单位
            <code>px</code>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>bottom</td>
          <td>距离底部位置,当
            <code>placment</code>为
            <code>bottomLeft</code> ,
            <code>bottomRight</code>时,此配置有效,单位
            <code>px</code>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>getContainer</td>
          <td>配置渲染位置</td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>placement</td>
          <td>弹出位置,可选值:
            <code>topLeft</code>,
            <code>topRight</code> ,
            <code>bottomLeft</code> ,
            <code>bottomRight</code>
          </td>
          <td>String</td>
          <td>topRight</td>
        </tr>
        <tr>
          <td>duration</td>
          <td>显示时长,设置为
            <code>0</code> 时,不自动关闭,单位
            <code>ms</code>
          </td>
          <td>Number</td>
          <td>4500</td>
        </tr>
      </tbody>
    </table>

  </article>
</template>

<script>
  import demoIcon from './icon.vue';
  import demoType from './type.vue';
  import demoCustom from './custom.vue';
  import demoStyle from './style.vue';
  import demoConfig from './config.vue';
  import demoEvent from './event.vue';

  export default {
    components: {
      demoIcon,
      demoType,
      demoCustom,
      demoStyle,
      demoConfig,
      demoEvent,
    },
  };
</script>
