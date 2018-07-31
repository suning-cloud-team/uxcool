## API

### UxTree

#### Props

| 参数名                | 描述                                                 | 类型                                       | 默认  |
| --------------------- | ---------------------------------------------------- | ------------------------------------------ | ----- |
| data-source           | 数据源                                               | Array                                      |       |
| selected-keys         | 需选中节点的 `key`                                   | Array                                      |       |
| checked-keys          | 需选中节点 `checkbox`框的 `key`                      | Array                                      |       |
| expanded-keys         | 需展开节点的`key`                                    | Array                                      |       |
| disabled              | 是否禁用                                             | Boolean                                    | false |
| row-key               | 自定义唯一性标示                                     | String\|Function(originNode)               | key   |
| show-line             | 是否显示连接线                                       | Boolean                                    | false |
| selectable            | 设置节点是否可被选中                                 | Boolean                                    | true  |
| checkable             | 是否显示`Checkbox`                                   | BOolean                                    | false |
| check-strict          | 父子节点之间是否不再关联选中                         | Boolean                                    | false |
| multiple              | 是否可多选节点                                       | Boolean                                    | false |
| default-expand-all    | 是否默认展开所有节点,(**大数据量时慎用**),非响应属性 | Boolean                                    | false |
| default-expand-parent | 是否当子节点展开时,父节点也同时展开, 非响应属性      | Boolean                                    | true  |
| default-expand-parent | 是否当子节点展开时,父节点也同时展开, 非响应属性      | Boolean                                    | true  |
| lazy                  | 是否异步加载                                         | Boolean                                    | false |
| load-data             | 异步加载数据函数                                     | Function(treeNode)=>Promise                |       |
| render-content        | 自定义渲染内容                                       | Function({NOde: TreeNode})=>VNode          |       |
| filter-option         | 自定义过滤函数                                       | Function(searchInput, originNode)=>Boolean |       |

#### Slots

| 名称          | 描述           |
| ------------- | -------------- |
| renderContent | 自定义渲染内容 |

#### Events

| 事件名 | 描述                   | 回调                                                                                                 |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| check  | `checkbox`被选中时触发 | Function(checkedKeys,{checked:Boolean,checkedNodes,halfCheckedKeys, node:OriginNode, vm,e:DomEvent}) |
| expand | 节点展开时触发         | Function(expandedKeys, {expanded:Boolean, expandedNodes, node:OriginNode, vm, e:DomEvent})           |
| select | 节点选中时触发         | Function(selectedKeys, {selected: Boolean, selectedNodes, node:OriginNode, vm, e:domEvent})          |

#### Methods

| 方法名 | 描述       | 类型                  |
| ------ | ---------- | --------------------- |
| filter | 筛选树节点 | Function(searchInput) |
