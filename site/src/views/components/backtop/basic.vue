<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
      <div class="demo">
        <ux-backtop />
      </div>

      <div class="demo">
        <ux-backtop :visibility-height="200"
                    style="bottom:140px" />
      </div>
    </div>
    <div slot="desc">
      简单用法
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/backtop/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
