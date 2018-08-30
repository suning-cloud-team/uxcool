<template>
  <ux-demo :height="200"
           title="日期禁用">
    <div slot="demo">
      <ux-calendar :disabled-date="disabledDate"
                   @change="onChange" />
    </div>
    <div slot="desc">
      通过
      <code>disable-date</code>属性, 禁用某些日期
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import { isSameDay, setDate } from 'date-fns';
  import code from '@/code/calendar/disabledDate.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      disabledDate(current) {
        return isSameDay(current, setDate(new Date(), 4));
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
