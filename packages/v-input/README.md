#v-input

---

Vue Input Component( 暂时只有 textarea 组件 )

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
npm config set @cloud-sn:registry http://snpm.cnsuning.com

yarn add @cloud-sn/v-pagination
```

## Usage

```
import Vue from 'vue';
import {VTextarea} from '@cloud-sn/v-input';
```

## API

### VTextarea

#### Props

| 参数名    | 描述           | 类型                              | 默认    |
| --------- | -------------- | --------------------------------- | ------- |
| prefixCls | 类名前缀       | string                            | v-input |
| autoSize  | 自适应文本高度 | boolean\|Object{minRows, maxRows} | false   |
| disabled  | 是否禁用       | boolean                           | false   |
| value     | 传入值         | string                            |         |

以及原生 [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) 自带的属性

#### Events

| 事件名         | 描述                        | 回调              |
| -------------- | --------------------------- | ----------------- |
| input          | 触发 v-model 绑定的值更新   | Function(val)     |
| on-change      | 值改变时触发                | Function(e:Event) |
| on-press-enter | 按下 enter 按钮时触发       | Function(e:Event) |
| on-key-down    | 按下除 enter 之外的按钮触发 | Function(e:Event) |
