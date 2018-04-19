## API

### UxInputNumber

#### Props

| 参数名    | 描述                                        | 类型                 | 默认                    |
| --------- | ------------------------------------------- | -------------------- | ----------------------- |
| value     | 当前值                                      | Number\|String       |                         |
| max       | 最大值                                      | Number               | Number.MAX_SAFE_INTEGER |
| min       | 最小值                                      | Number               | Number.MIN_SAFE_INTEGER |
| step      | 步长                                        | Number               | 1                       |
| precision | 数值精度                                    | Number               |                         |
| size      | 大小,可选值: `large`,`default`,`small`      | String               | default                 |
| autofocus | 自动获取焦点                                | Boolean              | false                   |
| disabled  | 是否不可用                                  | Boolean              | false                   |
| readonly  | 是否只读                                    | Boolean              | false                   |
| formatter | 格式化输入框值                              | Function(currentVal) | null                    |
| parser    | 指定输入框值转换方式, 与 formatter 共同使用 | Function(currentVal) |                         |

#### Events

| 事件名 | 描述                                            | 回调          |
| ------ | ----------------------------------------------- | ------------- |
| change | 只在绑定值变化时触发; `input` 中输入时,不会触发 | Function(val) |

> 支持原生 input 事件

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 获得焦点 |
| blur  | 失去焦点 |
