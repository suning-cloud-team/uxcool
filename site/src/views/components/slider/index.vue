<template>
  <article class="doc"
           style="overflow:hidden">
    <h1 class="ux-heading">Slider
      <span class="subtitle">滑动输入条</span>
    </h1>
    <basic-demo/>
    <disabled-demo />
    <event-demo />
    <icon-demo />
    <marks-demo />
    <tip-demo />
    <vertical-demo />
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxSlider Props</caption>
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
          <td>值,当
            <code>range=true</code>时,value 为[Number,Number],否则是 Number
          </td>
          <td>Number | [Number,Number]</td>
          <td>0</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>vertical</td>
          <td>垂直模式</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>range</td>
          <td>多滑块模式</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>tipFormatter</td>
          <td>格式化显示 tip, 当
            <code>tipFormatter=false</code>时,不显示 tip
          </td>
          <td>Function(value)|false</td>
          <td></td>
        </tr>
        <tr>
          <td>min</td>
          <td>最小值</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>max</td>
          <td>最大值</td>
          <td>Number</td>
          <td>100</td>
        </tr>
        <tr>
          <td>step</td>
          <td>步长,必须大于 0,且能够被
            <code>max-min</code> 整除,当 marks 不为空,可设定
            <code>step=false</code>,使 Slider 只能选中 marks 中的值
          </td>
          <td>Number|false</td>
          <td>1</td>
        </tr>
        <tr>
          <td>marks</td>
          <td>刻度,
            <code>key</code>取值只能是 Number,且在 min-max 之中,每个刻度可单独设置
            <code>style</code>,值支持 String 和原生 Html 标签
          </td>
          <td>Object</td>
          <td>{Number:String}|{Number:{style:{},isDot: Boolean, label:String}}</td>
        </tr>
        <tr>
          <td>included</td>
          <td>marks 不为空时有效,
            <code>true</code>时,表示包含,
            <code>false</code>表示并列
          </td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>dots</td>
          <td>当
            <code>step</code>不为 false 时,设置
            <code>dots=true</code>,则将每一个 step 渲染为 dot
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxSlider Events</caption>
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
          <td>当 Slider 值变化时触发</td>
          <td>Function(value)</td>
        </tr>
        <tr>
          <td>after-change</td>
          <td>当 onmouseup 触发后触发</td>
          <td>Function(value)</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxSlider Methods</caption>
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
  import EventDemo from './event.vue';
  import IconDemo from './icon.vue';
  import MarksDemo from './marks.vue';
  import TipDemo from './tip.vue';
  import VerticalDemo from './vertical.vue';

  export default {
    components: {
      BasicDemo,
      DisabledDemo,
      EventDemo,
      IconDemo,
      MarksDemo,
      TipDemo,
      VerticalDemo,
    },
  };
</script>
