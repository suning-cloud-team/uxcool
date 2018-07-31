## API

### UxCollapse

#### Props

| 参数名      | 描述                                                              | 类型                  | 默认  |
| ----------- | ----------------------------------------------------------------- | --------------------- | ----- |
| active-keys | 激活面板的 key, 与 Panel 的`name`字段对应, 区分`Number`和`String` | String\|Number\|Array |       |
| accordion   | 手风琴模式                                                        | Boolean               | false |
| border      | 是否右边框                                                        | Boolean               | true  |

#### Events

| 事件名 | 描述                                                                            | 回调                        |
| ------ | ------------------------------------------------------------------------------- | --------------------------- |
| change | 切换选中时触发,当`accordion = true`时,参数值为`String`类型, 其余为情况为`Array` | Function(val:String\|Array) |

### UxCollapsePanel

#### Props

| 参数名       | 描述                              | 类型                  | 默认    |
| ------------ | --------------------------------- | --------------------- | ------- |
| name         | 唯一性标识,区分`String`\|`Number` | String\|Number        |         |
| header       | 面板头部内容                      | String                |         |
| header-class | 自定义头部样式                    | String\|Object\|Array |         |
| show-arrow   | 是否显示箭头                      | Boolean               | true ｜ |
| disabled     | 是否禁用                          | Boolean               | false   |

#### Slots

| 名称   | 描述               |
| ------ | ------------------ |
| header | 自定义面板头部内容 |
