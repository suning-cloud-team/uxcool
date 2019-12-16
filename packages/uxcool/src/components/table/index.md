## API

### UxTable

#### Props

| 参数名              | 描述                                                | 类型                                                               | 默认               |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------ | ------------------ |
| title               | 表格标题                                            | String                                                             |                    |
| hide-header         | 是否隐藏表头                                        | Boolean                                                            | false              |
| footer              | 表格尾部                                            | String                                                             |                    |
| columns             | 表格列配置                                          | Array                                                              |                    |
| value               | 表格数据                                            | Array                                                              |                    |
| empty-text          | 空数据文案                                          | String                                                             | 暂无数据           |
| scroll              | 设置横向或纵向滚动, 可指定具体值`{x:'110%', y:250}` | Object{x,y}                                                        | {x:false, y:false} |
| row-key             | 表格数据行 key 的取值,可以是字符串或函数            | Function\|String                                                   | 'key'              |
| indent-size         | 展示树形数据时,每层的缩进, 单位 `px`                | Number\|String                                                     | 15                 |
| row-class           | 设置数据行 class                                    | String\|Object\|Array\|Function(record,rowIdx)                     |                    |
| expand-row-by-click | 通过点击行来展开数据                                | Boolean                                                            | false              |
| expanded-row-render | 额外展开行渲染函数                                  | Function(record, rowIdx)                                           |                    |
| expanded-row-keys   | 控制行展开, 值为相应行的 key                        | Array                                                              |                    |
| expand-all-rows     | 展开所有行                                          | Boolean                                                            | false              |
| row-selection       | 配置列表项选择                                      | Object                                                             |                    |
| size                | 表格大小,可选值为`default`,`middle`,`small`         | String                                                             | default            |
| bordered            | 是否展示边框                                        | Boolean                                                            | false              |
| pagination          | 分页(具体配置参见 Pagination 组件)                  | Object\|Boolean                                                    | false              |
| loading             | 是否显示加载中(具体配置,参见 Spin 组件)             | Object\|Boolean                                                    |                    |
| on-row              | 设置行属性                                          | Function(columns, rowIdx)                                          |                    |
| on-header-row       | 设置头部行属性                                      | Function (record, rowIdx)                                          |                    |
| virtual-sroll       | 配置虚拟滚动以支持大数据量渲染。                    | Boolean \| Object                                                  | false              |
| draggable           | 表格是否可拖拽排序                                  | Boolean                                                            | false              |
| allowDrag           | 当前行是否可拖拽                                    | Function: (record) => Boolean                                      | null               |
| allowDrop           | 当前行是否可释放                                    | Function: (record, dragRecord, dragPosition, isExpanded) =>Boolean | null               |
| minResizeColWidth   | 单元格拖拽时的最小宽度                              | Number \| String                                                   | 50                 |

### virtual-scroll

| 参数名      | 描述                                                                                                                                               | 类型   | 默认 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| itemSize    | 每一行元素的高度。当指定非 0 数值时，即为固定高度模式，可以提高性能；否则为未知高度模式，需要指明`minItemSize`，该模式性能较差，但适合的场景更广。 | Number | 0    |
| minItemSize | 每一行元素的最小高度。未知高度模式下必须指明该项数值，用于估算渲染的条目数。                                                                       | Number | 51   |
| maxHeight   | 滚动区域最大高度。当表格指定了`scroll.y`时，以`scroll.y`为准。                                                                                     | Number | 500  |
| buffer      | 滚动区域上下缓冲区像素大小，组件会根据滚动区域和上下缓冲区大小来渲染节点。                                                                         | Number | 200  |
| prerender   | 预渲染条目数，一般用于服务端渲染。                                                                                                                 | Number | 0    |

### column

table columns 属性:

| 参数名                        | 描述                                                                                                      | 类型                                                  | 默认  |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ----- |
| fixed                         | 是否固定，可选 `true`(等效于`left`) `left`,`right`                                                        | Boolean\|String                                       | false |
| key                           | 唯一性标识(必须)                                                                                          | String                                                |       |
| title                         | header 列名。 `0.5.0-next.60` 支持函数类型                                                                | String \| Function(h) => VNode                        |       |
| dataIndex                     | 列数据索引,对应数据中的键名                                                                               | String                                                |       |
| colspan                       | 表头列合并, 值为 0 时,不渲染                                                                              | Number                                                |       |
| className                     | 自定义 header class                                                                                       | String\|Object\|Array                                 |       |
| width                         | 列宽                                                                                                      | Number                                                |       |
| align                         | 对齐方式(center\| left\|right)                                                                            | String                                                |       |
| onHeaderCell                  | 自定义 渲染 header cell 属性 ,支持自定义事件{on:{click(){}}}                                              | Function(column, rowIdx,colIdx)=>Object               |       |
| onCell                        | 自定义渲染 cell 属性 ,支持自定义属性和事件                                                                | Function(record, rowIdx, column, colIdx)=>Object      |       |
| cellRender                    | 数据 cell 内容渲染,支持自定义属性和事件 ,class 字段名请用 `className` 代替                                | Function(text, record, rowIdx,column, colIdx)=>Object |       |
| filters                       | 表头的筛选菜单项                                                                                          | Object[]                                              |       |
| onFilter                      | 非服务端筛选时,使用此函数筛选(**非服务端筛选模式时必须**); 远程加载数据时,**不支持**本地筛选              | Function(filterVal, record, column)                   |
| filterDropdown                | 自定义筛选下拉框                                                                                          | Function                                              |       |
| filterDropdownVisible         | 控制筛选下拉框是否可见                                                                                    | Boolean                                               | false |
| filtered                      | 当过滤时筛选图标是否高亮                                                                                  | Boolan                                                | true  |
| filteredValue                 | 筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组;需要与 table 的 `change` 事件配合使用 | String[]                                              |       |
| filterIcon                    | 自定义 filter 图标                                                                                        | Function                                              |       |
| filterMultiple                | 是否可多选                                                                                                | Boolean                                               | true  |
|                               |
| onFilterDropdownVisibleChange | 筛选菜单显示隐藏时回调                                                                                    | Function(visible)                                     |       |
| sorter                        | 排序函数，本地排序使用一个函数(参考 Array.sort 的 `compareFunction`)，如需服务端排序可设为 true           | Function\|Boolean                                     |       |
| sortOrder                     | 设置排序为受控属性,外部可用此属性控制列的排序,可选值:`ascend`,`descend`,`false`                           | Boolean\|String                                       |       |
| resizable                     | 是否可拖拽调整宽度                                                                                        | Boolean                                               |       |

