## API

### UxModal

#### Props

| 参数名        | 描述                           | 类型                      | 默认              |
| ------------- | ------------------------------ | ------------------------- | ----------------- |
| value         | 对话框是否可见, 可使用 v-model | Boolean                   | false             |
| title         | 标题                           | String                    |                   |
| closable      | 是否显示右上角关闭按钮         | Boolean                   | true              |
| width         | 宽度                           | String                    | '520px'           |
| ok-type       | 确定按钮类型                   | String                    | 'primary'         |
| ok-text       | 确定按钮文字                   | String                    | '确定'            |
| cancel-text   | 取消按钮文字                   | String                    | '取消'            |
| mask-closable | 点击蒙层是否关闭               | Boolean                   | true              |
| z-index       | z-index                        | String\|Number            | 1000              |
| dialog-class  | String\|Array\|Object          | 浮层类名                  |                   |
| dialog-style  | Object                         | 浮层样式                  |                   |
| wrap-class    | String\|Array\|Object          | modal 外层类名            |                   |
| wrap-style    | Object                         | modal 外层样式            |                   |
| get-container | Function=>HTMlElement          | modal 挂载点              | ()=>document.body |
| body-style    | Object                         | modal body 样式           |                   |
| mask-style    | Object                         | 蒙层样式                  |                   |
| mask          | Boolean                        | 是否显示蒙层              | true              |
| hide-footer   | Boolean                        | 是否隐藏操作区域          | false             |
| ok-cancel     | Boolean                        | 是否显示取消按钮          | true              |
| control       | Boolean                        | 是否手工控制 `modal` 关闭 | false             |

#### Events

| 事件名      | 描述                 | 回调                 |
| ----------- | -------------------- | -------------------- |
| ok          | 点击确定按钮时触发   | Function(e:DomEvent) |
| cancel      | 点击取消按钮时触发   | Function(e:DomEvent) |
| after-close | modal 完全关闭时触发 | Function(e:DomEvent) |

### Slot

| name   | 描述           |
| ------ | -------------- |
| title  | 自定义标题     |
| footer | 自定义按钮区域 |

### UxModal.method()

包括:

* `UxModal.info`
* `UxModal.success`
* `UxModal.error`
* `UxModal.warning`
* `UxModal.confirm`

以上方法, 返回一个`Promise`,点击`ok`触发`fulfilled`,点击`cancel`触发`rejected`; 接收一个 `Object` 作为参数, 具体属性如下:

#### Props

| 参数名                  | 描述                       | 类型                     | 默认            |
| ----------------------- | -------------------------- | ------------------------ | --------------- |
| title                   | 标题                       | String\|JSX\|VNode       |                 |
| content                 | 内容                       | String\|JSX\|VNode\|Html |                 |
| dangerouslySetInnerHTML | content 是否作为 html 处理 | Boolean                  | false           |
| iconType                | 图标 Icon 类型             | String                   | question-circle |
| maskClosable            | 点击蒙层是否关闭           | Boolean                  | false           |
| cancelText              | 取消按钮文字               | String                   | '取消'          |
| okText                  | 确定按钮文字               | String                   | '确定'          |
| okType                  | 确定按钮类型               | String                   | 'primary'       |
| width                   | 宽度                       | String                   | '416px'         |
| zIndex                  | z-index                    | String\|Number           | 1000            |
