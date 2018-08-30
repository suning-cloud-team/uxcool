<template>
  <ux-demo :height="200"
           title="图片列表样式">
    <div slot="demo">
      <ux-upload action="http://dip.cnsuning.com:80/service/2698/1.0.0/upload"
                 list-type="picture">
        <ux-button icon="upload">Click to Upload</ux-button>
      </ux-upload>
    </div>
    <div slot="desc">
      上传文件为图片时,可以展示上传预览图, 如果浏览器不支持
      <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL"
         target="_blank">URL.createObjectURL()</a>,可以设置
      <code>thumbUrl</code>属性来代替
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/picture.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

