<template>
  <ux-demo :height="200"
           title="禁用">
    <div slot="demo">
      <ux-select v-model="value"
                 :disabled="disabled"
                 allow-clear
                 style="width:200px;"
                 show-search>
        <ux-option value="A"
                   label="A1" />
        <ux-option value="B"
                   label="B2" />
        <ux-option value="C"
                   label="C3" />
      </ux-select>
    </div>
    <div slot="desc">
      禁用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/select/disabled.vue';

  export default {
    data() {
      return {
        code,
        value: ['A'],
        disabled: false,
      };
    },
    created() {
      setTimeout(() => {
        this.disabled = true;
        setTimeout(() => {
          this.disabled = false;
        }, 3500);
      }, 1500);
    },
  };
</script>
