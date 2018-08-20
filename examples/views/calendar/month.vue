<template>
  <div class="demo">
    <h4>month</h4>
    <ux-calendar @change="onChange" />
  </div>
</template>
<script >
  import { Calendar } from '@suning/uxcool';
  import CN from '@suning/uxcool/es/datepicker/locale/zh_CN';

  export default {
    components: {
      UxCalendar: Calendar,
    },
    data() {
      return {
        // locale: CN.lang,
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
