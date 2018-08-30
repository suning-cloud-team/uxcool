<template>
  <div class="demo">
    <h4>control</h4>
    <ux-upload ref="uploadRef"
               v-model="fileList"
               :auto-upload="false"
               :before-upload="onBeforeUpload"
               action="/upload"
               @change="onChange">
      <ux-button>Click to Upload</ux-button>
      <template slot="extra">
        <ux-button style="margin-left:5px"
                   @click="submit">start upload</ux-button>
        <div>this is tip!</div>
      </template>

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
      onBeforeUpload(_, files) {
        console.log(files);
      },
      onChange(...args) {
        console.log('onChange', ...args);
      },
      submit() {
        const { $refs: { uploadRef } } = this;

        if (uploadRef) {
          uploadRef.submit();
        }
      },
    },
  };
</script>
