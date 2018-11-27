## API

### UxDatePicker

#### Props

| 参数名              | 描述                                                        | 类型                                                                    | 默认           |
| ------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| value               | 值, 值为`String`时需与 ranges 中`value`对应(v-model)        | String\|Array<Date>                                                     |                |
| disabled            | 禁用                                                        | Boolean                                                                 | false          |
| get-popup-container | 自定义下拉面板包裹容器                                      | Function                                                                |
| show-time           | 是否可选择时间                                              | Boolean\|Boolean\|Object{showHour:true,showMinute:true,showSecond:true} | false          |
| format              | 格式化                                                      | String                                                                  |                |
| show-slider-bar     | 是否显示滑动条                                              | Boolean                                                                 | true           |
| ranges              | 快捷选择 ,字段详情见下表                                    | Array                                                                   |                |
| reverse-history     | 反转历史记录顺序                                            | Boolean                                                                 | false          |
| max-slider-date     | 滑动范围上限                                                | Date\|Function=>Date                                                    | ()=>new Date() |
| min-slider-date     | 滑动范围下限                                                | Date\|Function=>Date                                                    |                |
| compatibility       | 当滑动时超出范围时,是否以下限或上限按照时间间隔重新生成时间 | Boolean                                                                 | false          |
| date-picker-props   | `rangeDatePicker`属性,详见 `Datepicker`组件                 | Object                                                                  |                |
| locale              | 国际化                                                      | Object                                                                  |                |

#### Ranges 字段

| 参数名   | 描述         | 类型             | 默认 |
| -------- | ------------ | ---------------- | ---- |
| value    | 唯一标识     | String           |      |
| label    | 显示文案     | String           |      |
| duration | 间隔文案(1h) | String           |
| dates    | 值           | Function=>Date[] |      |

```javascript
{
  value: '最近 1 小时',
  label: '最近 1 小时啊',
  duration: '1h',
  dates() {
    return [subHours(new Date(), 1), new Date()];
  }
},
```

#### Events

| 事件名 | 描述           | 回调                     |
| ------ | -------------- | ------------------------ |
| change | 当值选中时触发 | Function(values:Dates[]) |
