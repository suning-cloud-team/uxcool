## API

日期组件包含以下子组件

- UxDatePicker
- UxRangeDatePicker
- UxMonthPicker `>= 0.5.0-next.62`
- UxRangeMonthPicker `>= 0.5.0-next.62`
- UxYearPicker `>= 0.5.0-next.63`
- UxWeekPicker `>= 0.5.0-next.69`
- UxMutliDatePicker `>= 0.5.0-next.71`

### UxDatePicker

#### Props

| 参数名                | 描述                                                                 | 类型                                                                                                                                | 默认                                                           | 版本 |
| --------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---- |
| locale                | 国际化配置                                                           | Object                                                                                                                              | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| theme                 | 主题                                                                 | light\|dark                                                                                                                         | light                                                          |      |
| is-open               | 弹层是否展开                                                         | Boolean                                                                                                                             | false                                                          |      |
| value                 | 当前选中值                                                           | Date                                                                                                                                |                                                                |      |
| disabled              | 是否禁用                                                             | Boolean                                                                                                                             |                                                                |      |
| format                | 展示的日期格式                                                       | String                                                                                                                              | YYYY-MM-DD                                                     |      |
| show-time             | 是否可选择时间                                                       | Boolean\|Object{showHour:true,showMinute:true,showSecond:true}                                                                      | false                                                          |      |
| showTime.defaultValue | 设置选择日期后的时分秒                                               | Date                                                                                                                                | new Date()                                                     |      |
| show-ok               | 是否展示确定按钮                                                     | Boolean                                                                                                                             | false                                                          |      |
| show-today            | 是否显示今天按钮                                                     | Boolean                                                                                                                             | false                                                          |      |
| disabled-date         | 不可选择日期                                                         | Function(current:Date)=>Boolean                                                                                                     |                                                                |      |
| disabled-time         | 不可选择时间                                                         | Function()=>{<br>disabledHours:()=>Number[],<br>disabledMinutes: (hour)=>Number[],<br>disabledSeconds:(hour,minute)=>Number[] <br>} |                                                                |      |
| allow-clear           | 是否显示清除按钮                                                     | Boolean                                                                                                                             | true                                                           |      |
| placeholder           | 输入框提示文字                                                       | String                                                                                                                              |                                                                |      |
| get-popup-container   | 自定义下拉面板包裹容器                                               | Function                                                                                                                            |                                                                |      |
| ok-confirm            | 是否点击 ok 按钮时才更新值                                           | Boolean                                                                                                                             | false                                                          |      |
| placement             | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                                                                                                                              | 'bottomLeft'                                                   |      |

#### Events

| 事件名      | 描述                                   | 回调                                           | 版本 |
| ----------- | -------------------------------------- | ---------------------------------------------- | ---- |
| open-change | 弹窗关闭和打开时触发                   | Function(visible)                              |      |
| change      | 用户选择时间后触发                     | Function(values:Date, formatDateString:String) |      |
| ok          | 当存在确定按钮时, 用户点击确定按钮触发 | Function(values:Date)                          |      |

### UxRangeDatePicker

#### Props

