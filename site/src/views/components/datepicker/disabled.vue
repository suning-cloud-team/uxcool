<template>
  <ux-demo title="禁用">
    <template slot="demo">
      <ux-date-picker disabled
                      :theme="theme">
      </ux-date-picker>
      <br>
      <ux-range-date-picker disabled
                            :theme="theme">
      </ux-range-date-picker>
    </template>
    <div slot="desc">
      选择框不可用状态
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/datepicker/disabled';

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

