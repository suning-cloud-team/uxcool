## API

> 组件使用 `Flex` 布局,不支持 `IE9`

### UxList

#### Props

| 参数名      | 描述                                                         | 类型                   | 默认     |
| ----------- | ------------------------------------------------------------ | ---------------------- | -------- |
| data-source | 数据源                                                       | Array                  |          |
| render-item | 渲染函数                                                     | Function({item,index}) |          |
| bordered    | 是否显示边框                                                 | Boolean                | false    |
| grid        | 栅格配置,详见下表                                            | Object                 |          |
| item-layout | `UxListItem`布局方式, 默认水平,设置为`vertical`时,为垂直排布 | String                 |          |
| loading     | 是否加载中,更多配置,请参考`Spin`组件                         | Boolean\|Object        | false    |
| pagination  | 分页,支持`Pagination`配置                                    | Boolean\|Object        | false    |
| size        | 大小,可选值: `small`, `default`,`large`                      | String                 | default  |
| split       | 是否展示分割线                                               | Boolean                | true     |
| header      | 头部内容                                                     | String                 |          |
| footer      | 底部内容                                                     | String                 |          |
| empty-text  | 无内容文案                                                   | String                 | 暂无数据 |

#### Events

| 事件名            | 描述           | 回调                       |
| ----------------- | -------------- | -------------------------- |
| pagination-change | 点击分页时触发 | Function(current,pageSize) |

#### Slots

| 名称       | 描述                                                            |
| ---------- | --------------------------------------------------------------- |
| header     | 自定义头部内容                                                  |
| footer     | 自定义底部内容                                                  |
| loadMore   | 自定义加载更多                                                  |
| emptyText  | 自定义无内容文案                                                |
| renderItem | 自定义渲染内容,只支持 `slot-scope`, 参数为 `Object{item,index}` |

### UxList pagination props

| 参数名   | 描述                                      | 类型   | 默认   |
| -------- | ----------------------------------------- | ------ | ------ |
| position | 分页显示位置,可选值:`top`,`bottom`,`both` | String | bottom |

更多配置,请查看 `Pagination` 组件。

### UxList grid props

| 参数名 | 描述             | 类型   | 默认 |
| ------ | ---------------- | ------ | ---- |
| gutter | 元素间隔         | Number |      |
| column | 列数             | Number |      |
| xs     | `<768px`时列数   | Number |      |
| sm     | `>=768px`时列数  | Number |      |
| md     | `>=992px`时列数  | Number |      |
| lg     | `>=1200px`时列数 | Number |      |
| xl     | `>=1600px`时列数 | Number |      |

### UxListItem

#### Props

| 参数名  | 描述     | 类型         | 默认 |
| ------- | -------- | ------------ | ---- |
| actions | 操作     | Array<VNode> |      |
| extra   | 额外内容 | String       |      |

#### Slots

| 名称    | 描述           |
| ------- | -------------- |
| actions | 自定义操作     |
| extra   | 自定义额外内容 |

### UxListItemMeta

#### Props

| 参数名 | 描述 | 类型   | 默认 |
| ------ | ---- | ------ | ---- |
| title  | 标题 | String |      |
| desc   | 描述 | String |

#### Slots

| 名称   | 描述                                           |
| ------ | ---------------------------------------------- |
| avatar | 自定义头像(`itemLayout === vertical`时不显示)) |
| title  | 自定义标题                                     |
| desc   | 自定义模式                                     |