| 参数名                | 描述                                                                 | 类型                                                                                                                                | 默认                                                           | 版本 |
| --------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ---- |
| locale                | 国际化配置                                                           | Object                                                                                                                              | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| theme                 | 主题                                                                 | light\|dark                                                                                                                         | light                                                          |      |
| is-open               | 弹层是否展开                                                         | Boolean                                                                                                                             | false                                                          |      |
| selected-value        | 当前选中值                                                           | Array\<Date\>                                                                                                                       |                                                                |      |
| disabled              | 是否禁用                                                             | Boolean                                                                                                                             |                                                                |      |
| format                | 展示的日期格式                                                       | String                                                                                                                              | YYYY-MM-DD                                                     |      |
| show-time             | 是否可选择时间                                                       | Boolean\|Boolean\|Object{showHour:true,showMinute:true,showSecond:true}                                                             | false                                                          |      |
| showTime.defaultValue | 设置选择日期后的时分秒                                               | Array\<Date\>                                                                                                                       | [new Date(), new Date()]                                       |      |
| show-ok               | 是否展示确定按钮                                                     | Boolean                                                                                                                             | false                                                          |      |
| show-today            | 是否显示返回今天按钮                                                 | Boolean                                                                                                                             | false                                                          |      |
| disabled-date         | 不可选择日期                                                         | Function(current:Date)=>Boolean                                                                                                     |                                                                |      |
| disabled-time         | 不可选择时间                                                         | Function()=>{<br>disabledHours:()=>Number[],<br>disabledMinutes: (hour)=>Number[],<br>disabledSeconds:(hour,minute)=>Number[] <br>} |                                                                |      |
| allow-clear           | 是否显示清除按钮                                                     | Boolean                                                                                                                             | true                                                           |      |
| placeholder           | 输入框提示文字                                                       | [String ,Array ]                                                                                                                    |                                                                |      |
| ranges                | 预设时间范围                                                         | Object{String: (Date:[] \| ()=>Date:[])}                                                                                            |                                                                |      |
| get-popup-container   | 自定义下拉面板包裹容器                                               | Function                                                                                                                            |                                                                |      |
| ok-confirm            | 是否点击 ok 按钮时才更新值                                           | Boolean                                                                                                                             | false                                                          |      |
| placement             | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                                                                                                                              | 'bottomLeft'                                                   |      |

#### Events

| 事件名          | 描述                                    | 回调                                                | 版本 |
| --------------- | --------------------------------------- | --------------------------------------------------- | ---- |
| open-change     | 弹窗关闭和打开时触发                    | Function(visible)                                   |      |
| change          | 用户选择时间后触发                      | Function(values:Date[], formatDateStrings:String[]) |      |
| calendar-change | 时间发生变化后触发                      | Function(values:Date[])                             |      |
| ok              | 当存在确定按钮时 , 用户点击确定按钮触发 | Function(values:Date[])                             |      |

### UxMonthPicker

| 参数名              | 描述                                                                 | 类型                            | 默认                                                           | 版本 |
| ------------------- | -------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------- | ---- |
| locale              | 国际化配置                                                           | Object                          | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| value               | 选中值(v-model)                                                      | Date                            |                                                                |      |
| disabled            | 是否禁用                                                             | Boolean                         | false                                                          |      |
| format              | 格式                                                                 | String                          | 'YYYY-MM'                                                      |      |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                          | 'bottomLeft'                                                   |      |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                        |                                                                |      |
| disabled-month      | 不可选择日期                                                         | Function(current:Date)=>Boolean |                                                                |      |
| placeholder         | 输入框提示文字                                                       | String                          |                                                                |      |
| size                | 大小,可选值: `small`, `large` ,`default`                             | String                          | 'default'                                                      |      |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                         | true                                                           |      |

#### Events

| 事件名      | 描述                 | 回调                                           | 版本 |
| ----------- | -------------------- | ---------------------------------------------- | ---- |
| open-change | 弹窗关闭和打开时触发 | Function(visible)                              |      |
| change      | 用户选择时间后触发   | Function(values:Date, formatDateString:String) |      |

### UxRangeMonthPicker

#### Props

| 参数名              | 描述                                                                 | 类型                            | 默认                                                           | 版本 |
| ------------------- | -------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------- | ---- |
| locale              | 国际化配置                                                           | Object                          | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| visible             | 弹层是否展开                                                         | Boolean                         | false                                                          |      |
| disabled            | 是否禁用                                                             | Boolean                         | false                                                          |      |
| selected-value      | 选中值(v-model)                                                      | Array<Date>                     |                                                                |      |
| format              | 格式                                                                 | String                          | 'YYYY-MM'                                                      |      |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                          | 'bottomLeft'                                                   |      |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                        |                                                                |      |
| disabled-month      | 不可选择日期                                                         | Function(current:Date)=>Boolean |                                                                |      |
| placeholder         | 输入框提示文字                                                       | [String ,Array ]                |                                                                |      |
| size                | 大小,可选值: `small`, `large` ,`default`                             | String                          | 'default'                                                      |      |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                         | true                                                           |      |

#### Events

