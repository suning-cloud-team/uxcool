<template>
  <div>
    <h3>locale</h3>
    <ux-multi-date-picker v-model="val"
                          :locale="locale" />
  </div>
</template>

<script>
  import { Datepicker } from '@cloud-sn/uxcool';
  import localeEN from '@cloud-sn/uxcool/es/datepicker/locale/en_US';

  export default {
    components: {
      UxMultiDatePicker: Datepicker.Multi,
    },
    data() {
      return {
        val: null,
        locale: localeEN.lang,
      };
    },
  };
</script>
