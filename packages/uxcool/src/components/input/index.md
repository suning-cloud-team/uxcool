## API

### UxInput

#### Props

| 参数名       | 描述                                         | 类型                  | 默认    |
| ------------ | -------------------------------------------- | --------------------- | ------- |
| affix-class  | 自定义`ux-input` class                       | String\|Object\|Array |         |
| value        | 值                                           | String                |         |
| size         | 控件大小,可选值: `large`, `default`, `small` | String                | default |
| disabled     | 是否禁用                                     | Boolean               | false   |
| addon-before | 前置标签                                     | String                |         |
| addon-after  | 后置标签                                     | String                |         |

其余属性与原生 [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) 一致

#### Slots

| 名称        | 描述                       |
| ----------- | -------------------------- |
| prefix      | 自定义 `ux-input` 图标前缀 |
| suffix      | 自定义 `ux-input` 图标后缀 |
| addonBefore | 自定义前置标签             |
| addonAfter  | 自定义后置标签             |

#### Events

| 事件名     | 描述                | 回调          |
| ---------- | ------------------- | ------------- |
| input      | 输入值变化时触发    | Function(val) |
| pressenter | 按下`enter`键时触发 | Function(e)   |
| keydown    | 按下按键是触发      | Function(e)   |

### UxTextarea

#### Props

| 参数名    | 描述           | 类型                                | 默认  |
| --------- | -------------- | ----------------------------------- | ----- |
| value     | 值             | String                              |       |
| auto-size | 自适应文本高度 | Boolean \| Object{minRows, maxRows} | false |
| disabled  | 是否禁用       | Boolean                             | false |

其余属性与原生 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)一致

#### Events

| 事件名                     | 描述                             | 回调          |
| -------------------------- | -------------------------------- | ------------- |
| input                      | 输入值变化时触发                 | Function(val) |
| pressenter                 | 按下`enter`键时触发              | Function(e)   |
| keydown                    | 按下按键时触发(包括`enter`键值)  | Function(e)   |
| on-change(DEPRECATED)      | 值改变时触发                     | Function(val) |
| on-press-enter(DEPRECATED) | 按下`enter`键时触发              | Function(e)   |
| on-key-down(DEPRECATED)    | 按下按键时触发 (包括`enter`键值) | Function(e)   |

### UxSearchInput

#### Props

| 参数名       | 描述                       | 类型            | 默认  |
| ------------ | -------------------------- | --------------- | ----- |
| enter-button | 是否有确认按钮, 可输入文字 | Boolean\|String | false |

其余属性与 `UxInput`一致

#### Events

| 事件名 | 描述                          | 回调          |
| ------ | ----------------------------- | ------------- |
| search | 点击搜索或按下`enter`键时触发 | Function(val) |

### UxInputGroup

#### Props

| 参数名  | 描述                                                            | 类型    | 默认    |
| ------- | --------------------------------------------------------------- | ------- | ------- |
| compact | 是否使用紧凑模式                                                | Boolean | false   |
| size    | `group`下的所有`Input`大小, 可选值: `small`, `default`, `large` | String  | default |
