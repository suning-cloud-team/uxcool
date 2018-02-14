# v-select

---

Vue Select component

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

yarn add @suning/v-select
```

## Usage

```
import Vue from 'vue';
import VSelect, { VOption, VOptionGroup} from '@suning/v-select';
```

## API

### VSelect

#### Props

| 参数名              | 描述                            | 类型              | 默认     |
| ------------------- | ------------------------------- | ----------------- | -------- |
| prefix-cls          | 类名前缀                        | String            | v-select |
| value               | 选中值                          | String,Array      |          |
| mode                | select 类型                     | multiple\|default | default  |
| theme               | 主题                            | light\|dark       | light    |
| disabled            | 是否禁用                        | Boolean           | false    |
| allow-clear         | 是否显示清除按钮                | Boolean           | false    |
| show-search         | mode=default 时是否可搜索       | Boolean           | false    |
| placeholder         | 占位符                          | String            |          |
| show-arrow          | mode=default 时是否显示下拉箭头 | Boolean           | true     |
| dropdown-menu-style | 自定义下拉框样式                | Array,Object      |          |

#### Events

| 事件名   | 描述                                   | 回调                    |
| -------- | -------------------------------------- | ----------------------- |
| change   | 值变化后触发                           | Function(value)         |
| select   | Option 选中后触发                      | Function(value, option) |
| deselect | mode!=default 时,Option 取消选中后触发 | Function(value, option) |

### VOption

#### Props

| 参数名   | 描述                            | 类型          | 默认  |
| -------- | ------------------------------- | ------------- | ----- |
| value    | 唯一值(required)                | String,Number |       |
| label    | 选项标签(不设置默认为 value 值) | String        |       |
| disabled | 是否禁用                        | Boolean       | false |

### VOptionGroup

#### Props

| 参数名 | 描述               | 类型   | 默认 |
| ------ | ------------------ | ------ | ---- |
| label  | 分组组名(required) | String |      |
