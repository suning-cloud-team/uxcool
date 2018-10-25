<template>
  <div class="demo">
    <h4>chunk</h4>
    <ux-upload :on-preview="onPreview"
               :data="buildFormData"
               :chunk="chunk"
               :before-ready="onBeforeReady"
               name="files"
               list-type="picture"
               action="/upload"
               max-chunk-size="102400"
               @success="onSuccess"
               @remove="onRemove"
               @change="onChange"
               @chunk-send="onChunkSend"
               @chunk-success="onChunkSuccess"
               @chunk-error="onChunkError">
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
        chunk: true,
      };
    },
    methods: {
      onBeforeReady(selectedFiles) {
        const [file] = selectedFiles;

        if (file.size > 700000) {
          this.chunk = false;
        } else {
          this.chunk = true;
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          });
        });
      },
      buildFormData() {
        return {
          key: 123,
        };
      },
      onSuccess(ret, file) {
        console.log('onSuccess', ret, file);
      },
      onChange(...args) {
        console.log('onChange', args);
      },
      onProgress(e) {
        console.log('onProgress', e);
      },
      onRemove(...args) {
        console.log('files', ...args);
      },
      onPreview(...args) {
        console.log('preview', ...args);
      },
      onChunkSend(...args) {
        console.log('onChunkSend', ...args);
      },
      onChunkSuccess(...args) {
        console.log('onChunkSuccess', ...args);
      },
      onChunkError(...args) {
        console.log('onChunkError', ...args);
      },
    },
  };
</script>
