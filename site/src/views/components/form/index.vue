<template>
  <article class="doc">
    <h1 class="ux-heading">Alert
      <span class="subtitle">警告提示</span>
    </h1>
    <login-demo/>
    <horizontal-demo/>
    <register-demo/>
    <search-demo/>
    <dynamic-demo/>
    <method-demo/>
    <modal-demo/>
    <vuex-demo/>
    <rules-demo/>
    <custom-rules-demo/>

    <hr>
    <ux-heading level="2"
                id="api">API</ux-heading>
    <blockquote>
      <p>
        <b>重要:</b>当输入控件未使用
        <code>UxFieldDecorator</code>包裹时,
        <code>UxForm</code>
        会忽略此控件
      </p>
    </blockquote>
    <h3 class="mume-header"
        id="uxform">UxForm</h3>

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
          <td>layout</td>
          <td>布局,可选值:
            <code>horizontal</code>,
            <code>vertical</code>,
            <code>inline</code>
          </td>
          <td>String</td>
          <td>horizontal</td>
        </tr>
        <tr>
          <td>hide-required-mark</td>
          <td>隐藏表单必选标志</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>locale</td>
          <td>验证文案显示语言,支持
            <code>zh_CN</code>,
            <code>en</code>
          </td>
          <td>String</td>
          <td>zh_CN</td>
        </tr>
        <tr>
          <td>validator</td>
          <td>验证设置, 详见下方文档</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>messages</td>
          <td>自定义验证文案</td>
          <td>Object</td>
          <td></td>
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
          <td>submit</td>
          <td>表单
            <code>Submit</code>事件
          </td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>form-flags</td>
          <td>
            <code>form</code>表单的 flags state,详见下表
          </td>
          <td>Function()</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxformitem">UxFormItem</h3>

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
          <td>label</td>
          <td>label 标签文本</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>labelCol</td>
          <td>label 标签布局,同
            <code>Col</code>组件
          </td>
          <td>Object</td>
          <td>当
            <code>layout=horizontal</code>时,默认为
            <code>{ xs: 24, sm: 8, }</code>,其他情况为 null
          </td>
        </tr>
        <tr>
          <td>wrapperCol</td>
          <td>输入控件布局样式 ,用法
            <code>labelCol</code>相同
          </td>
          <td>Object</td>
          <td>当
            <code>layout=horizontal</code>时,默认为
            <code>{ xs: 24, sm: 16, }</code>,其他情况为 null
          </td>
        </tr>
        <tr>
          <td>required</td>
          <td>是否必填, 如不设置,会根据校验规则自动生成</td>
          <td>Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>colon</td>
          <td>是否显示
            <code>label</code> 后的冒号,配合
            <code>label</code>属性使用
          </td>
          <td>Boolean</td>
          <td>false</td>
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
          <td>label</td>
          <td>自定义 label 内容</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxformdecorator">UxFormDecorator</h3>

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
          <td>name</td>
          <td>输入控件唯一性标示(
            <code>required</code>)
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>rules</td>
          <td>
            <code>vee-validate</code>校验规则
          </td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>validator</td>
          <td>验证设置, 详见下方文档</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>hasFeedback</td>
          <td>
            <code>UxInput</code>组件展示状态图标,
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>alias</td>
          <td>校验显示的字段名称, 默认为
            <code>FormItem</code>的
            <code>label</code>
          </td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxform-flags">UxForm Flags</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>属性名</th>
          <th>描述</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>pristine</td>
          <td>是否未手动操作</td>
        </tr>
        <tr>
          <td>dirty</td>
          <td>是否已手动操作</td>
        </tr>
        <tr>
          <td>valid</td>
          <td>是否有效</td>
        </tr>
        <tr>
          <td>invalid</td>
          <td>是否无效</td>
        </tr>
        <tr>
          <td>validated</td>
          <td>是否至少被验证了一次</td>
        </tr>
        <tr>
          <td>pending</td>
          <td>是否验证过程中</td>
        </tr>
        <tr>
          <td>changed</td>
          <td>值是否已被改变</td>
        </tr>
      </tbody>
    </table>

    <h3 class="mume-header"
        id="uxform-static-methods">UxForm Static Methods</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>方法名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>extendValidator</td>
          <td>自定验证规则, 由于底层
            <code>vee-validator</code>的限制,
            <strong>自定义的规则都是全局的</strong>
          </td>
          <td>Function(ruleName, Validator, options={hasTarget:false, locale: 'zh_CN'})</td>
        </tr>
      </tbody>
    </table>
    <p>使用可参考,例子中的 自定义规则示例 以及
      <a href="https://baianat.github.io/vee-validate/guide/custom-rules.html">更详细的内容</a>
    </p>

    <h3 class="mume-header"
        id="uxform-methods">UxForm Methods</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>方法名</th>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>validate</td>
          <td>校验输入组件的值, 如未传递
            <code>FieldDecorator.name</code>,则验证所有组件,并返回一个 promise
          </td>
          <td>Function([fieldName:String])=&gt;Promise&lt;valid:Boolean, values:Object&gt;</td>
        </tr>
        <tr>
          <td>resetFields</td>
          <td>重置表单, 将所有字段置为初始值,并清除校验结果</td>
          <td>Function()</td>
        </tr>
        <tr>
          <td>clearErrors</td>
          <td>清除校验结果</td>
          <td>Function()</td>
        </tr>
        <tr>
          <td>getFieldError</td>
          <td>获取某个输入组件 Error</td>
          <td>Function(fieldName)</td>
        </tr>
        <tr>
          <td>getFieldsError</td>
          <td>获取一组输入组件 Error, 如果未传递参数,则获取所有 Error</td>
          <td>Function([fieldNames:String[]])</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="validator-options">Validator options</h3>

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
          <td>initial</td>
          <td>是否初始化时校验</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>events</td>
          <td>触发校验时机</td>
          <td>String</td>
          <td>
            <code>input|blur</code>
          </td>
        </tr>
        <tr>
          <td>disable</td>
          <td>是否禁止触发
            <code>events</code> 指定事件
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>delay</td>
          <td>延迟触发
            <code>events</code>指定事件</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>rejectsFalse</td>
          <td>当值为
            <code>false</code>时,
            <code>required</code>规则是否判定为
            <code>fail</code>
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99">校验规则</h3>

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
          <td>required</td>
          <td>是否必选</td>
          <td>required:Boolean</td>
          <td>required:true</td>
        </tr>
        <tr>
          <td>in</td>
          <td>枚举</td>
          <td>in:list</td>
          <td>'in:1,2,3,4'或{in:[1,2,3,4]}</td>
        </tr>
        <tr>
          <td>not_in</td>
          <td>否定 枚举</td>
          <td>not_in:list</td>
          <td>'not_in:1,2,3,4'{not_in:[1,2,3,4]}</td>
        </tr>
        <tr>
          <td>digits</td>
          <td>定长</td>
          <td>digits:length</td>
          <td></td>
        </tr>
        <tr>
          <td>max</td>
          <td>最大限长</td>
          <td>max:length</td>
          <td></td>
        </tr>
        <tr>
          <td>min</td>
          <td>最小限长</td>
          <td>min:length</td>
          <td></td>
        </tr>
        <tr>
          <td>max_value</td>
          <td>最大值</td>
          <td>max_value:value</td>
          <td></td>
        </tr>
        <tr>
          <td>min_value</td>
          <td>最小值</td>
          <td>min_value:value</td>
          <td></td>
        </tr>
        <tr>
          <td>email</td>
          <td>邮件</td>
          <td>email</td>
          <td></td>
        </tr>
        <tr>
          <td>regex</td>
          <td>正则,字符串格式,不能使用
            <code>|</code> 和
            <code>,</code>,建议正则只使用
            <code>Object</code> 格式
          </td>
          <td>regex:pattern,flags</td>
          <td>{regex: /^\d+$/g}</td>
        </tr>
        <tr>
          <td>between</td>
          <td>值域范围</td>
          <td>between:min,max</td>
          <td></td>
        </tr>
        <tr>
          <td>confirmed</td>
          <td>校验值是否与 confirmed 的 target 的值相同, 一般用于密码确认</td>
          <td>confirmed:target</td>
          <td>{confirmed:password}</td>
        </tr>
        <tr>
          <td>alpha</td>
          <td>只能包含
            <a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L6">alphabetic characters</a>
          </td>
          <td>alpha:locale</td>
          <td>'alpha'或'alpha:en'</td>
        </tr>
        <tr>
          <td>alpha_num</td>
          <td>可以包括
            <a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L46">alphabetic characters, numbers</a>
          </td>
          <td>alpha_num:locale</td>
          <td>'alpha_num'或'alpha_num:en'</td>
        </tr>
        <tr>
          <td>alpha_spaces</td>
          <td>可以包括
            <a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L26">alphabetic characters or spaces</a>
          </td>
          <td>alpha_spaces:locale</td>
          <td>'alpha_spaces'或'alpha_spaces:en'</td>
        </tr>
        <tr>
          <td>alpha_dash</td>
          <td>可以包括
            <a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L66">alphabetic characters, numbers, dashes or underscores</a>
          </td>
          <td>alpha_dash:locale</td>
          <td>'alpha_dash'或'alpha_dash:en'</td>
        </tr>
      </tbody>
    </table>
    <p>更多规则详见:
      <a href="https://baianat.github.io/vee-validate/guide/rules.html">vee-validate</a>
    </p>
    <h3 class="mume-header"
        id="%E6%A0%A1%E9%AA%8C%E6%8F%90%E7%A4%BA%E6%96%87%E6%A1%88">校验提示文案</h3>

    <ol>
      <li>
        <p>
          <code>Form</code> 校验包含默认
          <a href="https://github.com/baianat/vee-validate/blob/master/locale/zh_CN.js">提示文案</a>
        </p>
      </li>
      <li>
        <p>可使用
          <code>Form</code> 的
          <code>messages</code>属性定义提示文案
        </p>
      </li>
    </ol>
    <pre data-role="codeBlock"
         data-info="javascript"
         class="language-javascript"><span class="token punctuation">{</span>
  email<span class="token punctuation">:</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token string">` </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 必须是有效的邮箱.`</span></span><span class="token punctuation">,</span>
  <span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token string">` </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 必须是一个有效值.`</span></span><span class="token punctuation">,</span>
  digits<span class="token punctuation">:</span> <span class="token punctuation">(</span>field<span class="token punctuation">,</span> <span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token template-string"><span class="token string">` </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 必须是数字，且精确到 </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>length<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">数`</span></span><span class="token punctuation">,</span>
  required<span class="token punctuation">:</span> '请输入值`<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</pre>
    <ol start="3">
      <li>单个组件单独定义文案</li>
    </ol>
    <blockquote>
      <p>支持
        <code>String</code>,
        <code>Object</code>,
        <code>Array</code>格式
      </p>
    </blockquote>
    <pre data-role="codeBlock"
         data-info="html"
         class="language-html">//String
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>field<span class="token punctuation">"</span></span> <span class="token attr-name">rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>required|in:1,2,3,4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item.value<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">></span></span>

// Object
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>field<span class="token punctuation">"</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{required:true, message:<span class="token punctuation">'</span>请输入值<span class="token punctuation">'</span>}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item.value<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>field<span class="token punctuation">"</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{required:true, email:true}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item.value<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">></span></span>

// Array
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>field<span class="token punctuation">"</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>[{required:true, message:<span class="token punctuation">'</span>请输入值<span class="token punctuation">'</span>},{max:10,message: <span class="token punctuation">'</span>最大长度<span class="token punctuation">'</span>}]<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>item.value<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">></span></span>
</pre>
    </div>
  </article>
</template>

<script>
  import LoginDemo from './login.vue';
  import HorizontalDemo from './horizontal.vue';
  import DynamicDemo from './dynamic.vue';
  import MethodDemo from './method.vue';
  import ModalDemo from './modal.vue';
  import RegisterDemo from './register.vue';
  import SearchDemo from './search.vue';
  import VuexDemo from './vuex.vue';
  import RulesDemo from './rules.vue';
  import CustomRulesDemo from './customRules.vue';

  export default {
    components: {
      LoginDemo,
      HorizontalDemo,
      RegisterDemo,
      SearchDemo,
      DynamicDemo,
      MethodDemo,
      ModalDemo,
      VuexDemo,
      RulesDemo,
      CustomRulesDemo,
    },
  };
</script>


<style lang="scss" scoped>
  /deep/ .demo-example {
    width: 600px;
    .ux-btn + .ux-btn {
      margin-left: 10px;
    }
  }
</style>
