## API

### UxCardAdvance

#### Props

| 参数名     | 描述                        | 类型    | 默认  |
| ---------- | --------------------------- | ------- | ----- |
| title      | 标题                        | String  |       |
| extra      | 卡片右上角内容              | String  |       |
| bordered   | 是否有边框                  | Boolean | true  |
| head-style | 自定义表头样式              | Object  |       |
| body-style | 自定义内容区样式            | Object  |       |
| hoverable  | 是否有浮动效果              | Boolean | false |
| type       | 卡片类型,可选值:`inner`或空 | String  |       |
| cover      | 卡片封面                    | String  |       |

#### Slots

| 名称    | 描述           |
| ------- | -------------- |
| title   | 标题           |
| extra   | 卡片右上角内容 |
| cover   | 卡片封面       |
| actions | 操作           |

### UxCardMeta

#### Props

| 参数名 | 描述     | 类型   | 默认 |
| ------ | -------- | ------ | ---- |
| title  | 标题内容 | String |      |
| desc   | 描述     | String |      |

#### Slots

| 名称   | 描述     |
| ------ | -------- |
| avatar | 头像     |
| title  | 标题内容 |
| desc   | 描述     |

### UxCardGrid

#### 无 Props
