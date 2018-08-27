## API

### UxUpload

上传组件仅支持 `IE10+`及现代浏览器

#### Props

| 参数名           | 描述                                                                                                                                    | 类型                                            | 默认   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| fileList         | 已上传文件列表(v-model)                                                                                                                 | Array                                           |        |
| show-upload-list | 是否显示上传列表,可以为`Object`,可包含`showPreviewIcon`,`showRemoveIcon`两个`Boolean`参数                                               | Boolean\|Object                                 |        |
| list-type        | 上传列表样式,可选值:`text`,`picture`,`picture-card`                                                                                     | String                                          | 'text' |
| name             | 文件参数名                                                                                                                              | String                                          | 'file' |
| action           | 文件上传地址(required)                                                                                                                  | String\|Function(file)=>String\|Promise         |        |
| accept           | 接受上传的文件类型,[详见](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)                                  | String                                          |
| multiple         | 是否支持多选(IE10+支持)                                                                                                                 | Boolean                                         | false  |
| directory        | 是否支持目录上传,[caniuse](https://caniuse.com/#feat=input-file-directory)                                                              | Boolean                                         | false  |
| data             | 额外的参数                                                                                                                              | Object\|Function(file)=>Object\|Promise         |        |
| headers          | 自定义请求头(IE10+支持)                                                                                                                 | Object                                          |        |
| disabled         | 是否禁用                                                                                                                                | Boolean                                         | false  |
| custom-request   | 自定义底层请求实现                                                                                                                      | Function(Options)                               |        |
| before-ready     | 选择文件之后的钩子,参数为:`selectedFiles`当前选择文件列表,`fileList`除当次以外所有已选择的文件列表,返回`Boolean`,此处可验证上传文件个数 | Function(selectedFiles, fileList) =>Boolean     |        |
| before-upload    | 上传之前的钩子,可以返回`Promise`或`Boolean`,如果返回`false`则停止上传                                                                   | Function(file, selectedFiles)=>Promise\|Boolean |        |
| before-remove    | 删除文件之前的钩子,可以返回`Promise`或`Boolean`,如果返回`false`则停止删除                                                               | Function(deleteFile)=>Promise\|Boolean          |        |
| with-credentials | 请求时是否携带`Cookie`                                                                                                                  | Boolean                                         | false  |
| on-preview       | 点击文件链接或预览图标时的回调; 传递此参数后,**链接的默认行为不会触发**                                                                 | Function                                        |        |
| control          | 是否完全控制文件列表                                                                                                                    | Boolean                                         | false  |

#### Slots

| 名称  | 描述           |
| ----- | -------------- |
| extra | 自定义额外行为 |

#### Events

| 事件名 | 描述                                         | 回调                     |
| ------ | -------------------------------------------- | ------------------------ |
| change | 当上传状态改变时触发, 参数详见下面`onChange` | Function({...}))         |
| remove | 移除文件时回调                               | Function(file, fileList) |

#### change 事件

> 选择后(ready),上传中(uploading),进度(progress), 成功后(success),失败后(error),删除后(removed)都会触发此事件

转台改变时,总是会传递一下参数:

```javascript
{
  file: {},
  fileList:[],
  event:{},// `status = progress`有此属性
}
```

**before-upload,before-ready 的参数 `file` 对象为选择文件的 `File` 实例,与下面的 `file` 不一致**

1. `file` 当前操作的文件对象,

```
{
  uid:'', //文件唯一标识
  name: '',// 文件名
  status: 'ready', // 状态有: `ready`,`uploading`,`success`,`progress`,`error`, 'removed'
  response:{},// 服务端响应, `status===success或error`时存有此属性,
  error:{},// `status===error`时有此属性
  linkProps: {download: ''}, // 用户可通过此属性, 设置下载地址
}
```

2. `fileList` 当前文件列表

3. `event` 上传中的服务端响应, 包含进度等信息(IE10+支持)
