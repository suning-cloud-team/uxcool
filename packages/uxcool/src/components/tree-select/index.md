## API

### UxTree

#### Props

| 参数名                  | 描述                                                                                                                                                                 | 类型                                       | 默认          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------------- |
| value                   | 值                                                                                                                                                                   | String\|Number\|Array                      |               |
| size                    | 大小,可选值: `large`,`small`,`default`,                                                                                                                              | String                                     |               |
| visible                 | 是否显示下拉面板                                                                                                                                                     | Boolean                                    | false         |
| multiple                | 是否支持多选,(`tree-checkable=true`时,自动设置为 `true`)                                                                                                             | Boolean                                    | false         |
| show-arrow              | 是否显示下拉箭头(**仅单选有效**)                                                                                                                                     | Boolean                                    | false         |
| show-search             | 是否显示搜索框(**仅单选有效, 多选搜索框一直显示**)                                                                                                                   | Boolean                                    | false         |
| search-placeholder      | 搜索框 placeholder(**仅单选有效**)                                                                                                                                   | String                                     |               |
| auto-clear-search-value | 当选中值时是否清楚搜索框内容                                                                                                                                         | Boolean                                    | false         |
| disabled                | 是否禁用                                                                                                                                                             | Boolean                                    | false         |
| max-tag-count           | 多选时最多显示多少个 `tag`                                                                                                                                           | Number\|String                             |               |
| max-tag-placeholder     | 隐藏`tag`时显示的按钮文案                                                                                                                                            | String\|Function(hideNodes)=>VNode         |               |
| max-tag-text-length     | `tag`最多显示文案长度                                                                                                                                                | Number\|String                             |               |
| show-checked-strategy   | `checkable`模式时,选中项显示方式,可选值: `SHOW_ALL` 显示所有选中节点,`SHOW_PARENT`显示所有最上层的父节点, 以及父节点未选中的子节点,`SHOW_CHILD`显示所有选中的子节点, | String                                     | SHOW_CHILD    |
| tree-data               | 树数据                                                                                                                                                               | Array                                      |               |
| tree-checkable          | 是否显示`checkbox`                                                                                                                                                   | Boolean                                    | false         |
| tree-check-strict       | 是否使用严格选中模式                                                                                                                                                 | Boolean                                    | false         |
| tree-default-expandAll  | 是否默认展开所有节点(大数据量时**慎用**)                                                                                                                             | Boolean                                    | false         |
| tree-expanded-keys      | 展开的节点`key`列表                                                                                                                                                  | Array                                      |               |
| lazy                    | 是否延时加载树数据                                                                                                                                                   | Boolean                                    | false         |
| load-data               | 异步加载数据                                                                                                                                                         | Function(node)=>Promise                    |               |
| render-content          | 自定义树节点内容                                                                                                                                                     | Function                                   |               |
| filter-option           | 自定义树过滤函数                                                                                                                                                     | Function(searchInput, originNode)=>Boolean |               |
| not-found-content       | 自定义过滤无节点时文案                                                                                                                                               | Not Found                                  |
| allow-clear             | 是否显示清除按钮                                                                                                                                                     | Boolean                                    | false         |
| placeholder             | 选择框`placeholder`                                                                                                                                                  | String                                     | Please select |
| popup-class             | 自定义下拉面板类名                                                                                                                                                   | String\|Object\|Array                      |               |
| popup-style             | 自定义下拉面板样式                                                                                                                                                   | Object                                     |               |
| get-popup-container     | 自定义下拉面板包裹容器                                                                                                                                               | Function()=>HTMLElement                    |               |

#### Events

| 事件名 | 描述             | 回调                  |
| ------ | ---------------- | --------------------- |
| change | 选中值变化时触发 | Function(value)       |
| search | 搜索框变化时触发 | Function(searchValue) |
