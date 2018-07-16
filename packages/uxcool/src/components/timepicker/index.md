## API

### UxTimepicker

#### Props

| 参数名               | 描述                                                                                    | 类型                       | 默认       |
| -------------------- | --------------------------------------------------------------------------------------- | -------------------------- | ---------- |
| value                | 值                                                                                      | Date                       | null       |
| open-value           | 面板打开时的默认值, 当存在`value`时,以`value`为准                                       | Date                       | new Date() |
| visible              | 是否显示下拉面板                                                                        | Boolean                    | false      |
| disabled             | 是否禁用                                                                                | Boolean                    | false      |
| popup-class          | 自定义面板类                                                                            | String\|Object\|Array      |            |
| popup-style          | 自定义面板样式                                                                          | Object                     |            |
| get-popup-container  | 自定义面板渲染位置                                                                      | Function=>HTMLElement      |            |
| autofocus            | 自动获取焦点                                                                            | Boolean                    | false      |
| size                 | 大小,可选值:`small`,`default`,`large`                                                   | String                     |            |
| addon                | 额外内容                                                                                | String                     |            |
| allow-clear          | 是否显示清除按钮                                                                        | Boolean                    | false      |
| clear-text           | 清除按钮提示文案                                                                        | String                     | clear      |
| placeholder          | 占位符                                                                                  | String                     | 请选择时间 |
| format               | [时间格式](https://date-fns.org/v1.29.0/docs/format),(此字段可以控制面板中实际展示的列) | String                     | HH:mm:ss   |
| hour-step            | 小时间隔                                                                                | Number\|String             | 1          |
| minute-step          | 分钟间隔                                                                                | Number\|String             | 1          |
| second-step          | 秒间隔                                                                                  | Number\|String             | 1          |
| disabled-hours       | 自定义小时禁用项                                                                        | Function() =>[]            |            |
| disabled-minutes     | 自定义分钟禁用项                                                                        | Function(hour) =>[]        |            |
| disabled-seconds     | 自定义秒禁用项                                                                          | Function(hour,minutes)=>[] |            |
| hide-disabled-option | 禁用项是否隐藏                                                                          | Boolean                    | false      |
| input-readonly       | 输入框是否只读                                                                          | Boolean                    | false      |
| focus-on-open        | 面板打开时,输入框是否获取选中                                                           | Boolean                    | false      |

#### Events

| 事件名               | 描述                | 回调                         |
| -------------------- | ------------------- | ---------------------------- |
| change               | 选取值时触发        | Function(value,formatValue ) |
| popup-visible-change | 面板显示/隐藏时触发 | Function(visible )           |

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 设置焦点 |
| blur  | 失去焦点 |
