<template>
  <div class="demo">
    <h4>disabled date</h4>
    <ux-calendar :locale="locale"
                 :disabled-date="disabledDate"
                 @change="onChange" />
  </div>
</template>
<script >
  import { Calendar } from '@suning/uxcool';
  import CN from '@suning/uxcool/es/datepicker/locale/zh_CN';
  import { isSameDay, setDate } from 'date-fns';

  export default {
    components: {
      UxCalendar: Calendar,
    },
    data() {
      return {
        locale: CN.lang,
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
