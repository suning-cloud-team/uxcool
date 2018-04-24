<template>
  <div>
    <ux-demo title="基本使用">
      <div slot="demo"
           class="gutter-group">
        <ux-select style="width:200px;"
                   :theme="theme">
          <ux-option value="A">A</ux-option>
          <ux-option value="B">B</ux-option>
          <ux-option value="C">C</ux-option>
        </ux-select>
        <ux-select style="width:200px;"
                   :theme="theme"
                   disabled>
          <ux-option value="A">A</ux-option>
          <ux-option value="B">B</ux-option>
          <ux-option value="C">C</ux-option>
        </ux-select>
      </div>
      <div slot="desc">基本使用</div>
      <ux-code slot="code">
        {{code}}
      </ux-code>
    </ux-demo>
  </div>

</template>


<script>
  import code from '@/code/select/basic';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
