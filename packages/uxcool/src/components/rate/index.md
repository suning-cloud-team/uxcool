## API

### UxRate

#### Props

| 参数名      | 描述                   | 类型    | 默认  |
| ----------- | ---------------------- | ------- | ----- |
| value       | 值                     | Number  | 0     |
| count       | star 数量              | Number  | 5     |
| disabled    | 是否只读               | Boolean | false |
| allow-half  | 是否允许半选           | Boolean | false |
| allow-clear | 是否支持再次点击后清除 | Boolean | true  |
| character   | 自定义字符             | String  |       |
| autofocus   | 是否自动获取焦点       | Boolean | false |

#### Events

| 事件名       | 描述                     | 回调                    |
| ------------ | ------------------------ | ----------------------- |
| change       | 选择 star 时回调         | Function(value:Number)  |
| hover-change | 鼠标在`rate`上移动时触发 | Function(value: Number) |
| focus        | 获取焦点是触发           | Function()              |
| blur         | 失去焦点是触发           | Function()              |

#### Slots

| 名称      | 描述                                |
| --------- | ----------------------------------- |
| character | 自定义字符(**只支持 `slot-scope`**) |

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 设置焦点 |
| blur  | 设置焦点 |
