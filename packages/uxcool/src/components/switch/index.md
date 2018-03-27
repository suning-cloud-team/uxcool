## API

### UxSwitch

#### Props

| 参数名            | 描述                               | 类型    | 默认    |
| ----------------- | ---------------------------------- | ------- | ------- |
| checked           | 是否选中                           | Boolean | false   |
| checkedChildren   | 选中时内容                         | String  |         |
| uncheckedChildren | 非选中时内容                       | String  |         |
| disabled          | 是否禁用                           | Boolean | false   |
| loading           | 是否显示为加载中                   | Boolean | false   |
| size              | 设置大小,可选值: `small`,`default` | String  | default |
| autofocus         | 自动获取焦点                       | Boolean | false   |

#### Slots

| 名称              | 描述         |
| ----------------- | ------------ |
| checkedChildren   | 选中时内容   |
| uncheckedChildren | 非选中时内容 |

#### Events

| 事件名 | 描述               | 类型              |
| ------ | ------------------ | ----------------- |
| change | 切换 switch 后触发 | Function(checked) |

#### Methods

| 名称  | 描述     |
| ----- | -------- |
| focus | 获得焦点 |
| blur  | 失去焦点 |
