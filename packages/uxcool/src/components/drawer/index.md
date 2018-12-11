## API

### UxDrawer

#### Props

| 参数名           | 描述                                            | 类型                  | 默认          |
| ---------------- | ----------------------------------------------- | --------------------- | ------------- |
| visible          | 是否可见(v-model)                               | Boolean               | false         |
| placement        | 展示位置 ,可选值: `top`,`left`,`right`,`bottom` | String                | 'right'       |
| get-container    | `drawer`挂载位置                                | Function=>HTMLElement | document.body |
| show-mask        | 是否显示遮罩                                    | Boolean               | true          |
| mask-style       | 自定义遮罩样式                                  | Object                |               |
| mask-closable    | 点击遮罩是否关闭组件                            | Boolean               | true          |
| wrapper-class    | 外层容器类名                                    | String\|Object\|Array |               |
| width            | 宽度,当`placement`为`left`,`right`时有效        | String\|Number        | 256           |
| height           | 高度,,当`placement`为`top`,`bottom`时有效       | String\|Number        | 256           |
| destroy-on-close | 关闭时销毁组件内子元素                          | Boolean               | false         |
| title            | 标题                                            | String                |               |
| closable         | 是否显示右上角关闭按钮                          | Boolean               | false         |

#### Slots

| 名称  | 描述          |
| ----- | ------------- |
| title | 自定义`title` |

#### Events

| 事件名 | 描述            | 回调        |
| ------ | --------------- | ----------- |
| close  | 关闭 弹窗后触发 | Function(e) |
