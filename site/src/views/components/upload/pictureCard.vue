<template>
  <ux-demo :height="200"
           title="照片墙">
    <div slot="demo">
      <ux-upload v-model="fileList"
                 action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
                 list-type="picture-card">
        <span v-if="fileList.length<3">
          <ux-icon type="add" />Upload
        </span>
      </ux-upload>
    </div>
    <div slot="desc">
      照片墙,显示预览图, 上传指定数量后,上传按钮消失
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/pictureCard.vue';

  export default {
    data() {
      return {
        code,
        fileList: [],
      };
    },
  };
</script>

<style scoped>
  .fu-add {
    font-size: 48px;
    color: #ccc;
  }
</style>
