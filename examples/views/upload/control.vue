<template>
  <div class="demo">
    <h4>control</h4>
    <ux-upload v-model="fileList"
               control
               action="/upload"
               @change="onChange">
      <ux-button>Click to Upload</ux-button>
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Button } from '@suning/uxcool';

  export default {
    components: {
      UxUpload: Upload,
      UxButton: Button,
    },
    data() {
      return {
        fileList: null,
      };
    },
    methods: {
      onChange({ fileList }) {
        fileList.map((file) => {
          const nFile = file;
          if (nFile.status === 'success') {
            const { response: { files: [{ url }] } } = nFile;
            nFile.url = url;
          }
          return nFile;
        });
        this.fileList = fileList.slice(0, 2);
      },
    },
  };
</script>
