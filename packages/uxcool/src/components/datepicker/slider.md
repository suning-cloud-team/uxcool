## API

### UxSliderDatePicker

> refresh 功能需要 `@cloud-sn/uxcool >= 0.5.0-next.64`

#### Props

| 参数名               | 描述                                                                                                                        | 类型                                                                    | 默认           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| value                | 值, 值为`String`时需与 ranges 中`value`对应(v-model)                                                                        | String\|Array<Date>                                                     |                |
| disabled             | 禁用                                                                                                                        | Boolean                                                                 | false          |
| get-popup-container  | 自定义下拉面板包裹容器                                                                                                      | Function                                                                |
| show-time            | 是否可选择时间                                                                                                              | Boolean\|Boolean\|Object{showHour:true,showMinute:true,showSecond:true} | false          |
| format               | 格式化                                                                                                                      | String                                                                  |                |
| show-slider-bar      | 是否显示滑动条                                                                                                              | Boolean                                                                 | true           |
| ranges               | 快捷选择 ,字段详情见下表                                                                                                    | Array                                                                   |                |
| reverse-history      | 反转历史记录顺序                                                                                                            | Boolean                                                                 | false          |
| max-slider-date      | 滑动范围上限                                                                                                                | Date\|Function=>Date                                                    | ()=>new Date() |
| min-slider-date      | 滑动范围下限                                                                                                                | Date\|Function=>Date                                                    |                |
| compatibility        | 当滑动时超出范围时,是否以下限或上限按照时间间隔重新生成时间                                                                 | Boolean                                                                 | false          |
| date-picker-props    | `rangeDatePicker`属性,详见 `Datepicker`组件                                                                                 | Object                                                                  |                |
| date-picker-events   | `rangeDatePicker`事件,详见 `Datepicker`组件                                                                                 | Object                                                                  |                |
| locale               | 国际化                                                                                                                      | Object                                                                  |                |
| allow-clear          | 下拉框是否允许删除                                                                                                          | Boolean                                                                 | false          |
| refresh-times        | 刷新间隔选项, 当不是数组或数组为空时关闭自动刷新功能, 可选单位:`ms`,`s`,`m`,`h`,`d`,`w(周)`,`y(年)` ,纯数字字符串转化为毫秒 | Array                                                                   |                | [] |
| refresh-value        | 刷新间隔, 关闭对应值为`REFRESH_OFF`                                                                                         | String                                                                  | 'REFRESH_OFF'  |
| force-refresh        | 强制可定时刷新, 默认只刷新`isRefresh=true`, 设置此选项后, 所有选择都可刷新                                                  | Boolean                                                                 | false          |
| render-refresh-label | 自定义渲染刷新文案                                                                                                          | Function({option})=>VNode                                               |                |
| show-refresh-bar     | 是否显示手动刷新按钮                                                                                                        | Boolean                                                                 | true           |

#### Ranges 字段

| 参数名    | 描述             | 类型             | 默认  |
| --------- | ---------------- | ---------------- | ----- |
| value     | 唯一标识         | String           |       |
| label     | 显示文案 (必须)  | String           |       |
| duration  | 间隔文案(1h)     | String           |
| dates     | 值               | Function=>Date[] |       |
| isRefresh | 是否需要定时刷新 | Boolean          | false |

```javascript
{
  value: '最近 1 小时',
  label: '最近 1 小时啊',
  duration: '1h',
  dates() {
    return [subHours(new Date(), 1), new Date()];
  },
  isRefresh: true,
},
```

#### Slots

| 名称                 | 描述                                      |
| -------------------- | ----------------------------------------- |
| render-refresh-label | 自定义渲染刷新文案(**仅支持 slot-scope**) |

#### Events

| 事件名           | 描述           | 回调                                     |
| ---------------- | -------------- | ---------------------------------------- |
| change           | 当值选中时触发 | Function(values:Dates[])                 |
| interval-refresh | 定时刷新时触发 | Function(values: Dates[], delay, option) |
| manual-refresh   | 手动刷新时触发 | Function(values:Dates[])                 |
