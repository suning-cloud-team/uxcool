<template>
  <ux-upload v-model="fileList"
             :before-ready="onBeforeReady"
             action="http://dip.cnsuning.com:80/service/2698/1.0.0/upload">
    <ux-button icon="upload">Click to Upload</ux-button>
  </ux-upload>
</template>

<script>
  import { Message } from '@suning/uxcool';

  export default {
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
