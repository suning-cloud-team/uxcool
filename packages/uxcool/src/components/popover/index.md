## API

### UxPopover

#### Props

| 参数名              | 描述                                                                                                                                          | 类型                    | 默认  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ----- |
| visible             | 是否显示                                                                                                                                      | Boolean                 | false |
| placement           | 显示位置,可选值:`top`,`left`,`right`,`bottom`,`topLeft`,`topRight`,`bottomLeft`,`bottomRight`,`leftTop`,`leftBottom`,`rightTop`,`rightBottom` | String                  | top   |
| trigger             | 触发行为,可选值: `hover`,`click`,`foucs`                                                                                                      | String\|Array           | hover |
| popoverClass        | 自定义 tooltip class                                                                                                                          | String\|Object\|Array   |       |
| popoverStyle        | 自定义 tooltip style                                                                                                                          | Object                  |       |
| disabled            | 是否禁用                                                                                                                                      | Boolean                 | false |
| mouseEnterDelay     | tooltip 延迟显示时间(ms)                                                                                                                      | Number                  | 100   |
| mouseLeaveDelay     | tooltip 延迟隐藏时间(ms)                                                                                                                      | Number                  | 100   |
| title               | popover 标题                                                                                                                                  | String                  |       |
| content             | popover 内容                                                                                                                                  | String                  |       |
| arrowPointAtCenter  | 箭头是否指向目标中心                                                                                                                          | Boolean                 | false |
| autoAdjustOverflow  | 被遮挡时是否自动调整位置                                                                                                                      | Boolean                 | true  |
| get-popup-container | 自定义下拉面板包裹容器                                                                                                                        | Function()=>HTMLElement |       |

#### Slots

| 名称    | 描述                |
| ------- | ------------------- |
| title   | 自定义 popover 标题 |
| content | 自定义 popover 内容 |

#### Events

| 事件名         | 描述             | 回调              |
| -------------- | ---------------- | ----------------- |
| visible-change | 显示或隐藏时回调 | Function(visible) |
