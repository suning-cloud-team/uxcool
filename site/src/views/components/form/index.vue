<template>
  <article class="doc">
    <h1 class="ux-heading">Form
      <span class="subtitle">表单</span>
    </h1>
    <login-demo />
    <horizontal-demo />
    <register-demo />
    <search-demo />
    <dynamic-demo />
    <method-demo />
    <modal-demo />
    <vuex-demo />
    <rules-demo />
    <custom-rules-demo />

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
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>layout</td>
          <td>&#x5E03;&#x5C40;,&#x53EF;&#x9009;&#x503C;:<code>horizontal</code>,<code>vertical</code>,<code>inline</code></td>
          <td>String</td>
          <td>horizontal</td>
        </tr>
        <tr>
          <td>hide-required-mark</td>
          <td>&#x9690;&#x85CF;&#x8868;&#x5355;&#x5FC5;&#x9009;&#x6807;&#x5FD7;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>locale</td>
          <td>&#x9A8C;&#x8BC1;&#x6587;&#x6848;&#x663E;&#x793A;&#x8BED;&#x8A00;,&#x652F;&#x6301;<code>zh_CN</code>, <code>en</code></td>
          <td>String</td>
          <td>zh_CN</td>
        </tr>
        <tr>
          <td>validator</td>
          <td>&#x9A8C;&#x8BC1;&#x8BBE;&#x7F6E;, &#x8BE6;&#x89C1;&#x4E0B;&#x65B9;&#x6587;&#x6863;</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>messages</td>
          <td>&#x81EA;&#x5B9A;&#x4E49;&#x9A8C;&#x8BC1;&#x6587;&#x6848;</td>
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
          <th>&#x4E8B;&#x4EF6;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x56DE;&#x8C03;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>submit</td>
          <td>&#x8868;&#x5355;<code>Submit</code>&#x4E8B;&#x4EF6;</td>
          <td>Function(e)</td>
        </tr>
        <tr>
          <td>form-flags</td>
          <td><code>form</code>&#x8868;&#x5355;&#x7684; flags state,&#x8BE6;&#x89C1;&#x4E0B;&#x8868;</td>
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
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>label</td>
          <td>label &#x6807;&#x7B7E;&#x6587;&#x672C;</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>labelCol</td>
          <td>label &#x6807;&#x7B7E;&#x5E03;&#x5C40;,&#x540C;<code>Col</code>&#x7EC4;&#x4EF6;</td>
          <td>Object</td>
          <td>&#x5F53;<code>layout=horizontal</code>&#x65F6;,&#x9ED8;&#x8BA4;&#x4E3A;<code>{ xs: 24, sm: 8, }</code>,&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x4E3A; null</td>
        </tr>
        <tr>
          <td>wrapperCol</td>
          <td>&#x8F93;&#x5165;&#x63A7;&#x4EF6;&#x5E03;&#x5C40;&#x6837;&#x5F0F; ,&#x7528;&#x6CD5;<code>labelCol</code>&#x76F8;&#x540C;</td>
          <td>Object</td>
          <td>&#x5F53;<code>layout=horizontal</code>&#x65F6;,&#x9ED8;&#x8BA4;&#x4E3A;<code>{ xs: 24, sm: 16, }</code>,&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x4E3A; null</td>
        </tr>
        <tr>
          <td>required</td>
          <td>&#x662F;&#x5426;&#x5FC5;&#x586B;, &#x5982;&#x4E0D;&#x8BBE;&#x7F6E;,&#x4F1A;&#x6839;&#x636E;&#x6821;&#x9A8C;&#x89C4;&#x5219;&#x81EA;&#x52A8;&#x751F;&#x6210;</td>
          <td>Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>colon</td>
          <td>&#x662F;&#x5426;&#x663E;&#x793A; <code>label</code> &#x540E;&#x7684;&#x5192;&#x53F7;,&#x914D;&#x5408;<code>label</code>&#x5C5E;&#x6027;&#x4F7F;&#x7528;</td>
          <td>Boolean</td>
          <td>true</td>
        </tr>
        <tr>
          <td>extra</td>
          <td>&#x989D;&#x5916;&#x4FE1;&#x606F;,&#x4E0E;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x540C;&#x65F6;&#x5B58;&#x5728;</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>help</td>
          <td>&#x5E2E;&#x52A9;&#x4FE1;&#x606F;, &#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x4FE1;&#x606F;,&#x5219;&#x9690;&#x85CF;</td>
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
          <th>&#x540D;&#x79F0;</th>
          <th>&#x63CF;&#x8FF0;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>label</td>
          <td>&#x81EA;&#x5B9A;&#x4E49; label &#x5185;&#x5BB9;</td>
        </tr>
        <tr>
          <td>extra</td>
          <td>&#x81EA;&#x5B9A;&#x4E49;&#x989D;&#x5916;&#x5185;&#x5BB9;</td>
        </tr>
        <tr>
          <td>help</td>
          <td>&#x81EA;&#x5B9A;&#x4E49;&#x5E2E;&#x52A9;&#x4FE1;&#x606F;</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxfielddecorator">UxFieldDecorator</h3>

    <h4 class="mume-header"
        id="props-2">Props</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>name</td>
          <td>&#x8F93;&#x5165;&#x63A7;&#x4EF6;&#x552F;&#x4E00;&#x6027;&#x6807;&#x793A;(<code>required</code>)</td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>rules</td>
          <td><code>vee-validate</code>&#x6821;&#x9A8C;&#x89C4;&#x5219;</td>
          <td>String|Object|Array</td>
          <td></td>
        </tr>
        <tr>
          <td>validator</td>
          <td>&#x9A8C;&#x8BC1;&#x8BBE;&#x7F6E;, &#x8BE6;&#x89C1;&#x4E0B;&#x65B9;&#x6587;&#x6863;</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>hasFeedback</td>
          <td><code>UxInput</code>&#x7EC4;&#x4EF6;&#x5C55;&#x793A;&#x72B6;&#x6001;&#x56FE;&#x6807;,</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>alias</td>
          <td>&#x6821;&#x9A8C;&#x663E;&#x793A;&#x7684;&#x5B57;&#x6BB5;&#x540D;&#x79F0;, &#x9ED8;&#x8BA4;&#x4E3A;<code>FormItem</code>&#x7684;<code>label</code></td>
          <td>String</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="slots-1">Slots</h4>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x540D;&#x79F0;</th>
          <th>&#x63CF;&#x8FF0;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>suffix</td>
          <td>fieldDecorator &#x5143;&#x7D20;&#x540E;&#x7F00;</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxform-flags">UxForm Flags</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x5C5E;&#x6027;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>pristine</td>
          <td>&#x662F;&#x5426;&#x672A;&#x624B;&#x52A8;&#x64CD;&#x4F5C;</td>
        </tr>
        <tr>
          <td>dirty</td>
          <td>&#x662F;&#x5426;&#x5DF2;&#x624B;&#x52A8;&#x64CD;&#x4F5C;</td>
        </tr>
        <tr>
          <td>valid</td>
          <td>&#x662F;&#x5426;&#x6709;&#x6548;</td>
        </tr>
        <tr>
          <td>invalid</td>
          <td>&#x662F;&#x5426;&#x65E0;&#x6548;</td>
        </tr>
        <tr>
          <td>validated</td>
          <td>&#x662F;&#x5426;&#x81F3;&#x5C11;&#x88AB;&#x9A8C;&#x8BC1;&#x4E86;&#x4E00;&#x6B21;</td>
        </tr>
        <tr>
          <td>pending</td>
          <td>&#x662F;&#x5426;&#x9A8C;&#x8BC1;&#x8FC7;&#x7A0B;&#x4E2D;</td>
        </tr>
        <tr>
          <td>changed</td>
          <td>&#x503C;&#x662F;&#x5426;&#x5DF2;&#x88AB;&#x6539;&#x53D8;</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="uxform-static-methods">UxForm Static Methods</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x65B9;&#x6CD5;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>extendValidator</td>
          <td>&#x81EA;&#x5B9A;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;, &#x7531;&#x4E8E;&#x5E95;&#x5C42;<code>vee-validator</code>&#x7684;&#x9650;&#x5236;,<strong>&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x89C4;&#x5219;&#x90FD;&#x662F;&#x5168;&#x5C40;&#x7684;</strong></td>
          <td>Function(ruleName, Validator, options={hasTarget:false, locale: &apos;zh_CN&apos;})</td>
        </tr>
      </tbody>
    </table>
    <p>&#x4F7F;&#x7528;&#x53EF;&#x53C2;&#x8003;,&#x4F8B;&#x5B50;&#x4E2D;&#x7684; &#x81EA;&#x5B9A;&#x4E49;&#x89C4;&#x5219;&#x793A;&#x4F8B; &#x4EE5;&#x53CA;<a href="https://baianat.github.io/vee-validate/guide/custom-rules.html">&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x5185;&#x5BB9;</a></p>
    <h3 class="mume-header"
        id="uxform-methods">UxForm Methods</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x65B9;&#x6CD5;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>validate</td>
          <td>&#x6821;&#x9A8C;&#x8F93;&#x5165;&#x7EC4;&#x4EF6;&#x7684;&#x503C;, &#x5982;&#x672A;&#x4F20;&#x9012;<code>FieldDecorator.name</code>,&#x5219;&#x9A8C;&#x8BC1;&#x6240;&#x6709;&#x7EC4;&#x4EF6;,&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; promise</td>
          <td>Function([fieldName:String])=&gt;Promise&lt;valid:Boolean, values:Object&gt;</td>
        </tr>
        <tr>
          <td>resetFields</td>
          <td>&#x91CD;&#x7F6E;&#x8868;&#x5355;, &#x5C06;&#x6240;&#x6709;&#x5B57;&#x6BB5;&#x7F6E;&#x4E3A;&#x521D;&#x59CB;&#x503C;,&#x5E76;&#x6E05;&#x9664;&#x6821;&#x9A8C;&#x7ED3;&#x679C;</td>
          <td>Function()</td>
        </tr>
        <tr>
          <td>clearErrors</td>
          <td>&#x6E05;&#x9664;&#x6821;&#x9A8C;&#x7ED3;&#x679C;</td>
          <td>Function()</td>
        </tr>
        <tr>
          <td>getFieldError</td>
          <td>&#x83B7;&#x53D6;&#x67D0;&#x4E2A;&#x8F93;&#x5165;&#x7EC4;&#x4EF6; Error</td>
          <td>Function(fieldName)</td>
        </tr>
        <tr>
          <td>getFieldsError</td>
          <td>&#x83B7;&#x53D6;&#x4E00;&#x7EC4;&#x8F93;&#x5165;&#x7EC4;&#x4EF6; Error, &#x5982;&#x679C;&#x672A;&#x4F20;&#x9012;&#x53C2;&#x6570;,&#x5219;&#x83B7;&#x53D6;&#x6240;&#x6709; Error</td>
          <td>Function([fieldNames:String[]])</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="validator-options">Validator options</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>initial</td>
          <td>&#x662F;&#x5426;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x6821;&#x9A8C;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>events</td>
          <td>&#x89E6;&#x53D1;&#x6821;&#x9A8C;&#x65F6;&#x673A;</td>
          <td>String</td>
          <td><code>input|blur</code></td>
        </tr>
        <tr>
          <td>disable</td>
          <td>&#x662F;&#x5426;&#x7981;&#x6B62;&#x89E6;&#x53D1; <code>events</code> &#x6307;&#x5B9A;&#x4E8B;&#x4EF6;</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>delay</td>
          <td>&#x5EF6;&#x8FDF;&#x89E6;&#x53D1;<code>events</code>&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>rejectsFalse</td>
          <td>&#x5F53;&#x503C;&#x4E3A;<code>false</code>&#x65F6;,<code>required</code>&#x89C4;&#x5219;&#x662F;&#x5426;&#x5224;&#x5B9A;&#x4E3A;<code>fail</code></td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
      </tbody>
    </table>
    <h3 class="mume-header"
        id="%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99">&#x6821;&#x9A8C;&#x89C4;&#x5219;</h3>

    <table class="api-table">
      <thead>
        <tr>
          <th>&#x53C2;&#x6570;&#x540D;</th>
          <th>&#x63CF;&#x8FF0;</th>
          <th>&#x7C7B;&#x578B;</th>
          <th>&#x9ED8;&#x8BA4;</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>required</td>
          <td>&#x662F;&#x5426;&#x5FC5;&#x9009;</td>
          <td>required:Boolean</td>
          <td>required:true</td>
        </tr>
        <tr>
          <td>in</td>
          <td>&#x679A;&#x4E3E;</td>
          <td>in:list</td>
          <td>&apos;in:1,2,3,4&apos;&#x6216;{in:[1,2,3,4]}</td>
        </tr>
        <tr>
          <td>not_in</td>
          <td>&#x5426;&#x5B9A; &#x679A;&#x4E3E;</td>
          <td>not_in:list</td>
          <td>&apos;not_in:1,2,3,4&apos;{not_in:[1,2,3,4]}</td>
        </tr>
        <tr>
          <td>digits</td>
          <td>&#x5B9A;&#x957F;</td>
          <td>digits:length</td>
          <td></td>
        </tr>
        <tr>
          <td>max</td>
          <td>&#x6700;&#x5927;&#x9650;&#x957F;</td>
          <td>max:length</td>
          <td></td>
        </tr>
        <tr>
          <td>min</td>
          <td>&#x6700;&#x5C0F;&#x9650;&#x957F;</td>
          <td>min:length</td>
          <td></td>
        </tr>
        <tr>
          <td>max_value</td>
          <td>&#x6700;&#x5927;&#x503C;</td>
          <td>max_value:value</td>
          <td></td>
        </tr>
        <tr>
          <td>min_value</td>
          <td>&#x6700;&#x5C0F;&#x503C;</td>
          <td>min_value:value</td>
          <td></td>
        </tr>
        <tr>
          <td>email</td>
          <td>&#x90AE;&#x4EF6;</td>
          <td>email</td>
          <td></td>
        </tr>
        <tr>
          <td>regex</td>
          <td>&#x6B63;&#x5219;,&#x5B57;&#x7B26;&#x4E32;&#x683C;&#x5F0F;,&#x4E0D;&#x80FD;&#x4F7F;&#x7528; <code>|</code> &#x548C;<code>,</code>,&#x5EFA;&#x8BAE;&#x6B63;&#x5219;&#x53EA;&#x4F7F;&#x7528; <code>Object</code> &#x683C;&#x5F0F;</td>
          <td>regex:pattern,flags</td>
          <td>{regex: /^\d+$/g}</td>
        </tr>
        <tr>
          <td>between</td>
          <td>&#x503C;&#x57DF;&#x8303;&#x56F4;</td>
          <td>between:min,max</td>
          <td></td>
        </tr>
        <tr>
          <td>confirmed</td>
          <td>&#x6821;&#x9A8C;&#x503C;&#x662F;&#x5426;&#x4E0E; confirmed &#x7684; target &#x7684;&#x503C;&#x76F8;&#x540C;, &#x4E00;&#x822C;&#x7528;&#x4E8E;&#x5BC6;&#x7801;&#x786E;&#x8BA4;</td>
          <td>confirmed:target</td>
          <td>{confirmed:password}</td>
        </tr>
        <tr>
          <td>alpha</td>
          <td>&#x53EA;&#x80FD;&#x5305;&#x542B;<a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L6">alphabetic characters</a></td>
          <td>alpha:locale</td>
          <td>&apos;alpha&apos;&#x6216;&apos;alpha:en&apos;</td>
        </tr>
        <tr>
          <td>alpha_num</td>
          <td>&#x53EF;&#x4EE5;&#x5305;&#x62EC;<a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L46">alphabetic characters, numbers</a></td>
          <td>alpha_num:locale</td>
          <td>&apos;alpha_num&apos;&#x6216;&apos;alpha_num:en&apos;</td>
        </tr>
        <tr>
          <td>alpha_spaces</td>
          <td>&#x53EF;&#x4EE5;&#x5305;&#x62EC;<a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L26">alphabetic characters or spaces</a></td>
          <td>alpha_spaces:locale</td>
          <td>&apos;alpha_spaces&apos;&#x6216;&apos;alpha_spaces:en&apos;</td>
        </tr>
        <tr>
          <td>alpha_dash</td>
          <td>&#x53EF;&#x4EE5;&#x5305;&#x62EC;<a href="https://github.com/baianat/vee-validate/blob/master/src/rules/alpha_helper.js#L66">alphabetic characters, numbers, dashes or underscores</a></td>
          <td>alpha_dash:locale</td>
          <td>&apos;alpha_dash&apos;&#x6216;&apos;alpha_dash:en&apos;</td>
        </tr>
      </tbody>
    </table>
    <p>&#x66F4;&#x591A;&#x89C4;&#x5219;&#x8BE6;&#x89C1;: <a href="https://baianat.github.io/vee-validate/guide/rules.html">vee-validate</a></p>
    <h3 class="mume-header"
        id="%E6%A0%A1%E9%AA%8C%E6%8F%90%E7%A4%BA%E6%96%87%E6%A1%88">&#x6821;&#x9A8C;&#x63D0;&#x793A;&#x6587;&#x6848;</h3>

    <ol>
      <li>
        <p><code>Form</code> &#x6821;&#x9A8C;&#x5305;&#x542B;&#x9ED8;&#x8BA4;<a href="https://github.com/baianat/vee-validate/blob/master/locale/zh_CN.js">&#x63D0;&#x793A;&#x6587;&#x6848;</a></p>
      </li>
      <li>
        <p>&#x53EF;&#x4F7F;&#x7528; <code>Form</code> &#x7684;<code>messages</code>&#x5C5E;&#x6027;&#x5B9A;&#x4E49;&#x63D0;&#x793A;&#x6587;&#x6848;</p>
      </li>
    </ol>
    <pre data-role="codeBlock"
         data-info="javascript"
         class="language-javascript"><span class="token punctuation">{</span>
  email<span class="token punctuation">:</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token string">` </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> &#x5FC5;&#x987B;&#x662F;&#x6709;&#x6548;&#x7684;&#x90AE;&#x7BB1;.`</span></span><span class="token punctuation">,</span>
  <span class="token keyword">in</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>field<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token string">` </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> &#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x503C;.`</span></span><span class="token punctuation">,</span>
  digits<span class="token punctuation">:</span> <span class="token punctuation">(</span>field<span class="token punctuation">,</span> <span class="token punctuation">[</span>length<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token string">` </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>field<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> &#x5FC5;&#x987B;&#x662F;&#x6570;&#x5B57;&#xFF0C;&#x4E14;&#x7CBE;&#x786E;&#x5230; </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>length<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&#x6570;`</span></span><span class="token punctuation">,</span>
  required<span class="token punctuation">:</span> &apos;&#x8BF7;&#x8F93;&#x5165;&#x503C;`<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</pre>
    <ol start="3">
      <li>&#x5355;&#x4E2A;&#x7EC4;&#x4EF6;&#x5355;&#x72EC;&#x5B9A;&#x4E49;&#x6587;&#x6848;</li>
    </ol>
    <blockquote>
      <p>&#x652F;&#x6301;<code>String</code>, <code>Object</code>, <code>Array</code>&#x683C;&#x5F0F;</p>
    </blockquote>
    <pre data-role="codeBlock"
         data-info="html"
         class="language-html">//String
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>field<span class="token punctuation">&quot;</span></span> <span class="token attr-name">rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>required|in:1,2,3,4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>item.value<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">&gt;</span></span>

// Object
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>field<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>{required:true, message:<span class="token punctuation">&apos;</span>&#x8BF7;&#x8F93;&#x5165;&#x503C;<span class="token punctuation">&apos;</span>}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>item.value<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>field<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>{required:true, email:true}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>item.value<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">&gt;</span></span>

// Array
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-field-decorator</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>field<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:rules</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>[{required:true, message:<span class="token punctuation">&apos;</span>&#x8BF7;&#x8F93;&#x5165;&#x503C;<span class="token punctuation">&apos;</span>},{max:10,message: <span class="token punctuation">&apos;</span>&#x6700;&#x5927;&#x957F;&#x5EA6;<span class="token punctuation">&apos;</span>}]<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ux-input</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">&quot;</span>item.value<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ux-field-decorator</span><span class="token punctuation">&gt;</span></span>
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
