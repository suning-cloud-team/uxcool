## API

### UxDatePicker

#### Props

| 参数名              | 描述                                                                 | 类型                                                                                                                                | 默认                                                           |
| ------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| locale              | 国际化配置                                                           | Object                                                                                                                              | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |
| theme               | 主题                                                                 | light\|dark                                                                                                                         | light                                                          |
| is-open             | 弹层是否展开                                                         | Boolean                                                                                                                             | false                                                          |
| value               | 当前选中值                                                           | Date                                                                                                                                |                                                                |
| disabled            | 是否禁用                                                             | Boolean                                                                                                                             |                                                                |
| format              | 展示的日期格式                                                       | String                                                                                                                              | YYYY-MM-DD                                                     |
| show-time           | 是否可选择时间                                                       | Boolean\|Object{showHour:true,showMinute:true,showSecond:true}                                                                      | false                                                          |
| show-ok             | 是否展示确定按钮                                                     | Boolean                                                                                                                             | false                                                          |
| show-today          | 是否显示今天按钮                                                     | Boolean                                                                                                                             | false                                                          |
| disabled-date       | 不可选择日期                                                         | Function(current:Date)=>Boolean                                                                                                     |                                                                |
| disabled-time       | 不可选择时间                                                         | Function()=>{<br>disabledHours:()=>Number[],<br>disabledMinutes: (hour)=>Number[],<br>disabledSeconds:(hour,minute)=>Number[] <br>} |                                                                |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                                                                                                                             | true                                                           |
| placeholder         | 输入框提示文字                                                       | String                                                                                                                              |                                                                |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                                                                                                                            |                                                                |
| ok-confirm          | 是否点击 ok 按钮时才更新值                                           | Boolean                                                                                                                             | false                                                          |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                                                                                                                              | 'bottomLeft'                                                   |

#### Events

| 事件名      | 描述                                   | 回调                                             |
| ----------- | -------------------------------------- | ------------------------------------------------ |
| open-change | 弹窗关闭和打开时触发                   | Function(visible)                                |
| change      | 用户选择时间后触发                     | Function(values:Date[], formatDateString:String) |
| ok          | 当存在确定按钮时, 用户点击确定按钮触发 | Function(values:Date[])                          |

### UxRangeDatePicker

#### Props

| 参数名              | 描述                                                                 | 类型                                                                                                                                | 默认                                                           |
| ------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| locale              | 国际化配置                                                           | Object                                                                                                                              | import locale from '@suning/uxcool/es/datepicker/locale/zh_CN' |
| theme               | 主题                                                                 | light\|dark                                                                                                                         | light                                                          |
| is-open             | 弹层是否展开                                                         | Boolean                                                                                                                             | false                                                          |
| selectedValue       | 当前选中值                                                           | Array\<Date\>                                                                                                                       |                                                                |
| disabled            | 是否禁用                                                             | Boolean                                                                                                                             |                                                                |
| format              | 展示的日期格式                                                       | String                                                                                                                              | YYYY-MM-DD                                                     |
| show-time           | 是否可选择时间                                                       | Boolean\|Boolean\|Object{showHour:true,showMinute:true,showSecond:true}                                                             | false                                                          |
| show-ok             | 是否展示确定按钮                                                     | Boolean                                                                                                                             | false                                                          |
| show-today          | 是否显示返回今天按钮                                                 | Boolean                                                                                                                             | false                                                          |
| disabled-date       | 不可选择日期                                                         | Function(current:Date)=>Boolean                                                                                                     |                                                                |
| disabled-time       | 不可选择时间                                                         | Function()=>{<br>disabledHours:()=>Number[],<br>disabledMinutes: (hour)=>Number[],<br>disabledSeconds:(hour,minute)=>Number[] <br>} |                                                                |
| allow-clear         | 是否显示清除按钮                                                     | Boolean                                                                                                                             | true                                                           |
| placeholder         | 输入框提示文字                                                       | [String ,Array ]                                                                                                                    |                                                                |
| ranges              | 预设时间范围                                                         | Object{String: (Date:[] \| ()=>Date:[])}                                                                                            |                                                                |
| get-popup-container | 自定义下拉面板包裹容器                                               | Function                                                                                                                            |                                                                |
| ok-confirm          | 是否点击 ok 按钮时才更新值                                           | Boolean                                                                                                                             | false                                                          |
| placement           | 弹出框位置,可选值:`bottomLeft`, `bottomRight`, `topRight`, `topLeft` | String                                                                                                                              | 'bottomLeft'                                                   |

#### Events

| 事件名          | 描述                                    | 回调                                                |
| --------------- | --------------------------------------- | --------------------------------------------------- |
| open-change     | 弹窗关闭和打开时触发                    | Function(visible)                                   |
| change          | 用户选择时间后触发                      | Function(values:Date[], formatDateStrings:String[]) |
| calendar-change | 时间发生变化后触发                      | Function(values:Date[])                             |
| ok              | 当存在确定按钮时 , 用户点击确定按钮触发 | Function(values:Date[])                             |