### row-selection

table row-selections 属性:

| 参数名                | 描述                                                      | 类型                                                        | 默认     |
| --------------------- | --------------------------------------------------------- | ----------------------------------------------------------- | -------- |
| fixed                 | 选择框是否浮动在左边                                      | Boolean                                                     |          |
| getCheckboxProps      | 选择框默认属性                                            | Function=>Object                                            |          |
| selections            | 自定义下拉选择项,值为 true 时,使用默认选择项              | Object[]\| Boolean                                          | false    |
| hideDefaultSelections | 是否隐藏默认选择项                                        | Boolean                                                     | false    |
| selectedRowKeys       | 指定选中项 key 的数组, 需和`rowSlection.onChange`配合使用 | String[]                                                    |          |
| columnWidth           | 设置选择框 列宽, 设置为 0 无效                            | String\|Number                                              |          |
| type                  | 单选(radio)/多选(checkbox)                                | String                                                      | checkbox |
| onChange              | 选项发生变化时回调                                        | Function(selectedRowKeys,selectedRowsx )                    |          |
| onSelect              | 手动选中/取消某行时回调                                   | Function(record,checked, selectedRows, domEvent)            |          |
| onSelectAll           | 手动选择/取消所有行时回调                                 | Function(checked, selectedRows, changeRows,selectedRowKeys) |          |
| onSelectInvert        | 手动反选时回调                                            | Function(selectedRows, selectedRowKeys)                     |          |

### selection

row-selection 中的 selections 属性:

| 参数名   | 描述           | 类型                     | 默认 |
| -------- | -------------- | ------------------------ | ---- |
| key      | 唯一标识(必须) | String                   |      |
| text     | 选择项文字     | String                   |      |
| onSelect | 选择项点击回调 | Function(changeableKeys) |      |

### pagination

table pagination 属性:

| 参数名   | 描述                                              | 类型   | 默认   |
| -------- | ------------------------------------------------- | ------ | ------ |
| position | 指定分页位置,可选值:`top`,`bottom`, `both`,`none` | String | bottom |

更多配置,请查看[`Pagination`](/vue/index.html#/components/pagintaion)组件

### onRow, onHeaderRow, onCell, onHeaderCell 用法

`onRow`, `onHeaderRow` 在 `table` 上设置, `onCell`, `onHeaderCell` 在 `column` 中设置, 两者用法类似

```javascript
<ux-table v-bind:on-row="(record)=>{prop: '', on:{click(record){}, mouseenter(){}}}" />
```

#### Slots

| 名称   | 描述                           |
| ------ | ------------------------------ |
| title  | 表格 标题 slot,支持 slot-scope |
| empty  | 表格数据为空时 slot            |
| footer | 表格 footer slot               |
| expand | 展开行 slot,只支持 slot-scope  |

#### Events

| 事件名              | 描述                                                           | 类型                                                                                               |
| ------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| expanded-row-change | 展开/收缩行时触发                                              | Function(expandRows)                                                                               |
| expand              | 展开/收缩行时触发                                              | Function(expanded, record)                                                                         |
| change              | 分页,排序, 筛选变化时触发                                      | Function(pagination, filter, sorter)                                                               |
| dragstart           | 拖拽开始时触发                                                 | Function({ event, dragKey, dragRecord })                                                           |
| dragenter           | 拖拽进入时触发                                                 | Function({ event, isExpandRow, record, key, dragKey, dragRecord })                                 |
| dragleave           | 拖拽离开时触发                                                 | Function( event, isExpandRow, record, key, dragKey, dragRecord })                                  |
| dragend             | 拖拽结束触发                                                   | Function({ event, dragKey, dragRecord })                                                           |
| dragover            | 拖拽悬浮时触发                                                 | Function({ event, position, isExpandRow, record, key, dragKey, dragRecord })                       |
| drop                | 拖拽释放时触发，用户可以通过 getValue 方法拿到释放后的表格数据 | Function({ event, getValue, record, key, dragKey, dragRecord, position, isExpandRow, isExpanded }) |
| column-width-resize | 单元格宽度调整时触发                                           | Function(newWidth, oldWidth, column, event)                                                        |

#### metnods

| 名称           | 描述                                           |
| -------------- | ---------------------------------------------- |
| alignRowHeight | 当 fixed table 与 table 行高不一致时调用此方法 |
