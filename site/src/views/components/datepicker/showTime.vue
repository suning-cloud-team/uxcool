<template>
  <ux-demo title="时间选择">
    <template slot="demo">
      <ux-date-picker show-time
                      :theme="theme"
                      placeholder="Select Time">
      </ux-date-picker>
      <br>
      <ux-range-date-picker show-time
                            :theme="theme"
                            :placeholder="['Start Time', 'End Time']">
      </ux-range-date-picker>
    </template>
    <div slot="desc">
      增加时间选择功能
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/datepicker/showTime';

  export default {
    data() {
      return { code };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>

