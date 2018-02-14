<template>
  <div>
    <ux-demo title="带搜索框">
      <div slot="demo">
        <ux-select style="width:200px;" :theme="theme"
                   show-search>
          <ux-option value="A">A</ux-option>
          <ux-option value="B">B</ux-option>
          <ux-option value="C">C</ux-option>
        </ux-select>
      </div>
      <div slot="desc">
        展开后可对选项进行搜索
      </div>
      <ux-code slot="code">
        {{code}}
      </ux-code>
    </ux-demo>
  </div>
</template>


<script>
import code from '@/code/select/search';

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
