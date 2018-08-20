<template>
  <div class="demo">
    <h4>validRange: [new Date(), new Date()]</h4>
    <ux-calendar :locale="locale"
                 :valid-range="validRange"
                 @change="onChange" />

    <h4>validRange: [subYears(new Date(), 1), setMonth(addYears(new Date(), 1), 1)]</h4>
    <ux-calendar :locale="locale"
                 :valid-range="validRange1"
                 @change="onChange" />

    <h4>validRange: [subYears(new Date(), 1), setMonth(new Date(), 2)]</h4>
    value : {{ value2 }}-{{ formatFn(value2, 'YYYY-MM-DD') }}
    <ux-calendar :locale="locale"
                 v-model="value2"
                 @change="onChange" />
  </div>
</template>
<script >
  import { subYears, addYears, setMonth, format as formatFn } from 'date-fns';
  import { Calendar } from '@suning/uxcool';
  import CN from '@suning/uxcool/es/datepicker/locale/zh_CN';

  const validRange2 = [subYears(new Date(), 1), setMonth(new Date(), 2)];
  export default {
    components: {
      UxCalendar: Calendar,
    },
    data() {
      return {
        locale: CN.lang,
        validRange: [new Date(), new Date()],
        validRange1: [subYears(new Date(), 1), setMonth(addYears(new Date(), 1), 1)],
        validRange2,
        value2: new Date(),
      };
    },
    methods: {
      formatFn,
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
