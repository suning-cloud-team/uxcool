<template>
  <ux-demo title="基本">
    <div slot="demo">
      <ux-tooltip content="测试">
        ux-tooltip will show when mouse enter.
      </ux-tooltip>
    </div>
    <div slot="desc">
      基本使用
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/tooltip/basic';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>