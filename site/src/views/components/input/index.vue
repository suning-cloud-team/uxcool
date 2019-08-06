<template>
  <article class="doc">
    <h1 class="ux-heading">Input
      <span class="subtitle">输入框</span>
    </h1>
    <input-demo />
    <clear-demo />

    <prefix-demo />
    <addon-demo />
    <size-demo />
    <search-demo />
    <group-demo />
    <tooltip-demo />
    <textarea-demo />
    <textarea-autosize-demo />
    <limit-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <h3 class="mume-header"
        id="uxinput">UxInput</h3>
    <h4>Props</h4>
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
          <td>affix-class</td>
          <td>自定义
            <code>ux-input</code> class
          </td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>value</td>
          <td>值</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>size</td>
          <td>控件大小,可选值:
            <code>large</code>,
            <code>default</code>,
            <code>small</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
        <tr>
          <td>allow-clear</td>
          <td>是否显示移除图标。<code>0.5.0-next.56</code>版本以后可用。</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-word-limit</td>
          <td>是否显示字数限制，需要配合`maxlength`特性使用。<code>0.5.0-next.56</code>版本以后可用。</td>
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
          <td>addon-before</td>
          <td>前置标签</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>addon-after</td>
          <td>后置标签</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <p>其余属性与原生
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">input</a> 一致
    </p>
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
          <td>prefix</td>
          <td>自定义
            <code>ux-input</code> 图标前缀
          </td>
        </tr>
        <tr>
          <td>suffix</td>
          <td>自定义
            <code>ux-input</code> 图标后缀
          </td>
        </tr>
        <tr>
          <td>addonBefore</td>
          <td>自定义前置标签</td>
        </tr>
        <tr>
          <td>addonAfter</td>
          <td>自定义后置标签</td>
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
          <td>input</td>
          <td>输入值变化时触发</td>
          <td>Function(val)</td>
        </tr>
        <tr>
          <td>pressenter</td>
          <td>按下
            <code>enter</code>键时触发
          </td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>keydown</td>
          <td>按下按键是触发</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>失去焦点触发。<code>0.5.0-next.58</code>添加。</td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxtextarea">UxTextarea</h3>

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
          <td>value</td>
          <td>值</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>auto-size</td>
          <td>自适应文本高度</td>
          <td>Boolean | Object{minRows, maxRows}</td>
          <td>false</td>
        </tr>
        <tr>
          <td>show-word-limit</td>
          <td>是否显示字数限制，需要配合`maxlength`特性使用。<code>0.5.0-next.56</code>版本以后可用。</td>
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
          <td>textarea-style</td>
          <td>文本域样式。<code>0.5.0-next.58</code>添加。</td>
          <td>Object</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <p>其余属性与原生
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">
        textarea
      </a>一致
    </p>
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
          <td>input</td>
          <td>输入值变化时触发</td>
          <td>Function(val)</td>
        </tr>
        <tr>
          <td>pressenter</td>
          <td>按下
            <code>enter</code>键时触发
          </td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>keydown</td>
          <td>按下按键时触发(包括
            <code>enter</code>键值)
          </td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>失去焦点触发。
            <code>0.5.0-next.58</code>添加。
          </td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>on-change(DEPRECATED)

          </td>
          <td>值改变时触发</td>
          <td>Function(val)</td>
        </tr>
        <tr>
          <td>on-press-enter(DEPRECATED)

          </td>
          <td>按下
            <code>enter</code>键时触发
          </td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>on-key-down(DEPRECATED)

          </td>
          <td>按下按键时触发 (包括
            <code>enter</code>键值)
          </td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxsearchinput">UxSearchInput</h3>

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
          <td>enter-button</td>
          <td>是否有确认按钮, 可输入文字。<code>0.5.0-next.56</code>版本开始支持函数语法，可返回VNode用于自定义搜索按钮内容。</td>
          <td>Boolean|String|Function(h):VNode</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <p>其余属性与
      <code>UxInput</code>一致
    </p>
    <h4 class="mume-header"
        id="events-2">Events</h4>

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
          <td>search</td>
          <td>点击搜索或按下
            <code>enter</code>键时触发
          </td>
          <td>Function(val)</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>失去焦点触发。
            <code>0.5.0-next.58</code>添加
          </td>
          <td>Function(e)</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxinputgroup">UxInputGroup</h3>

    <h4 class="mume-header"
        id="props-3">Props</h4>

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
          <td>compact</td>
          <td>是否使用紧凑模式</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>size</td>
          <td>
            <code>group</code>下的所有
            <code>Input</code>大小, 可选值:
            <code>small</code>,
            <code>default</code>,
            <code>large</code>
          </td>
          <td>String</td>
          <td>default</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import GroupDemo from './group.vue';
  import InputDemo from './input.vue';
  import PrefixDemo from './prefix.vue';
  import AddonDemo from './addon.vue';
  import SearchDemo from './search.vue';
  import TooltipDemo from './tooltip.vue';
  import SizeDemo from './size.vue';
  import TextareaDemo from './textarea.vue';
  import TextareaAutosizeDemo from './textareaAutosize.vue';
  import ClearDemo from './clear.vue';
  import LimitDemo from './limit.vue';

  export default {
    components: {
      GroupDemo,
      InputDemo,
      PrefixDemo,
      AddonDemo,
      SearchDemo,
      TooltipDemo,
      SizeDemo,
      TextareaDemo,
      TextareaAutosizeDemo,
      ClearDemo,
      LimitDemo,
    },
  };
</script>
<style scoped>
  /deep/ .demo-example {
    width: 600px;
  }
</style>
