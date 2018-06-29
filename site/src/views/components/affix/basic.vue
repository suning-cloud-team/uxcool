<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-affix :offset-top="70">
        <ux-button>top</ux-button>
      </ux-affix>
    </div>
    <div slot="desc">
      基本用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/affix/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
