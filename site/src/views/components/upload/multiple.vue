<template>
  <ux-demo :height="200"
           title="多选">
    <div slot="demo">
      <ux-upload action="http://dip.cnsuning.com:80/service/2698/1.0.0/upload"
                 list-type="picture"
                 multiple>
        <ux-button icon="upload">Click to Upload</ux-button>
      </ux-upload>
    </div>
    <div slot="desc">
      <code>Ctrl+左键</code>一次选择多个文件上传
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/multiple.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
