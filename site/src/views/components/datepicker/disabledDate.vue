<template>
  <ux-demo title="不可选择的时间和日期">
    <template slot="demo">
      <ux-date-picker :disabled-date="disabledDate"
                      :theme="theme"
                      :disabled-time="disabledTime"></ux-date-picker>
      <br>
      <ux-range-date-picker :disabled-date="disabledDate"
                            :theme="theme"
                            :disabled-time="disabledRangeTime">
      </ux-range-date-picker>
    </template>
    <div slot="desc">
      可用
      <code>disabledDate</code>禁用日期, 可用
      <code>disabledTime</code>禁用时间,
      <code>disabledTime</code>需要和
      <code>show-time</code>属性同时使用
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { isBefore, startOfDay, subDays } from 'date-fns';
  import code from '@/code/datepicker/disabledDate';

  export default {
    data() {
      return { code };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      disabledDate(current) {
        return current && isBefore(current, startOfDay(subDays(new Date(), 3)));
      },
      disabledTime() {
        return {
          disabledHours() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 5);
          },
          disabledMinutes() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 10);
          },
          disabledSeconds() {
            return [25, 56];
          },
        };
      },
      disabledRangeTime(values, type) {
        if (type === 'start') {
          return {
            disabledHours() {
              return Array(20)
                .fill(0)
                .map((v, i) => i + 1);
            },
            disabledMinutes() {
              return Array(20)
                .fill(0)
                .map((v, i) => i + 2);
            },
            disabledSeconds() {
              return [20, 21];
            },
          };
        }
        return {
          disabledHours() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 5);
          },
          disabledMinutes() {
            return Array(20)
              .fill(0)
              .map((v, i) => i + 10);
          },
          disabledSeconds() {
            return [25, 56];
          },
        };
      },
    },
  };
</script>

