<template>
  <div class="demo">
    <h4>card</h4>
    <ux-calendar :locale="locale"
                 :fullscreen="false"
                 style="width:350px;border:1px solid #d9d9d9; border-radius: 4px"
                 @change="onChange" />
  </div>
</template>
<script >
  import { Calendar } from '@cloud-sn/uxcool';
  import CN from '@cloud-sn/uxcool/es/datepicker/locale/zh_CN';

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
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
