<template>
  <article class="doc">
    <h1 class="ux-heading">Input
      <span class="subtitle">输入框</span>
    </h1>
    <demo-textarea>
    </demo-textarea>
    <demo-textarea-autosize>
    </demo-textarea-autosize>
    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxTextarea Props</caption>
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
          <td>auto-size</td>
          <td>自适应文本高度</td>
          <td>Boolean|Object{minRows, maxRows}</td>
          <td>false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>value</td>
          <td>传入值</td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <p>以及原生
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea">textarea</a> 自带的属性</p>
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
          <td>触发 v-model 绑定的值更新</td>
          <td>Function(val)</td>
        </tr>
        <tr>
          <td>on-change</td>
          <td>值改变时触发</td>
          <td>Function(e:Event)</td>
        </tr>
        <tr>
          <td>on-press-enter</td>
          <td>按下 enter 按钮时触发</td>
          <td>Function(e:Event)</td>
        </tr>
        <tr>
          <td>on-key-down</td>
          <td>按下除 enter 之外的按钮触发</td>
          <td>Function(e:Event)</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
  import DemoTextarea from './textarea.vue';
  import DemoTextareaAutosize from './textareaAutosize.vue';

  export default {
    components: {
      DemoTextarea,
      DemoTextareaAutosize,
    },
  };

</script>
