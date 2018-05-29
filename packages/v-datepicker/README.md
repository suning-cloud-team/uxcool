# v-datepicker

---

Vue datepicker Component

## Development

```
yarn

yarn start
```

## Example

```
http://localhost:8000/example/default.html
```

## Feature

* Support IE9+, Chrome, Firefox

## Install

```
npm config set @suning:registry http://snpm.cnsuning.com

yarn add @suning/v-datepicker
```

## Usage

```
import Vue from 'vue';
import DatePicker from '@suning/v-datepicker';
```

## API

### DatePicker

#### Props

| 参数名       | 描述             | 类型                                                                                                                                  | 默认                                       |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| prefixCls    | 组件类型前缀     | string                                                                                                                                | v-calendar                                 |
| locale       | locale           | Object                                                                                                                                | import from 'v-datepicker/es/locale/en_US' |
| isOpen       | 弹层是否打开     | Boolean                                                                                                                               | false                                      |
| value        | 当前选中值       | Date                                                                                                                                  |                                            |
| theme        | 主题             | light\|dark                                                                                                                           | light                                      |
| disabled     | 禁用             | Boolean                                                                                                                               | false                                      |
| disabledDate | 不可选日期       | Function(current:Date)=>Boolean                                                                                                       |                                            |
| disabledTime | 不可选时分秒     | Function(current:Date, type)=>{disabledHours:()=>Number[],disabledMinutes:(hour)=>Number[]},disabledSeconds:(hour,minute)=>Number[] } |                                            |
| showTime     | 是否可选择时分秒 | Boolean                                                                                                                               | false                                      |
| showOk       | 是否显示确定按钮 | Boolean                                                                                                                               | false                                      |
| showToday    | 是否显示当天按钮 | Boolean                                                                                                                               | false                                      |

#### Events

| 事件名      | 描述                                    | 回调                                             |
| ----------- | --------------------------------------- | ------------------------------------------------ |
| open-change | 弹窗关闭和打开时触发                    | Function(visible)                                |
| change      | 用户选择时间后触发                      | Function(values:Date[], formatDateString:String) |
| ok          | 当存在确定按钮时 , 用户点击确定按钮触发 | Function(values:Date[])                          |

### RangeDatePicker

#### Props

| 参数名        | 描述                      | 类型                                                                                                                                  | 默认                                |
| ------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| prefixCls     | 组件类名前缀              | String                                                                                                                                | v-calendar                          |
| locale        | locale                    | Object                                                                                                                                | import from 'v-datepicker/es/en_us' |
| selectedValue | 当前选中的值 , 包含两个值 | Date[]                                                                                                                                |                                     |
| mode          | 控制面板显示状态          | Enum('date', 'month', 'year', 'decade')[]                                                                                             | ['date','date']                     |
| theme         | 主题                      | light\|dark                                                                                                                           | light                               |
| isOpen        | 弹层是否打开              | Boolean                                                                                                                               | false                               |
| format        | 日期格式                  | String                                                                                                                                |                                     |
| disabled      | 禁用                      | Boolean                                                                                                                               | false                               |
| disabledDate  | 不可选日期                | Function(current:Date)=>Boolean                                                                                                       |                                     |
| disabledTime  | 不可选时分秒              | Function(current:Date, type)=>{disabledHours:()=>number[],disabledMinutes:(hour)=>number[]},disabledSeconds:(hour,minute)=>number[] } |                                     |
| showTime      | 是否可选择时分秒          | Boolean                                                                                                                               | false                               |
| showOk        | 是否显示确定按钮          | Boolean                                                                                                                               | false                               |
| showToday     | 是否显示返回当天按钮      | Boolean                                                                                                                               | false                               |

### Events

| 事件名          | 描述                                    | 回调                                                |
| --------------- | --------------------------------------- | --------------------------------------------------- |
| open-change     | 弹窗关闭和打开时触发                    | Function(visible)                                   |
| change          | 用户选择时间后触发                      | Function(values:Date[], formatDateStrings:String[]) |
| calendar-change | 时间发生变化后触发                      | Function(values:Date[])                             |
| ok              | 当存在确定按钮时 , 用户点击确定按钮触发 | Function(values:Date[])                             |
