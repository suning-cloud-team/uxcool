## API

### UxTabs

#### Props

| 参数名       | 描述                                        | 类型                                 | 默认    |
| ------------ | ------------------------------------------- | ------------------------------------ | ------- |
| type         | tabs 类型                                   | line\|card                           | line    |
| size         | tabs 大小                                   | default\|small\|large                | default |
| tab-position | tab 位置                                    | top \| left \| right \| bottom\| top |
| value        | 默认选中的 tab,与 tab-pane 的 name 属性对应 | String                               |         |

#### Slot

| name               | 描述             |
| ------------------ | ---------------- |
| tabBarExtraContent | tab bar 额外内容 |

#### Events

| 事件名     | 描述                                 | 回调                          |
| ---------- | ------------------------------------ | ----------------------------- |
| tab-click  | 点击 tab 时触发                      | Function(name, tab, DomEvent) |
| prev-click | 当存在滑动按钮时,prev 按钮点击时触发 | Function(DomEvent)            |
| next-click | 当存在滑动按钮时,next 按钮点击时触发 | Function(DomEvent)            |

### UxTabPane

#### Props

| 参数名   | 描述           | 类型    | 默认  |
| -------- | -------------- | ------- | ----- |
| name     | 唯一标识       | String  |       |
| tab      | tab 头显示文字 | String  |       |
| disabled | 是否禁用       | Boolean | false |

#### Slot

| name | 描述          |
| ---- | ------------- |
| tab  | 自定义 tab 头 |
