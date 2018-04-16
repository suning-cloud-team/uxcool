## API

### UxAlert

#### Props

| 参数名      | 描述                                              | 类型    | 默认                               |
| ----------- | ------------------------------------------------- | ------- | ---------------------------------- |
| banner      | 是否用作顶部公告                                  | Boolean | false                              |
| type        | 类型,可选值: `warning`,`success`, `info`, `error` | String  | info,banner=true 时,默认`warning`  |
| closable    | 是否可关闭                                        | Boolean | false                              |
| close-text  | 自定义关闭文案                                    | String  |                                    |
| message     | 提示内容                                          | String  |                                    |
| description | 额外的提示内容                                    | String  |                                    |
| show-icon   | 是否显示 Icon                                     | Boolean | false,banner=true 时,默认为 `true` |
| icon-type   | 自定义 icon 图标                                  | String  |                                    |

#### Slots

| 名称        | 描述               |
| ----------- | ------------------ |
| closeText   | 自定义关闭 Icon    |
| message     | 自定义提示内容     |
| description | 自定义额外提示内容 |

#### Events

| 事件名      | 描述                      | 回调        |
| ----------- | ------------------------- | ----------- |
| close       | 关闭 Alert 时触发         | Function(e) |
| after-close | 关闭 Alert 动效结束后触发 | Function()  |
