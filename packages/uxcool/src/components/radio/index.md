## API

### UxRadio

#### Props

| 参数名   | 描述                   | 类型    | 默认  |
| -------- | ---------------------- | ------- | ----- |
| checked  | 是否选中(v-model 绑定) | Boolean | false |
| value    | 值                     | String  |       |
| disabled | 是否禁用               | Boolean | null  |
| label    | radio label 值         | String  |       |
| name     | radio name             | String  |       |

#### Events

| 事件名 | 描述           | 回调                          |
| ------ | -------------- | ----------------------------- |
| change | 切换选中时触发 | Function(e:{target,domEvent}) |

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 设置焦点 |
| blur  | 设置焦点 |

### UxRadioButton

#### Props

| 参数名   | 描述                   | 类型    | 默认  |
| -------- | ---------------------- | ------- | ----- |
| checked  | 是否选中(v-model 绑定) | Boolean | false |
| value    | 值                     | String  |       |
| disabled | 是否禁用               | Boolean | null  |
| label    | radio label 值         | String  |       |
| name     | radio name             | String  |       |

### UxRadioGroup

#### Props

| 参数名   | 描述                                                              | 类型                                           | 默认    |
| -------- | ----------------------------------------------------------------- | ---------------------------------------------- | ------- |
| type     | radio 组类型 defalut\|button                                      | String                                         | default |
| name     | 设置 group 中 radio 的 name                                       | String                                         |         |
| options  | radio 列表                                                        | Array\<Object:{label,value,disabled}\|String\> |         |
| value    | 选中值                                                            | String                                         |         |
| disabled | 是否禁用                                                          | disabled                                       |         |
| size     | 设置 radioButton 大小, type='button'时有效. large\|default\|small | String                                         | default |

#### Events

| 事件名 | 描述       | 回调                                              |
| ------ | ---------- | ------------------------------------------------- |
| change | 切换时调用 | Function(checkedVal:String,prevCheckedVal:String) |
