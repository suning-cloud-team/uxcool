<template>
  <ux-upload v-model="fileList"
             control
             action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
             @change="onChange">
    <ux-button icon="upload">Click to Upload</ux-button>
  </ux-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: null,
      };
    },
    methods: {
      onChange({ fileList }) {
        // 使用远程的url预览图片
        fileList.map(file => {
          const nFile = file;
          if (nFile.status === 'success') {
            const {
              response: {
                files: [{ url }],
              },
            } = nFile;
            nFile.url = url;
          }
          return nFile;
        });
        // 控制上传列表数量
        this.fileList = fileList.slice(0, 2);
      },
    },
  };
</script>
