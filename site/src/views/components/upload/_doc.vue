<template>
  <div>
    <ux-heading level="2">API</ux-heading>

    <h3 class="mume-header">UxUpload</h3>

    <p>上传组件仅支持
      <code>IE10+</code>及现代浏览器</p>
    <blockquote>
      <p>后端代码,可参考:
        <a href="https://github.com/blueimp/jQuery-File-Upload/blob/master/server/php/UploadHandler.php">jQuery-File-Upload</a>
      </p>
    </blockquote>
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
          <td>fileList</td>
          <td>已上传文件列表(v-model)</td>
          <td>Array</td>
          <td></td>
        </tr>
        <tr>
          <td>type</td>
          <td>上传方式, 可选值:
            <code>select</code>,
            <code>drag</code>
          </td>
          <td>String</td>
          <td>'select'</td>
        </tr>
        <tr>
          <td>show-upload-list</td>
          <td>是否显示上传列表,可以为
            <code>Object</code>,可包含
            <code>showPreviewIcon</code>,
            <code>showRemoveIcon</code>两个
            <code>Boolean</code>参数</td>
          <td>Boolean|Object</td>
          <td></td>
        </tr>
        <tr>
          <td>list-type</td>
          <td>上传列表样式,可选值:
            <code>text</code>,
            <code>picture</code>,
            <code>picture-card</code>
          </td>
          <td>String</td>
          <td>'text'</td>
        </tr>
        <tr>
          <td>name</td>
          <td>文件参数名</td>
          <td>String</td>
          <td>'file'</td>
        </tr>
        <tr>
          <td>action</td>
          <td>文件上传地址(required)</td>
          <td>String|Function(file)=&gt;String|Promise</td>
          <td></td>
        </tr>
        <tr>
          <td>accept</td>
          <td>接受上传的文件类型,
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept">详见</a>
          </td>
          <td>String</td>
          <td></td>
        </tr>
        <tr>
          <td>multiple</td>
          <td>是否支持多选(IE10+支持)</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>directory</td>
          <td>是否支持目录上传,
            <a href="https://caniuse.com/#feat=input-file-directory">caniuse</a>
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>data</td>
          <td>额外的参数</td>
          <td>Object|Function(file)=&gt;Object|Promise</td>
          <td></td>
        </tr>
        <tr>
          <td>headers</td>
          <td>自定义请求头(IE10+支持)</td>
          <td>Object</td>
          <td></td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>是否禁用</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>custom-request</td>
          <td>自定义底层请求实现</td>
          <td>Function(Options)</td>
          <td></td>
        </tr>
        <tr>
          <td>before-ready</td>
          <td>选择文件之后的钩子,参数为:
            <code>selectedFiles</code>当前选择文件列表,
            <code>fileList</code>除当次以外所有已选择的文件列表,返回
            <code>Boolean</code>,此处可验证上传文件个数</td>
          <td>Function(selectedFiles, fileList) =&gt;Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>before-upload</td>
          <td>上传之前的钩子,可以返回
            <code>Promise</code>或
            <code>Boolean</code>,如果返回
            <code>false</code>则停止上传</td>
          <td>Function(file, selectedFiles)=&gt;Promise|Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>before-remove</td>
          <td>删除文件之前的钩子,可以返回
            <code>Promise</code>或
            <code>Boolean</code>,如果返回
            <code>false</code>则停止删除</td>
          <td>Function(deleteFile)=&gt;Promise|Boolean</td>
          <td></td>
        </tr>
        <tr>
          <td>with-credentials</td>
          <td>请求时是否携带
            <code>Cookie</code>
          </td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>on-preview</td>
          <td>点击文件链接或预览图标时的回调; 传递此参数后,
            <strong>链接的默认行为不会触发</strong>
          </td>
          <td>Function</td>
          <td></td>
        </tr>
        <tr>
          <td>control</td>
          <td>是否完全控制文件列表</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>chunk</td>
          <td>是否 分片上传</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>max-chunk-size</td>
          <td>分片大小</td>
          <td>String|Number</td>
          <td></td>
        </tr>
        <tr>
          <td>uploaded-bytes</td>
          <td>已上传字节数, 使用该属性可实现断点续传</td>
          <td>String|Number|Function=&gt;Promise</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header">Events</h4>

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
          <td>change</td>
          <td>当上传状态改变时触发, 参数详见下面
            <code>onChange</code>
          </td>
          <td>Function({...}))</td>
        </tr>
        <tr>
          <td>remove</td>
          <td>移除文件时回调</td>
          <td>Function(file, fileList)</td>
        </tr>
        <tr>
          <td>progress</td>
          <td>上传进度改变时触发</td>
          <td>Function(e, file, fileList)</td>
        </tr>
      </tbody>
    </table>
    <h4 class="mume-header"
        id="change-%E4%BA%8B%E4%BB%B6">change 事件</h4>

    <blockquote>
      <p>选择后(ready),上传中(uploading),进度(progress), 成功后(success),失败后(error),删除后(removed)都会触发此事件</p>
    </blockquote>
    <p>转台改变时,总是会传递一下参数:</p>
    <pre data-role="codeBlock"
         data-info="javascript"
         class="language-javascript"><span class="token punctuation">{</span>
  file<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  fileList<span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  event<span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token comment">// `status = progress`有此属性</span>
<span class="token punctuation">}</span>
</pre>
    <p>
      <strong>before-upload,before-ready 的参数
        <code>file</code> 对象为选择文件的
        <code>File</code> 实例,与下面的
        <code>file</code> 不一致</strong>
    </p>
    <ol>
      <li>
        <code>file</code> 当前操作的文件对象,</li>
    </ol>
    <pre data-role="codeBlock"
         data-info=""
         class="language-"><code>{
  uid:&apos;&apos;, //&#x6587;&#x4EF6;&#x552F;&#x4E00;&#x6807;&#x8BC6;
  name: &apos;&apos;,// &#x6587;&#x4EF6;&#x540D;
  status: &apos;ready&apos;, // &#x72B6;&#x6001;&#x6709;: `ready`,`uploading`,`success`,`progress`,`error`, &apos;removed&apos;
  response:{},// &#x670D;&#x52A1;&#x7AEF;&#x54CD;&#x5E94;, `status===success&#x6216;error`&#x65F6;&#x5B58;&#x6709;&#x6B64;&#x5C5E;&#x6027;,
  error:{},// `status===error`&#x65F6;&#x6709;&#x6B64;&#x5C5E;&#x6027;
  linkProps: {download: &apos;&apos;}, // &#x7528;&#x6237;&#x53EF;&#x901A;&#x8FC7;&#x6B64;&#x5C5E;&#x6027;, &#x8BBE;&#x7F6E;&#x4E0B;&#x8F7D;&#x5730;&#x5740;
}
</code></pre>
    <ol start="2">
      <li>
        <p>
          <code>fileList</code> 当前文件列表</p>
      </li>
      <li>
        <p>
          <code>event</code> 上传中的服务端响应, 包含进度等信息(IE10+支持)</p>
      </li>
    </ol>

  </div>
</template>
