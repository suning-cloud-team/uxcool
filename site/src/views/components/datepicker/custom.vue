<template>
  <ux-demo title="自定义">
    <template slot="demo">
      <ux-date-picker v-model="start"
                      :theme="theme"
                      :disabled-date="disabledStartDate"
                      :disabled-time="disabledStartTime"
                      show-time
                      placeholder="请选择开始时间"
                      class="mr-xs-2"
                      @open-change="startOpenChange" />
      <ux-date-picker v-model="end"
                      :theme="theme"
                      :disabled-date="disabledEndDate"
                      :disabled-time="disabledEndTime"
                      :is-open="isEndOpen"
                      show-time
                      placeholder="请选择结束时间"
                      @open-change="endOpenChange" />
    </template>
    <div slot="desc">
      可以组合两个
      <code>UxDatePicker</code>来模拟
      <code>UxDateRangePicker</code>。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { isSameDay, isSameHour, isSameMinute, isSameMonth } from 'date-fns';

  import code from '@/code/datepicker/custom.vue';

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  export default {
    data() {
      return {
        code,
        start: null, // 初始化时设置为null，控件不显示时间
        end: null,
        isEndOpen: false,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      disabledStartDate(current) {
        const endDate = this.end;

        if (!current || !endDate) {
          return false;
        }

        return current.valueOf() > endDate.valueOf();
      },
      disabledStartTime() {
        const that = this;

        return {
          disabledHours() {
            const { start, end } = that;

            if (!start || !end || !isSameDay(start, end)) {
              return [];
            }
            // 同一天需要禁用结束时间后的小时
            return hours.slice(end.getHours() + 1);
          },
          disabledMinutes() {
            const { start, end } = that;

            if (!start || !end || !isSameHour(start, end)) {
              return [];
            }

            return minutes.slice(end.getMinutes() + 1);
          },
          disabledSeconds() {
            const { start, end } = that;

            if (!start || !end || !isSameMinute(start, end)) {
              return [];
            }

            return seconds.slice(end.getSeconds() + 1);
          },
        };
      },
      disabledEndDate(current) {
        const startDate = this.start;

        if (!startDate || !current) {
          return false;
        }

        return startDate.valueOf() > current.valueOf();
      },
      disabledEndTime() {
        const that = this;

        return {
          disabledHours() {
            const { start, end } = that;

            if (!start || !end || !isSameDay(start, end)) {
              return [];
            }

            // 禁用开始时间前的小时
            return hours.slice(0, start.getHours());
          },
          disabledMinutes() {
            const { start, end } = that;

            if (!start || !end || !isSameHour(start, end)) {
              return [];
            }

            return minutes.slice(0, start.getMinutes());
          },
          disabledSeconds() {
            const { start, end } = that;

            if (!start || !end || !isSameMinute(start, end)) {
              return [];
            }

            return seconds.slice(0, start.getSeconds());
          },
        };
      },
      startOpenChange(visible) {
        // 打开弹窗时默认选中当前日期
        if (!this.start) {
          this.start = new Date();
        }
        // 关闭开始弹窗时打开结束弹窗
        if (!visible) {
          this.isEndOpen = true;
        }
      },
      endOpenChange() {
        // 打开弹窗时默认选中当前日期
        if (!this.end) {
          this.end = new Date();
        }
      },
    },
  };
</script>

