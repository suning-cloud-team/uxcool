## API

### UxPopconfirm

#### Props

| 参数名     | 描述                            | 类型   | 默认    |
| ---------- | ------------------------------- | ------ | ------- |
| title      | 内容                            | String |         |
| okText     | 确定按钮文案                    | String | 确定    |
| okType     | 确定按钮 类型与`button`类型对应 | String | primary |
| cancelText | 取消按钮文案                    | String | 取消    |

> 更多属性请参考 [UxTooltip](http://uxcool.cnsuning.com/vue/index.html#/components/tooltip)

#### Slots

| 名称  | 描述       |
| ----- | ---------- |
| title | 自定义内容 |

#### Events

| 事件名         | 描述                       | 回调        |
| -------------- | -------------------------- | ----------- |
| confirm        | 点击确定按钮时触发         | Function(e) |
| cancel         | 点击取消按钮时触发         | Function(e) |
| visible-change | popconfirm 显示/隐藏时触发 | Function(e) |
