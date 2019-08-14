<template>
  <ux-demo :height="200"
           title="基本使用">
    <div slot="demo">
      <ux-upload name="abc"
                 action="http://dip.cnsuning.com/service/1554195600131/1.0/upload">
        <ux-button icon="upload">Click to Upload</ux-button>
        <span style="margin-left:8px"
              @click.stop>this is upload tip</span>
      </ux-upload>
    </div>
    <div slot="desc">
      基本使用
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

