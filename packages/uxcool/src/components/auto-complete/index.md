## API

> `UxOption`, `UxOptionGroup` 属性与 `Select` 组件一致

### UxAutoComplete

#### Props

| 参数名                      | 描述                                                                                                                                       | 类型                                | 默认          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ------------- |
| data-source                 | 数据源                                                                                                                                     | Array                               |               |
| value                       | 选中值                                                                                                                                     | String\|Number\|Array               |               |
| disabled                    | 是否禁用                                                                                                                                   | Boolean                             | false         |
| allow-clear                 | 是否显示清除按钮                                                                                                                           | Boolean                             | false         |
| placeholder                 | 搜索框占位符                                                                                                                               | String                              | Please Select |
| popup-class                 | 自定义下拉面板类名                                                                                                                         | String\|Object\|Array               |               |
| popup-style                 | 自定义下拉面板样式                                                                                                                         | Object                              |               |
| dropdown-match-select-width | 下拉面板与选择器同宽                                                                                                                       | Boolean                             | true          |
| dropdown-menu-style         | 自定义下拉面板中的列表样式                                                                                                                 | Object                              |               |
| get-container               | 自定义下拉面板包裹容器                                                                                                                     | Function()=>HTMLElement             |               |
| filter-option               | 自定义过滤函数.当值为`false`时关闭内置过滤功能                                                                                             | Boolean\|Function(searchVal,option) |               |
| render-label                | 自定义`label`渲染函数                                                                                                                      | Function(option)=>VNode             |               |
| render-group-label          | 自定义`group label`渲染函数                                                                                                                | Function(option)=>VNode             |               |
| size                        | 大小,可选值: `large`,`default`,`small`                                                                                                     | String                              |
| option-label-prop           | 定义选择框显示的 Option 属性,可选值:`value`,`label`, `children`                                                                            | String                              |               |
| not-found-content           | 列表为空时显示内容                                                                                                                         | String\|Object                      |               |
| lazy                        | `lazy`模式,可设置`Object{height: 32, remain: 8}`, `height`:每行数据高度, `remain`:保留多少行(设置后可自动撑开高度),或`false`关闭`lazy`模式 | {height: 32, remain: 8}             |

#### Slots

| 名称             | 描述                                               |
| ---------------- | -------------------------------------------------- |
| renderGroupLabel | 自定义`group label`渲染函数(**仅支持 slot-scope**) |
| renderLabel      | 自定义`label`渲染 (**仅支持 slot-scope**)          |

#### Events

| 事件名               | 描述                    | 回调                        |
| -------------------- | ----------------------- | --------------------------- |
| change               | 选中值变化时触发        | Function(values, options )) |
| popup-visible-change | 下拉面板显示/隐藏时触发 | Function(visible)           |
| select               | 选中`option`时触发      | Function(value, option)     |
| search               | 搜索值变化时触发        | Function(searchValue)       |
