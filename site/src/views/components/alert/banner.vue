<template>
  <ux-demo title="顶部公告"
           :height="200">
    <div slot="demo">
      <ux-alert banner
                message="Close Text"
                closable />
    </div>
    <div slot="desc">
      顶部通告,默认图标为
      <code>warning</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/banner.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
