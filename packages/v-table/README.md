# v-table

---

Vue table Component

## Devlopment

```
yarn

yarn start
```

## Example

```
http://localhost:8000/example/default.html
```

## Feature

- Support IE9+, Chrome, Firefox

```
npm config set @suning:registry http://snpm.cnsuning.com

yarn add @suning/v-pagination
```

## Usage

```
import Vue from 'vue';
import Pagination from '@suning/v-table';
```

## API

### Props

| 参数名                | 描述                                                                    | 类型                                                               | 默认                      |
| --------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------- |
| prefix-cls            | 类名前缀                                                                | String                                                             | v-table                   |
| value                 | 值                                                                      | Array                                                              |                           |
| use-fixed-header      | 是否固定头部                                                            | Boolean                                                            | false                     |
| columns               | header 列名                                                             | Array                                                              |                           |
| on-row                | 自定义数据行每行属性                                                    | Function(record,rowIdx)=>{}                                        |                           |
| on-header-row         | 自定义 header 每行属性                                                  | Function(record, rowIdx)                                           |
| hide-header           | 是否隐藏 header                                                         | Boolean                                                            | false                     |
| title                 | 表格标题                                                                | String                                                             |                           |
| footer                | 表格 footer                                                             | String                                                             |                           |
| empty-text            | 数据为空时提示文案                                                      | String                                                             | '暂无数据'                |
| scroll                | 设置表格左右滚动, x:true 或 number, y:number                            | Object                                                             | scroll:{x:false, y:false} |
| row-key               | 设置主键字段                                                            | Function\|String                                                   | key                       |
| indent-size           | 树形表格时每级的缩进距离                                                | Number\|String                                                     | 15                        |
| child-col-name        | 树形表格时子集键名                                                      | String                                                             | children                  |
| expand-icon-as-cell   | expandIcon 是否单独渲染 cell                                            | Boolean                                                            | false                     |
| expand-row-by-click   | 是否点击行展开                                                          | Boolean                                                            | false                     |
| expand-icon-col-index | 树形表格展示 expandIcon 的列序号                                        | Number\|String                                                     | 0                         |
| expanded-row-render   | 渲染展开行内容                                                          | Function(record, rowIdx, indent)=>VNode                            |                           |  |
| expanded-row-keys     | 展开行的 keys, 与每行数据中的通过 row-key 字段设置的键名对应,默认为 key | Array                                                              |                           |
| expand-all-rows       | 是否展开所有行                                                          | Boolean                                                            | false                     |
| draggable             | 表格是否可拖拽                                                          | Boolean                                                            | false                     |
| allowDrag             | 当前行是否可拖拽                                                        | Function: (record) => Boolean                                      | null                      |
| allowDrop             | 当前行是否可释放                                                        | Function: (record, dragRecord, dragPosition, isExpanded) =>Boolean | null                      |
| minResizeColWidth     | 单元格拖拽时的最小宽度                                                  | Number \| String                                                   | 50                        |

## Column API

| 参数名       | 描述                                                                     | 类型                                                  | 默认 |
| ------------ | ------------------------------------------------------------------------ | ----------------------------------------------------- | ---- |
| title        | header 列名                                                              | String                                                |      |
| className    | 自定义 header class                                                      | String\|Object\|Array                                 |      |
| width        | 列宽                                                                     | Number                                                |      |
| align        | 对齐方式(center\| left\|right)                                           | String                                                |      |
| dataIndex    | 列数据索引,对应数据中的键名                                              | String                                                |      |
| onHeaderCell | 自定义 渲染 header cell 属性 ,支持自定义事件{on:{click(){}}}             | Function(column, rowIdx,colIdx)=>Object               |      |
| onCell       | 自定义渲染 cell 属性 ,支持自定义属性和事件                               | Function(record, rowIdx, column, colIdx)=>Object      |      |
| cellRender   | 数据 cell 内容渲染,支持自定义属性和事件 ,class 字段名请用 className 代替 | Function(text, record, rowIdx,column, colIdx)=>Object |      |
| resizable    | 是否可拖拽调整宽度                                                       | Boolean                                               |      |

## Slots

| 名称   | 描述                           |
| ------ | ------------------------------ |
| title  | 表格 标题 slot,支持 slot-scope |
| empty  | 表格数据为空时 slot            |
| footer | footer slot                    |
| expand | 展开行 slot,只支持 slot-scope  |

## Events

| 事件名              | 描述                 | 类型                                                                                               |
| ------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| expanded-row-change | 展开/收缩行时触发    | Function(expandRows)                                                                               |
| expand              | 展开/收缩行时触发    | Function(expanded, record)                                                                         |
| dragstart           | 拖拽开始时触发       | Function({ event, dragKey, dragRecord })                                                           |
| dragenter           | 拖拽进入时触发       | Function({ event, isExpandRow, record, key, dragKey, dragRecord })                                 |
| dragleave           | 拖拽离开时触发       | Function( event, isExpandRow, record, key, dragKey, dragRecord })                                  |
| dragend             | 拖拽结束触发         | Function({ event, dragKey, dragRecord })                                                           |
| dragover            | 拖拽悬浮时触发       | Function({ event, position, isExpandRow, record, key, dragKey, dragRecord })                       |
| drop                | 拖拽释放时触发       | Function({ event, getValue, record, key, dragKey, dragRecord, position, isExpandRow, isExpanded }) |
| column-width-resize | 单元格宽度调整时触发 | Function(newWidth, oldWidth, column, event)                                                        |
