## API

### UxTag

#### Props

| 参数名   | 描述       | 类型    | 默认  |
| -------- | ---------- | ------- | ----- |
| color    | tag 颜色   | String  |       |
| closable | 是否可关闭 | Boolean | false |

#### Events

| 事件名      | 描述                   | 类型        |
| ----------- | ---------------------- | ----------- |
| close       | tag 关闭后触发         | Function(e) |
| after-close | tag 关闭动画结束后触发 | Function()  |

### UxCheckableTag

#### Props

| 参数名  | 描述     | 类型    | 默认  |
| ------- | -------- | ------- | ----- |
| checked | 是否选中 | Boolean | false |

#### Events

| 事件名 | 描述               | 类型              |
| ------ | ------------------ | ----------------- |
| change | checked 变化时触发 | Function(checked) |
