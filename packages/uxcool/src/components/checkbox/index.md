## API

### UxCheckbox

#### Props

| 参数名        | 描述                    | 类型    | 默认  |
| ------------- | ----------------------- | ------- | ----- |
| checked       | 是否选中                | Boolean | false |
| value         | 值                      | String  |       |
| disabled      | 是否禁用                | Boolean | null  |
| indeterminate | 设置 indeterminate 状态 | Boolean | false |
| label         | checkbox label 值       | String  |       |

#### Events

| 事件名 | 描述           | 回调                          |
| ------ | -------------- | ----------------------------- |
| change | 切换选中时触发 | Function(e:{target,domEvent}) |

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 设置焦点 |
| blur  | 设置焦点 |

### UxCheckboxGroup

#### Props

| 参数名   | 描述          | 类型                                           | 默认 |
| -------- | ------------- | ---------------------------------------------- | ---- |
| options  | checkbox 列表 | Array\<Object:{label,value,disabled}\|String\> |      |
| value    | 选中值        | Array\<String\>                                |      |
| disabled | 是否禁用      | disabled                                       |      |

#### Events

| 事件名 | 描述       | 回调                       |
| ------ | ---------- | -------------------------- |
| change | 切换时调用 | Function(checkedVal:Array) |
