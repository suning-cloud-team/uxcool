<template>
  <div class="demo clearfix">
    <h4>picture-card</h4>
    <ux-upload v-model="fileList"
               action="/upload"
               list-type="picture-card">
      <span v-if="fileList.length<3">
        <ux-icon type="add" />Upload
      </span>
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Icon } from '@suning/uxcool';

  export default {
    components: {
      UxUpload: Upload,
      UxIcon: Icon,
    },
    data() {
      return {
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
