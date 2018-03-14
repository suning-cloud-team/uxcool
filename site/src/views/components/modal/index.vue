<template>
  <article class="doc">
    <h1 class="ux-heading">Modal
      <span class="subtitle">模态框</span>
    </h1>

    <demo-basic></demo-basic>
    <demo-hide-footer></demo-hide-footer>
    <demo-custom></demo-custom>
    <demo-position></demo-position>
    <demo-disable-close></demo-disable-close>
    <demo-nest></demo-nest>
    <demo-confirm></demo-confirm>
    <demo-message></demo-message>

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>

    <div class="api">
      <table class="api-table">
        <caption>UxModal Props</caption>
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
            <td>对话框是否可见, 可使用 v-model</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>title</td>
            <td>标题</td>
            <td>String</td>
            <td></td>
          </tr>
          <tr>
            <td>closable</td>
            <td>是否显示右上角关闭按钮</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>width</td>
            <td>宽度</td>
            <td>String</td>
            <td>'520px'</td>
          </tr>
          <tr>
            <td>ok-type</td>
            <td>确定按钮类型</td>
            <td>String</td>
            <td>'primary'</td>
          </tr>
          <tr>
            <td>ok-text</td>
            <td>确定按钮文字</td>
            <td>String</td>
            <td>'确定'</td>
          </tr>
          <tr>
            <td>cancel-text</td>
            <td>取消按钮文字</td>
            <td>String</td>
            <td>'取消'</td>
          </tr>
          <tr>
            <td>mask-closable</td>
            <td>点击蒙层是否关闭</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>z-index</td>
            <td>z-index</td>
            <td>String|Number</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>dialog-class</td>
            <td>浮层类名</td>
            <td>String|Array|Object</td>
            <td></td>
          </tr>
          <tr>
            <td>dialog-style</td>
            <td>浮层样式</td>
            <td>Object</td>
            <td></td>
          </tr>
          <tr>
            <td>wrap-class</td>
            <td>modal 外层类名</td>
            <td>String|Array|Object</td>
            <td></td>
          </tr>
          <tr>
            <td>wrap-style</td>
            <td>modal 外层样式</td>
            <td>Object</td>
            <td></td>
          </tr>
          <tr>
            <td>get-container</td>
            <td>modal 挂载点</td>
            <td>Function=&gt;HTMlElement</td>
            <td>()=&gt;document.body</td>
          </tr>
          <tr>
            <td>body-style</td>
            <td>modal body 样式</td>
            <td>Object</td>
            <td></td>
          </tr>
          <tr>
            <td>mask-style</td>
            <td>蒙层样式</td>
            <td>Object</td>
            <td></td>
          </tr>
          <tr>
            <td>mask</td>
            <td>是否显示蒙层</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
          <tr>
            <td>hide-footer</td>
            <td>是否隐藏操作区域</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>ok-cancel</td>
            <td>是否显示取消按钮</td>
            <td>Boolean</td>
            <td>true</td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxModal Events</caption>
        <thead>
          <tr>
            <th>事件名</th>
            <th>描述</th>
            <th>回调</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ok</td>
            <td>点击确定按钮时触发</td>
            <td>Function(e:DomEvent)</td>
          </tr>
          <tr>
            <td>cancel</td>
            <td>点击取消按钮时触发</td>
            <td>Function(e:DomEvent)</td>
          </tr>
          <tr>
            <td>after-close</td>
            <td>modal 完全关闭时触发</td>
            <td>Function(e:DomEvent)</td>
          </tr>
        </tbody>
      </table>
      <table class="api-table">
        <caption>UxModal Slots</caption>
        <thead>
          <tr>
            <th>name</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>title</td>
            <td>自定义标题</td>
          </tr>
          <tr>
            <td>footer</td>
            <td>自定义按钮区域</td>
          </tr>
        </tbody>
      </table>

      <ux-heading level="3"
                  id="methods">UxModal.method()</ux-heading>

      <p>包括:</p>
      <ul class="list-styled">
        <li>
          <p>
            <code>UxModal.info</code>
          </p>
        </li>
        <li>
          <p>
            <code>UxModal.success</code>
          </p>
        </li>
        <li>
          <p>
            <code>UxModal.error</code>
          </p>
        </li>
        <li>
          <p>
            <code>UxModal.warning</code>
          </p>
        </li>
        <li>
          <p>
            <code>UxModal.confirm</code>
          </p>
        </li>
      </ul>
      <p>以上方法, 返回一个
        <code>Promise</code>,点击
        <code>ok</code>触发
        <code>fulfilled</code>,点击
        <code>cancel</code>触发
        <code>rejected</code>; 接收一个
        <code>Object</code> 作为参数, 具体属性如下:</p>

      <table class="api-table">
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
            <td>title</td>
            <td>标题</td>
            <td>String|JSX|VNode</td>
            <td></td>
          </tr>
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
            <td>iconType</td>
            <td>图标 Icon 类型</td>
            <td>String</td>
            <td>question-circle</td>
          </tr>
          <tr>
            <td>maskClosable</td>
            <td>点击蒙层是否关闭</td>
            <td>Boolean</td>
            <td>false</td>
          </tr>
          <tr>
            <td>cancelText</td>
            <td>取消按钮文字</td>
            <td>String</td>
            <td>'取消'</td>
          </tr>
          <tr>
            <td>okText</td>
            <td>确定按钮文字</td>
            <td>String</td>
            <td>'确定'</td>
          </tr>
          <tr>
            <td>okType</td>
            <td>确定按钮类型</td>
            <td>String</td>
            <td>'primary'</td>
          </tr>
          <tr>
            <td>width</td>
            <td>宽度</td>
            <td>String</td>
            <td>'416px'</td>
          </tr>
          <tr>
            <td>zIndex</td>
            <td>z-index</td>
            <td>String|Number</td>
            <td>1000</td>
          </tr>
        </tbody>
      </table>
      <p>注意</p>
      <blockquote>
        <p>content 为 JSX 类型时, 需要编译环境支持</p>
      </blockquote>
    </div>
  </article>

</template>

<script>
  import demoBasic from './basic.vue';
  import demoHideFooter from './hideFooter.vue';
  import demoCustom from './custom.vue';
  import demoPosition from './position.vue';
  import demoDisableClose from './disableClose.vue';
  import demoNest from './nest.vue';
  import demoConfirm from './confirm.vue';
  import demoMessage from './message.vue';

  export default {
    components: {
      demoBasic,
      demoHideFooter,
      demoCustom,
      demoPosition,
      demoDisableClose,
      demoNest,
      demoConfirm,
      demoMessage,
    },
  };
</script>
