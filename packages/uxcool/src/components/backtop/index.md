## API

### UxBacktop

#### Props

| 参数名           | 描述                                          | 类型                  | 默认       |
| ---------------- | --------------------------------------------- | --------------------- | ---------- |
| visibilityHeight | 显示 `backtop` 的高度                         | Number                | 400        |
| getTarget        | 设置 `backtop` 作用元素, 需返回一个 HTML 元素 | Function=>HTMLElement | ()=>window |

#### Events

| 事件名 | 描述                  | 回调        |
| ------ | --------------------- | ----------- |
| click  | 点击 `backtop` 后触发 | Function(e) |