| 事件名          | 描述                 | 回调                                                | 版本 |
| --------------- | -------------------- | --------------------------------------------------- | ---- |
| open-change     | 弹窗关闭和打开时触发 | Function(visible)                                   |      |
| change          | 用户选择时间后触发   | Function(values:Date[], formatDateStrings:String[]) |      |
| calendar-change | 时间发生变化后触发   | Function(values:Date[])                             |      |

### UxYearPicker

#### Props

| 参数名              | 描述                                                                 | 类型                            | 默认                                                           | 版本 |
| ------------------- | -------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------- | ---- |
| locale              | 国际化配置                                                           | Object                          | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| value               | 选中值(v-model)                                                      | Date                            |                                                                |      |
| disabled            | 是否禁用                                                             | Boolean                         | false                                                          |      |
| format              | 格式                                                                 | String                          | 'YYYY-MM'                                                      |      |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                          | 'bottomLeft'                                                   |      |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                        |                                                                |      |
| disabled-year       | 不可选择日期                                                         | Function(current:Date)=>Boolean |                                                                |      |
| placeholder         | 输入框提示文字                                                       | String                          |                                                                |      |
| size                | 大小,可选值: `small`, `large` ,`default`                             | String                          | 'default'                                                      |      |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                         | true                                                           |      |

#### Events

| 事件名      | 描述                 | 回调                                           | 版本 |
| ----------- | -------------------- | ---------------------------------------------- | ---- |
| open-change | 弹窗关闭和打开时触发 | Function(visible)                              |      |
| change      | 用户选择时间后触发   | Function(values:Date, formatDateString:String) |      |

### UxWeekPicker

#### Props

| 参数名              | 描述                                                                 | 类型                            | 默认                                                           | 版本 |
| ------------------- | -------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------- | ---- |
| locale              | 国际化配置                                                           | Object                          | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| value               | 选中值(v-model)                                                      | Date                            |                                                                |      |
| disabled            | 是否禁用                                                             | Boolean                         | false                                                          |      |
| format              | 格式                                                                 | String                          | 'YYYY 第 WW 周'                                                |      |
| visible             | 弹层是否展开                                                         | Boolean                         | false                                                          |      |
| disabled-date       | 不可选择日期                                                         | Function(current:Date)=>Boolean |                                                                |      |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                          | 'bottomLeft'                                                   |      |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                        |                                                                |      |
| placeholder         | 输入框提示文字                                                       | String                          |                                                                |      |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                         | true                                                           |      |

#### Events

| 事件名      | 描述                 | 回调                                       | 版本 |
| ----------- | -------------------- | ------------------------------------------ | ---- |
| open-change | 弹窗关闭和打开时触发 | Function(visible)                          |      |
| change      | 用户选择时间后触发   | Function(value:Date, formatDateStr:String) |      |

### UxMultiDatePicker

#### Props

| 参数名              | 描述                                                                 | 类型                            | 默认                                                           | 版本 |
| ------------------- | -------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------- | ---- |
| locale              | 国际化配置                                                           | Object                          | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |      |
| picker-value        | 面板日期                                                             | Date                            |                                                                |      |
| value               | 选中值(v-model)                                                      | Date                            |                                                                |      |
| disabled            | 是否禁用                                                             | Boolean                         | false                                                          |      |
| format              | 格式                                                                 | String                          | 'YYYY-MM-DD'                                                   |      |
| visible             | 弹层是否展开                                                         | Boolean                         | false                                                          |      |
| disabled-date       | 不可选择日期                                                         | Function(current:Date)=>Boolean |                                                                |      |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                          | 'bottomLeft'                                                   |      |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                        |                                                                |      |
| placeholder         | 输入框提示文字                                                       | String                          |                                                                |      |
| size                | 大小,可选值: `small`, `large` ,`default`                             | String                          | 'default'                                                      |      |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                         | true                                                           |      |

#### Events

| 事件名      | 描述                 | 回调                                       | 版本 |
| ----------- | -------------------- | ------------------------------------------ | ---- |
| open-change | 弹窗关闭和打开时触发 | Function(visible)                          |      |
| change      | 用户选择时间后触发   | Function(value:Date, formatDateStr:String) |      |
