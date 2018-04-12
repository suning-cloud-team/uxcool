## API

### UxSlider

#### Props

| 参数名       | 描述                                                                                                      | 类型                      | 默认                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------- |
| value        | 值,当`range=true`时,value 为[Number,Number],否则是 Number                                                 | Number \| [Number,Number] | 0                                                                 |
| disabled     | 禁用                                                                                                      | Boolean                   | false                                                             |
| vertical     | 垂直模式                                                                                                  | Boolean                   | false                                                             |
| range        | 多滑块模式                                                                                                | Boolean                   | false                                                             |
| tipFormatter | 格式化显示 tip, 当`tipFormatter=false`时,不显示 tip                                                       | Function(value)\|false    |                                                                   |
| min          | 最小值                                                                                                    | Number                    | 0                                                                 |
| max          | 最大值                                                                                                    | Number                    | 100                                                               |
| step         | 步长,必须大于 0,且能够被`max-min` 整除,当 marks 不为空,可设定`step=false`,使 Slider 只能选中 marks 中的值 | Number\|false             | 1                                                                 |
| marks        | 刻度, `key`取值只能是 Number,且在 min-max 之中,每个刻度可单独设置`style`,值支持 String 和原生 Html 标签   | Object                    | {Number:String}\|{Number:{style:{},isDot: Boolean, label:String}} |
| included     | marks 不为空时有效, `true`时,表示包含, `false`表示并列                                                    | Boolean                   | true                                                              |
| dots         | 当`step`不为 false 时,设置`dots=true`,则将每一个 step 渲染为 dot                                          | Boolean                   | false                                                             |

#### Events

| 事件名       | 描述                    | 回调            |
| ------------ | ----------------------- | --------------- |
| change       | 当 Slider 值变化时触发  | Function(value) |
| after-change | 当 onmouseup 触发后触发 | Function(value) |

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 获得焦点 |
| blur  | 失去焦点 |
