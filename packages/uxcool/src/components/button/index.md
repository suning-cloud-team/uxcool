## API

### UxButton

#### Props

| 参数名   | 描述                                                          | 类型                    | 默认   |
| -------- | ------------------------------------------------------------- | ----------------------- | ------ |
| type     | button 类型,可选值:`primary`,`ghost`,`dashed`,`danger`或不设  | String                  |        |
| shape    | button 形状,可选值: `circle` 或 不设                          | String                  |        |
| size     | button 大小, 可选值 :`small`, `default`,`large`               | String                  |        |
| loading  | 显示加载图标                                                  | Boolean\|{delay:Number} | false  |
| htmlType | button html 类型, `submit`, `button`, `reset`                 | String                  | button |
| icon     | 自定义 icon (默认支持 uxCool 图标库图标)                      | String                  |        |
| ghost    | 背景透明                                                      | Boolean                 | false  |
| href     | button 链接(内部使用 a 标签代替 button 标签, 支持 a 标签属性) | String                  |        |

#### Events

| 事件名 | 描述               | 类型        |
| ------ | ------------------ | ----------- |
| click  | 点击 button 时触发 | Function(e) |

### UxButtonGroup

#### Props

| 参数名 | 描述                                            | 类型   | 默认 |
| ------ | ----------------------------------------------- | ------ | ---- |
| size   | button 大小, 可选值 :`small`, `default`,`large` | String |      |
