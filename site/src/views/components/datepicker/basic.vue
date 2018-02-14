<template>
  <ux-demo title="基本">
    <template slot="demo">
      <ux-date-picker :theme="theme"></ux-date-picker>
      <br>
      <ux-range-date-picker :theme="theme"></ux-range-date-picker>
    </template>
    <div slot="desc">
      基本用法
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/datepicker/basic';

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

