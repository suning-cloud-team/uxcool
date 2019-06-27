<template>
  <div>
    <ux-upload ref="uploadRef"
               v-model="files"
               :auto-upload="false"
               action="http://dip.cnsuning.com:80/service/2698/1.0.0/upload"
               @change="onChange">
      <ux-button icon="upload">选择文件</ux-button>
    </ux-upload>
    <ux-button class="mt-xs-2"
               type="primary"
               @click="upload">开始上传</ux-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: null,
      };
    },
    methods: {
      onChange(...args) {
        console.log('change', ...args);
      },
      upload() {
        const {
          $refs: { uploadRef },
        } = this;

        if (uploadRef) {
          uploadRef.submit();
        }
      },
    },
  };
</script>

