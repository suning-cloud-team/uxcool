<template>
  <ux-demo title="格式化">
    <template slot="demo">
      <ux-date-picker format="YYYY/MM/DD"
                      :theme="theme"></ux-date-picker>
      <br>
      <ux-range-date-picker format="YYYY/MM/DD"
                            :theme="theme"></ux-range-date-picker>
    </template>
    <div slot="desc">
      使用
      <code>format</code>属性,自定义日期格式
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
