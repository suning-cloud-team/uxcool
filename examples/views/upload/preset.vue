<template>
  <div class="demo">
    <h4>preset</h4>
    <ux-upload v-model="fileList"
               :on-preview="onPreview"
               action="/upload"
               list-type="picture"
               @change="onChange">
      <ux-button>Click to Upload</ux-button>
    </ux-upload>
    <ux-modal v-model="isPreview"
              hide-footer>
      <img :src="previewUrl"
           style="max-width:100%"
           alt="preview">
    </ux-modal>
  </div>
</template>

<script>
  import { Upload, Button, Modal } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxUpload: Upload,
      UxButton: Button,
      UxModal: Modal,
    },
    data() {
      return {
        fileList: [
          {
            name: 'xxx.png',
            status: 'success',
            // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            name: 'yyy.png',
            status: 'success',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            name: 'ccc.png',
            status: 'error',
            response: '上传错误',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ],
        isPreview: false,
        previewUrl: null,
      };
    },
    methods: {
      onChange(...args) {
        console.log('onChange', ...args);
      },
      onPreview(file) {
        const { thumbUrl, url } = file;
        this.isPreview = true;
        this.previewUrl = thumbUrl || url;
      },
    },
  };
</script>
