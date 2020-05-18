<template>
  <div class="demo">
    <h4>event</h4>
    <ux-calendar :locale="locale"
                 @select="onSelect"
                 @panel-change="onPanelChange"
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
      onSelect(...args) {
        console.log('onSelect', ...args);
      },
      onPanelChange(...args) {
        console.log('onPanelChange', ...args);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
    },
  };
</script>
