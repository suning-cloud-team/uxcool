<template>
  <div class="demo">
    <h4>render</h4>
    <ux-calendar :locale="locale"
                 :month-cell-content-render="monthCellContentRender"
                 @change="onChange">
      <ul slot="dateCellContentRender"
          slot-scope="{current,value}">
        <li v-for="(item,i) in getList(current)"
            :key="i">
          <ux-badge :status="item.type"
                    :text="item.msg" />
        </li>
      </ul>
    </ux-calendar>
  </div>
</template>
<script >
  import { format } from 'date-fns';
  import { Calendar, Badge } from '@suning/uxcool';
  import CN from '@suning/uxcool/es/datepicker/locale/zh_CN';

  const dataSource = {
    '2018-8-2': [
      { type: 'default', msg: '有一个消息' },
      { type: 'warning', msg: '有一个警告' },
      { type: 'error', msg: '有一个错误' },
      { type: 'success', msg: '有一个成功消息' },
      { type: 'processing', msg: '有一个进度' },
    ],
    '2017-8-2': [
      { type: 'default', msg: '有一个消息2' },
      { type: 'warning', msg: '有一个警告2' },
      { type: 'error', msg: '有一个错误2' },
    ],
    '2018-7-22': [
      { type: 'default', msg: '有一个消息3' },
      { type: 'warning', msg: '有一个警告3' },
      { type: 'error', msg: '有一个错误3' },
    ],
    '2018-8-3': [
      { type: 'default', msg: '有一个消息4' },
      { type: 'warning', msg: '有一个警告4' },
      { type: 'error', msg: '有一个错误4' },
      { type: 'processing', msg: '有一个进度4' },
    ],
  };

  const monthDataSource = {
    '2018-8': [
      { type: 'default', msg: '有一个消息' },
      { type: 'warning', msg: '有一个警告' },
      { type: 'error', msg: '有一个错误' },
      { type: 'success', msg: '有一个成功消息' },
      { type: 'processing', msg: '有一个进度' },
    ],
    '2017-8': [
      { type: 'default', msg: '有一个消息2' },
      { type: 'warning', msg: '有一个警告2' },
      { type: 'error', msg: '有一个错误2' },
    ],
    '2018-7': [
      { type: 'default', msg: '有一个消息3' },
      { type: 'warning', msg: '有一个警告3' },
      { type: 'error', msg: '有一个错误3' },
    ],
    '2018-9': [
      { type: 'default', msg: '有一个消息4' },
      { type: 'warning', msg: '有一个警告4' },
      { type: 'error', msg: '有一个错误4' },
      { type: 'processing', msg: '有一个进度4' },
    ],
  };

  export default {
    components: {
      UxCalendar: Calendar,
      UxBadge: Badge,
    },
    data() {
      return {
        locale: CN.lang,
      };
    },
    methods: {
      getList(current) {
        const dateStr = format(current, 'YYYY-M-D');
        return dataSource[dateStr] || [];
      },
      monthCellContentRender({ current }) {
        const monthStr = format(current, 'YYYY-M');
        const list = monthDataSource[monthStr] || [];
        return (
          <ul>
            {list.map(item => (
              <li>
                <Badge status={item.type} text={item.msg} />
              </li>
            ))}
          </ul>
        );
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
