## API

### UxDropdown

#### Props

| 参数名              | 描述                                                                                         | 类型                  | 默认       |
| ------------------- | -------------------------------------------------------------------------------------------- | --------------------- | ---------- |
| visible             | 是否显示 (v-model)                                                                           | Boolean               | false      |
| disabled            | 是否禁用                                                                                     | Boolean               | false      |
| trigger             | 触发事件,可用值: `hover`, `click` ,`focus`, `none`,当值为`none`时为手动控制                  | String\|Array         | hover      |
| get-popup-container | 自定义渲染区域,默认`body`                                                                    | Function              |            |
| close-on-select     | 选择后关闭                                                                                   | Boolean               | true       |
| placement           | 弹出区域,可用值:`bottomLeft`, `bottomCenter`,`bottomRight`,`topLeft`, `topCenter`,`topRight` | String                | bottomLeft |
| overlay-class       | 自定义`overlay`class                                                                         | String\|Array\|Object |            |
| overlay-style       | 自定义`overlay` style                                                                        | Object                |

#### Slots

| 名称    | 描述           |
| ------- | -------------- |
| trigger | 自定义触发元素 |
| overlay | 自定义弹出元素 |

#### Events

| 事件名         | 描述                     | 回调              |
| -------------- | ------------------------ | ----------------- |
| visible-change | 当菜单显示状态改变时触发 | Function(visible) |
| overlay-click  | 当`overlay`被点击时触发  | Function(e)       |

### UxDropdownButton

| 参数名   | 描述                                                     | 类型    | 默认  |
| -------- | -------------------------------------------------------- | ------- | ----- |
| type     | 按钮类型,可选值: `primary` , `ghost`, `dashed`, `danger` | String  |       |
| size     | 可选值: `small`, `default`, `large`                      | String  |       |
| disabled | 是否禁用                                                 | Boolean | false |

> 同时也支持`UxDropdown`属性

#### Slots

| 名称    | 描述           |
| ------- | -------------- |
| overlay | 自定义弹出元素 |

#### Events

| 事件名         | 描述                     | 回调              |
| -------------- | ------------------------ | ----------------- |
| visible-change | 当菜单显示状态改变时触发 | Function(visible) |
| overlay-click  | 当`overlay`被点击时触发  | Function(e)       |
| click          | 当`button`被点击时触发   | Function(e)       |
