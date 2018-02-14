## API

### UxMessage.method()

包括:

* `UxMessage.info`
* `UxMessage.success`
* `UxMessage.error`
* `UxMessage.warning`
* `UxMessage.warn`
  <!-- * `UxMessage.loading` -->

以上方法, 接收一个 `Object` 作为参数, 具体属性如下:

#### Props

| 参数名                  | 描述                       | 类型                     | 默认  |
| ----------------------- | -------------------------- | ------------------------ | ----- |
| content                 | 内容                       | String\|JSX\|VNode\|Html |       |
| dangerouslySetInnerHTML | content 是否作为 html 处理 | Boolean                  | false |
| duration                | 自动关闭延迟, 单位 ms      | Number                   | 1500  |
| noticeClass             | 自定义类名                 | String\|Array\|Object    |       |
| noticeStyle             | 自定义样式                 | Object                   |       |
| onClose                 | 消息关闭时的回调           | Function                 |       |

注意

> content 为 JSX 类型时, 需要编译环境支持

### 全局配置和销毁

* `UxMessage.config`
* `UxMessage.detroy`

`UxMessage.config` 接收一个`Object`作为参数, 具体属性如下

| 参数名       | 描述                     | 类型                  | 默认              |
| ------------ | ------------------------ | --------------------- | ----------------- |
| getContainer | 自定义消息渲染位置       | Function=>HTMLElement | ()=>document.body |
| top          | 消息容器距离顶部距离     | String                |                   |
| duration     | 默认自动关闭延迟,单位 ms | Number                | 1500              |
