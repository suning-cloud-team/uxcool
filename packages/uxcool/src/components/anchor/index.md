## API

> anchor 组件滚动时会触发路由切换，项目组对路由切换滚动行为有要求的需要注意在路由的 scrollBehavior 方法中加以区分。

### UxAnchor

#### Props

| 参数名       | 描述                    | 类型                  | 默认       |
| ------------ | ----------------------- | --------------------- | ---------- |
| offsetTop    | 距离顶部触发偏移量      | Number                | 0          |
| bounds       | 锚点区域边界 ,单位 `px` | Number                | 5          |
| getContainer | 自定义容器              | Function=>HTMLElement | ()=>window |

### UxAnchorLink

#### Props

| 参数名 | 描述     | 类型   | 默认 |
| ------ | -------- | ------ | ---- |
| title  | 链接标题 | String |      |
| href   | 锚点链接 | String | #    |

#### Slots

| 名称  | 描述       |
| ----- | ---------- |
| title | 自定义标题 |
