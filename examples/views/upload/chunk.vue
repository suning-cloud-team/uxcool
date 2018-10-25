<template>
  <div class="demo">
    <h4>chunk</h4>
    <ux-upload :on-preview="onPreview"
               :data="buildFormData"
               :auto-upload="false"
               name="files"
               list-type="picture"
               action="/upload"
               chunk
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
    methods: {
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
