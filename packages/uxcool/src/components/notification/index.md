## API

### UxNotification

#### Methods

* `UxNotification.open(config)`

* `UxNotification.success(config)`

* `UxNotification.error(config)`

* `UxNotification.info(config)`

* `UxNotification.warn(config)`

* `UxNotification.warning(config)`

以上方法,返回一个 方法 用于关闭相应 Notification, 接收一个 `Object` 作为参数, 具体属性如下:

#### Props

| 参数名                  | 描述                                                                  | 类型                                | 默认     |
| ----------------------- | --------------------------------------------------------------------- | ----------------------------------- | -------- |
| title                   | 标题(`required`)                                                      | String                              |          |
| description             | 内容(`required`)                                                      | String \| Html \| VNode             |          |
| dangerouslySetInnerHTML | 当`description`为 html 时,需设置此项为`true`                          | false                               |          |
| className               | 自定义 notice class                                                   | Array\|Object\|String               |          |
| style                   | 自定义 notice style                                                   | Object                              |          |
| placement               | 弹出位置,可选值: `topLeft`, `topRight` , `bottomLeft` , `bottomRight` | String                              | topRight |
| duration                | 显示时长,设置为 `0` 时,不自动关闭,单位 `ms`                           | Number                              | 4500     |
| icon                    | 图标                                                                  | String\|VNode\|{type:'', style: {}} |          |
| btn                     | 在 notice 内添加自定义按钮                                            | VNode                               |          |
| closable                | 是否显示关闭图标                                                      | Boolean                             | true     |
| onClose                 | notice 关闭时的回调                                                   | Function()                          |          |

#### 全局配置和销毁

还提供了全局配置和销毁方法, 调用前配置一次, 全局生效

* `UxNotification.config(options)`

* `UxNotification.destroy()`

```javascript
UxNotification.config({
  placment: 'topLeft',
  duration: 1500,
});
```

| 参数名       | 描述                                                                          | 类型     | 默认     |
| ------------ | ----------------------------------------------------------------------------- | -------- | -------- |
| top          | 距离顶部位置,当`placment`为`topLeft` ,`topRight`时,此配置有效,单位 `px`       |          |          |
| bottom       | 距离底部位置,当`placment`为`bottomLeft` ,`bottomRight`时,此配置有效,单位 `px` |          |          |
| getContainer | 配置渲染位置                                                                  | Function |          |
| placement    | 弹出位置,可选值: `topLeft`, `topRight` , `bottomLeft` , `bottomRight`         | String   | topRight |
| duration     | 显示时长,设置为`0` 时,不自动关闭,单位 `ms`                                    | Number   | 4500     |
