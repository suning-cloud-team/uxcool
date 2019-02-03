## API

### UxTransfer

#### Props

| 参数名             | 描述                                                                                                                                       | 类型                                    | 默认           |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | -------------- |
| row-key            | 自定义唯一性标示                                                                                                                           | String,Function(item)                   |                |
| data-source        | 数据源,需包含`key`字段,或通过`row-key`属性指定唯一标示,                                                                                    | Array<Object{key,title,label,disabled}> |                |
| target-keys        | 需在右侧显示的数据 `key` 的集合(v-model)                                                                                                   | Array                                   |                |
| selected-keys      | 默认选中项 `key` 的集合(左右两侧可一同设置)                                                                                                | Array                                   |                |
| render-item        | 自定义渲染每行数据, 可返回`Object`,可包括`title`,`label`属性,也可返回`VNode`或`String`                                                     | Function(item,direction)                |                |
| list-style         | 自定义穿梭框样式, **当`lazy`模式时,不能设置`height`,只能通过`lazy`的`remain`属性撑开高度**                                                 | Object                                  |                |
| titles             | 标题集合                                                                                                                                   | Array                                   |                |
| operations         | 自定义操作按钮文案                                                                                                                         | Array                                   |                |
| show-search        | 是否显示搜索框                                                                                                                             | Boolean                                 | false          |  |
| filter-option      | 自定义搜索框筛选函数 -empty                                                                                                                | Function(searchText, item)=>Boolean     |                |
| search-placeholder | 搜索框 placeholder                                                                                                                         | String                                  | 请输入搜索内容 |
| not-found-content  | 自定义列表为空时文案                                                                                                                       | String                                  | 无匹配结果     |
| lazy               | `lazy`模式,可设置`Object{height: 33, remain: 4}`, `height`:每行数据高度, `remain`:保留多少行(设置后可自动撑开高度),或`false`关闭`lazy`模式 | {height:33, remain:4}                   |
| order              | 右侧列表数据展示方式, 可选值: original(与左侧顺序一致), push(选中顺序), unshift(选中倒序)                                                  | String                                  | original       |
| sort               | 中间按钮排列顺序,可选值: ltr, rtl                                                                                                          | String                                  | ltr            |

#### Slots

| 名称            | 描述                                                 |
| --------------- | ---------------------------------------------------- |
| leftFooter      | 自定义 `左侧 footer` 内容(支持 `slot-scope`和`slot`) |
| rightFooter     | 自定义 `右侧 footer` 内容(支持 `slot-scope`和`slot`) |
| renderItem      | 自定义渲染每行数据(只支持 `slot-scope`)              |
| notFoundContent | 自定义列表为空时内容                                 |

#### Events

| 事件名        | 描述                 | 回调                                                                              |
| ------------- | -------------------- | --------------------------------------------------------------------------------- |
| change        | 穿梭框数据转移时触发 | Function(targetKeys, direction, moveKeys)                                         |
| select-change | 选中项改变时触发     | Function(sourceSelectedKeys, targetSelectedKeys, direction, changedKeys, checked) |
| scroll        | 列表滚动式触发       | Function(direction,DomEvent)                                                      |
| search-change | 搜索框内容改变时触发 | Function(direction, searchText)                                                   |
| search-clear  | 搜索框清除时触发     | Function(direction)                                                               |
