## API

### UxProgress

#### Props

| 参数名         | 描述                                                                                            | 类型                        | 默认                                        |
| -------------- | ----------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------- |
| type           | 类型,可选值: `line`,`circle`,`dashboard`                                                        | String                      | 'line'                                      |
| format         | 格式化进度条内容                                                                                | Function(percentage)=>VNode |                                             |
| status         | 状态,可选值:`success`,`error`,`active`                                                          | String                      |                                             |
| hide-info      | 是否显示进度条内容                                                                              | Boolean                     | false                                       |
| size           | 进度条大小,可选值:`small`,`default`<br>(`type=line`有效,`type=circle`请使用`width`设置画布大小) | String                      |                                             |
| percentage     | 百分比                                                                                          | Number\|String              | 0                                           |
| stroke-width   | 线宽                                                                                            | Number\|Sting               | `line`默认宽度为`8px`,`circle`默认值为`6px` |
| stroke-linecap | 线帽,可选值:`round`, `square`                                                                   | String                      | 'round'                                     |
| stroke-color   | 线条颜色                                                                                        | String                      |                                             |
| width          | 画布宽度(`type=circle`有效)                                                                     | Number\|String              |                                             |
| gap-degree     | 圆形进度条缺口角度(0-360)(`type=circle`有效)                                                    | Number\|String              | 0                                           |
| gap-position   | 圆形进度条缺口位置,可选值:`top`,`left`,`right`,`bottom`(`type=circle`有效)                      | String                      | 'top'                                       |
