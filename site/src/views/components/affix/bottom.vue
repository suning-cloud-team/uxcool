<template>
  <ux-demo :height="200"
           title="底部固定">
    <div slot="demo">
      <ux-affix :offset-bottom="10">
        <ux-button>bottom</ux-button>
      </ux-affix>
    </div>
    <div slot="desc">
      底部固定
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/affix/bottom.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
