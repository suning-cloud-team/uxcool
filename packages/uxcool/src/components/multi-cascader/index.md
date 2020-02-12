## API

### UxMultiCascader

#### Props

| 参数名              | 描述                                                             | 类型                      | 默认                                                   |
| ------------------- | ---------------------------------------------------------------- | ------------------------- | ------------------------------------------------------ |
| data-source         | 数据源                                                           | Array                     |                                                        |
| load-data           | 动态加载数据                                                     | Function                  |                                                        |
| value               | 值(v-model),是个二维数组                                         | Array                     |                                                        |
| popup-class         | 自定义弹层类名                                                   | String\|Object\|Array     |                                                        |
| popup-style         | 自定义弹层样式                                                   | Object                    |                                                        |
| popup-placement     | 弹层位置, 可选值:`topLeft`,`topRight`,`bottomLeft`,`bottomRight` | String                    | bottomLeft                                             |
| popup-visible       | 控制弹层是否显示                                                 | Boolean                   | false                                                  |
| get-popup-container | 自定义弹层容器                                                   | Function()=>HTMLElement   |                                                        |
| placeholder         | 输入框占位文案                                                   | String                    | 请选择                                                 |
| size                | 输入框大小,可选址: `large`,`small`, `default`                    | String                    | default                                                |
| disabled            | 是否禁用                                                         | Boolean                   | false                                                  |
| allow-clear         | 是否可清除                                                       | Boolean                   | true                                                   |
| expand-trigger      | 触发弹层方式,可选值: `hover`,`click`                             | String                    | click                                                  |
| checkStrict         | 是否不再关联父子勾选情况                                         | Boolean                   | false                                                  |
| field-names         | 自定义`data-source`中的`label`,`value`,`children`键名            | Object                    | { label: 'label', value:'value', children: 'children'} |
| display-render      | 自定义选中值渲染函数                                             | Function=>VNode           | (labels, nodes)=> labels.join(' \ ')                   |
| render-label        | 自定义`label`渲染函数                                            | Function=>VNode \| String |                                                        |
| max-tag-count       | 最大显示标签数                                                   | Number\|String            | -1                                                     |
| max-tag-placeholder | 超出最大显示标签数的提示信息                                     | Function => VNode\|String |                                                        |

#### Slots

| 名称        | 描述                                  |
| ----------- | ------------------------------------- |
| renderLabel | 自定义渲染`label`(仅支持`slot-scope`) |

#### Events

| 事件名               | 描述                 | 回调                   |
| -------------------- | -------------------- | ---------------------- |
| change               | 选择完成后触发       | Function(values,nodes) |
| popup-visible-change | 显示/隐藏 弹窗后触发 | Function(visible)      |
