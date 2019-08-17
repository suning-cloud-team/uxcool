<template>
  <ux-demo :height="200"
           title="完全控制上传列表">
    <div slot="demo">
      <ux-upload v-model="fileList"
                 control
                 action="http://dip.cnsuning.com/service/1554195600131/1.0/upload"
                 @change="onChange">
        <ux-button icon="upload">Click to Upload</ux-button>
      </ux-upload>
    </div>
    <div slot="desc">
      通过
      <code>control</code>属性, 完全控制`fileList`列表,可以实现自定义功能: 1. 上传列表数量控制 2. 使用远程的url预览图片
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/control.vue';

  export default {
    data() {
      return {
        code,
        fileList: null,
      };
    },
    methods: {
      onChange({ fileList }) {
        // 使用远程的url预览图片
        fileList.map((file) => {
          const nFile = file;
          if (nFile.status === 'success') {
            const { response: { files: [{ url }] } } = nFile;
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
