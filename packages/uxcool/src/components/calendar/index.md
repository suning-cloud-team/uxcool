## API

### UxCalendar

#### Props

| 参数名                    | 描述                                | 类型                              | 默认    |
| ------------------------- | ----------------------------------- | --------------------------------- | ------- |
| value                     | 设定值(v-model)                     | Date                              |         |
| mode                      | 模式,可选值:`month`, `year`         | String                            | 'month' |
| fullscreen                | 是否全屏模式                        | Boolean                           | true    |
| date-cell-render          | 自定义渲染日期单元格,覆盖整个单元格 | Function({current, value})=>VNode |         |
| date-cell-content-render  | 自定义渲染日期单元格内容            | Function({current,value})=>VNode  |         |
| month-cell-render         | 自定义渲染月份单元格,覆盖整个单元格 | Function({current, value})=>VNode |         |
| month-cell-content-render | 自定义渲染月份单元格内容            | Function({current, value})=>VNode |         |
| locale                    | 国际化                              | Object                            |         |
| valid-range               | 有效日期范围                        | Array<Date,Date>                  |         |
| disabled-date             | 不可选择日期                        | Function(current)=>Boolean        |         |

#### Slots

| 名称                   | 描述                                                    |
| ---------------------- | ------------------------------------------------------- |
| dateCellRender         | 自定义渲染日期单元格,覆盖整个单元格(仅支持`slot-scope`) |
| dateCellContentRender  | 自定义渲染日期单元格内容(仅支持`slot-scope`)            |
| monthCellRender        | 自定义渲染月份单元格,覆盖整个单元格(仅支持`slot-scope`) |
| monthCellContentRender | 自定义渲染月份单元格内容(仅支持`slot-scope`)            |

#### Events

| 事件名       | 描述                       | 回调                                 |
| ------------ | -------------------------- | ------------------------------------ |
| change       | 值改变时触发               | Function(value:Date)                 |
| select       | 选择时触发                 | Function(value:Date,{target:String}) |
| panel-change | 面板头部区域选择变化时触发 | Function(value:Date,mode:String)     |
