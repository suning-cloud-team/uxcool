# v-pagination

---

Vue Pagination Component

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

- Support IE9+, Chrome, Firefox

## Install

```

npm config set @suning:registry http://snpm.cnsuning.com

yarn add @suning/v-pagination

```

## Usage

```

import Vue from 'vue';
import Pagination from '@suning/v-pagination';

```

## API

### Props

|参数名                   |描述                      |类型               |默认              |
|------------------------|--------------------------|-------------------|---------------------|
|total                   |总数                       |number              |0                   |
|current                 |当前页                     |number              |1                   |
|pageSize                |每页条数                   |number             |10                  |
|size                    |当为[small]时, 小尺寸分页   |string             |''                  |
|simple                  |是否显示为简单分页          |boolean            |false               |
|showQuickJumper         |是否显示快速跳转            |boolean            |false               |
|showQuickJumperConfirmBtn|是否显示快速跳转确定按钮    |boolean            |true                |
|showBeforeTotal          |分页条之前显示自定义内容    |Function(total, pageSize, totalPage, pageNo, range) total: 总数; pageSize: 每页条数;totalPage:总页数; pageNo: 当前页;range:当前页数据范围|noop                |
|showAfterTotal           |分页条之后显示自定义内容    |同上               |noop                |
|itemRender               |自定义页码Dom结构          |(pageNo,type:'page'\|'next'\|'prev')=>String|- |


### Events
|事件名                   |描述                       |类型                |返回值              |
|------------------------|---------------------------|--------------------|--------------------|
|change                  |页面变化时的回调             |Function(pageNo, pageSize)|noop          |
 
   
       

