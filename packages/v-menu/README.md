# v-menu

---

Vue Menu component

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

yarn add @suning/v-menu
```

## Usage

```
import Vue from 'vue';
import VMenu, { VMenuItem, VMenuItemGroup, VSubMenu } from '@suning/v-menu';
```

## API

### VMenu

#### Props

| 参数名       | 描述                               | 类型                 | 默认   |
| ------------ | ---------------------------------- | -------------------- | ------ |
| theme        | 主题                               | string               | light  |
| mode         | 菜单类型 , 支持水平 , 内嵌两种模式 | horizontal \| inline | inline |
| inlineIndent | inline 模式时菜单缩进宽度          | 24                   |
| selectedKeys | 选中的菜单项                       | string[]             |        |
| openKeys     | 展开的 vSubMenu 项 ,name 属性关联  | string[]             |        |
| visible      | 是否展示                           | boolean              | true   |
| className    | 类名                               | string               | ''     |
| styles       | 样式                               | string               | ''     |
| uniqueOpened | 是否同时只展开一个菜单             | boolean              | true   |

#### Events

| 参数名      | 描述                      | 类型                                      | 默认 |
| ----------- | ------------------------- | ----------------------------------------- | ---- |
| click       | 点击 vMenuItem 触发       | Function({name,item, eventPath,domevent}) |      |
| open-change | vSubMenu 展开或关闭时触发 | Function(openKeys:string[])               |      |
| deselect    | vMenuItem 取消选中时触发  | Function(selectedKeys:string[])           |      |
| select      | vMenuItem 选中时触发      | Functioin(selectedKeys:string[])          |

### vMenuItem

#### Props

| 参数名    | 描述     | 类型    | 默认  |
| --------- | -------- | ------- | ----- |
| name      | 唯一标识 | string  | ''    |
| disabled  | 是否禁用 | boolean | false |
| styles    | 样式     | string  | ''    |
| className | 类名     | string  | ''    |

#### Events

无

### vSubMenu

#### Props

| 参数名    | 描述     | 类型    | 默认  |
| --------- | -------- | ------- | ----- |
| name      | 唯一标识 | string  | ''    |
| disabled  | 是否禁用 | boolean | false |
| styles    | 样式     | string  | ''    |
| className | 类名     | string  | ''    |

#### Events

| 参数名 | 描述                 | 类型                       | 默认 |
| ------ | -------------------- | -------------------------- | ---- |
| click  | 点击 vSubMenu 时触发 | Function({name, domevent}) |      |

### vMenuItemGroup

#### Props

| 参数名    | 描述     | 类型   | 默认 |
| --------- | -------- | ------ | ---- |
| title     | 分组标题 | string | ''   |
| styles    | 样式     | string | ''   |
| className | 类名     | string | ''   |

#### Events

无
