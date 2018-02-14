<template>
  <div>
    <ux-demo title="多选">
      <div slot="demo">
        <ux-select style="width:250px;" :theme="theme"
                   mode="multiple">
          <ux-option value="A"
                     label="A10">A10</ux-option>
          <ux-option value="B"
                     label="B10">B10</ux-option>
          <ux-option value="C"
                     label="C10">C10</ux-option>
        </ux-select>
      </div>
      <div slot="desc">从已有条目中选择多条</div>
      <ux-code slot="code">
        {{code}}
      </ux-code>
    </ux-demo>
  </div>
</template>

<script>
import code from '@/code/select/multiple';

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
