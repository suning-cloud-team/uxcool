## API

### UxSelect

#### Props

| 参数名                      | 描述                                                                                                                                       | 类型                                  | 默认          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------------- |
| data-source                 | 数据源                                                                                                                                     | Array                                 |               |
| value                       | 选中值                                                                                                                                     | String\|Number\|Array                 |               |
| mode                        | `Select`模式,可选值: `multiple` ,`tags`, `default`                                                                                         | String                                | default       |
| disabled                    | 是否禁用                                                                                                                                   | Boolean                               | false         |
| allow-clear                 | 是否显示清除按钮                                                                                                                           | Boolean                               | false         |
| show-search                 | 是否可搜索(**仅在`mode=default`时有效**)                                                                                                   | Boolean                               | false         |
| placeholder                 | 搜索框占位符                                                                                                                               | String                                | Please Select |
| show-arrow                  | 是否显示下拉箭头                                                                                                                           | Boolean                               | true          |
| popup-class                 | 自定义下拉面板类名                                                                                                                         | String\|Object\|Array                 |               |
| popup-style                 | 自定义下拉面板样式                                                                                                                         | Object                                |               |
| dropdown-match-select-width | 下拉面板与选择器同宽                                                                                                                       | Boolean                               | true          |
| dropdown-menu-style         | 自定义下拉面板中的列表样式                                                                                                                 | Object                                |               |
| get-container               | 自定义下拉面板包裹容器                                                                                                                     | Function()=>HTMLElement               |               |
| filter-option               | 自定义过滤函数.当值为`false`时关闭内置过滤功能                                                                                             | Boolean\|Function(searchVal,option)   |               |
| render-label                | 自定义`label`渲染函数                                                                                                                      | Function(option)=>VNode               |               |
| render-group-label          | 自定义`group label`渲染函数                                                                                                                | Function(option)=>VNode               |               |
| size                        | 大小,可选值: `large`,`default`,`small`                                                                                                     | String                                |
| option-label-prop           | 定义选择框显示的 Option 属性,可选值:`value`,`label`, `children`                                                                            | String                                |               |
| option-filter-prop          | 定义过滤时对应的`Option`属性,可选值: `value`,`label`                                                                                       | String                                | value         |
| max-tag-count               | 最多显示多少个`tag`                                                                                                                        | Number\|String                        |               |
| max-tag-placeholder         | 隐藏多余`tag`时,显示的文案                                                                                                                 | String\|Function(extraOptions)=>VNode |               |
| not-found-content           | 列表为空时显示内容                                                                                                                         | String\|Object                        | Not Found     |
| clear-disabled              | 是否允许清除选择框中的`disabled`选项                                                                                                       | Boolean                               | true          |
| token-separator-prop        | `tags`和`multiple`模式下,分割字符对应的`Option`属性,可选值: `value`, `label`                                                               | String                                | label         |
| token-separators            | 定义`tags`和`multiple`模式下,自定分词的分隔符                                                                                              | Array                                 |               |
| lazy                        | `lazy`模式,可设置`Object{height: 32, remain: 8}`, `height`:每行数据高度, `remain`:保留多少行(设置后可自动撑开高度),或`false`关闭`lazy`模式 | {height: 32, remain: 8}               |

#### Slots

| 名称             | 描述                                               |
| ---------------- | -------------------------------------------------- |
| renderGroupLabel | 自定义`group label`渲染函数(**仅支持 slot-scope**) |
| renderLabel      | 自定义`label`渲染 (**仅支持 slot-scope**)          |

#### Events

| 事件名               | 描述                                            | 回调                        |
| -------------------- | ----------------------------------------------- | --------------------------- |
| change               | 选中值变化时触发                                | Function(values, options )) |
| popup-visible-change | 下拉面板显示/隐藏时触发                         | Function(visible)           |
| select               | 选中`option`时触发                              | Function(value, option)     |
| deselect             | `tags`和`multiple`模式时,`option`取消选中时触发 | Function(value, option)     |
| scroll               | 下拉面板滚动时触发                              | Function(e)                 |
| search               | 搜索值变化时触发                                | Function(searchValue)       |

### UxOption

#### Props

| 参数名   | 描述                        | 类型           | 默认  |
| -------- | --------------------------- | -------------- | ----- |
| value    | 属性值(**唯一键**),required | String\|Number |       |
| label    | 标签                        | String         |       |
| disabled | 是否禁用                    | Boolean        | false |

### UxOptionGroup

#### Props

| 参数名 | 描述           | 类型   | 默认 |
| ------ | -------------- | ------ | ---- |
| label  | 标签, required | String |      |
