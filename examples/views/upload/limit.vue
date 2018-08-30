<template>
  <div class="demo">
    <h4>limit</h4>
    <ux-upload v-model="fileList"
               :before-ready="onBeforeReady"
               action="/upload">
      <ux-button>Click to Upload</ux-button>
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Button, Message } from '@suning/uxcool';

  export default {
    components: {
      UxUpload: Upload,
      UxButton: Button,
    },
    data() {
      return {
        fileList: null,
        limit: 2,
      };
    },
    methods: {
      onBeforeReady(selectFiles, fileList) {
        const { limit } = this;
        const total = selectFiles.length + fileList.length;
        const isLimit = total <= limit;
        if (!isLimit) {
          Message.warn(`当前限制选择 ${limit} 个文件，本次选择了 ${
            selectFiles.length
          } 个文件，共选择了 ${total} 个文件`);
        }
        return isLimit;
      },
    },
  };
</script>
