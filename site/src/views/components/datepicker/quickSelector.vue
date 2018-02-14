<template>
  <ux-demo title="快捷访问">
    <template slot="demo">
      <ux-range-date-picker :ranges="ranges"
                            :theme="theme">
      </ux-range-date-picker>
      <br>
      <ux-range-date-picker :ranges="ranges"
                            :theme="theme"
                            show-today
                            show-time>
      </ux-range-date-picker>
    </template>
    <div slot="desc">
      通过
      <code>ranges</code>属性设置预设范围
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { subDays, subWeeks, subMonths, startOfMonth, endOfMonth, addMonths } from 'date-fns';
  import code from '@/code/datepicker/quickSelector';

  export default {
    data() {
      return {
        code,
        ranges: {
          今天: [new Date(), new Date()],
          昨天: [subDays(new Date(), 1), subDays(new Date(), 1)],
          最近一周: [subWeeks(new Date(), 1), new Date()],
          最近一月: [subMonths(new Date(), 1), new Date()],
          当月: [startOfMonth(new Date()), endOfMonth(new Date())],
          未来一月: [new Date(), addMonths(new Date(), 1)],
        },
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>

