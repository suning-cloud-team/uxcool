<template>
  <div class="demo">
    <h4>avatar</h4>
    <ux-upload :show-upload-list="false"
               :before-ready="onBeforeReady"
               :before-upload="onBeforeUpload"
               multiple
               class="avatar-upload"
               action="/upload"
               list-type="picture-card"
               @change="onChange"
               @progress="onProgress">
      <div v-if="!thumbUrl">
        <ux-icon :type="iconType" />
        <p>Upload</p>
      </div>
      <img v-else
           :src="thumbUrl"
           alt="avatar">
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Icon, Message } from '@cloud-sn/uxcool';

  function previewIMG(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  export default {
    components: {
      UxUpload: Upload,
      UxIcon: Icon,
    },
    data() {
      return {
        thumbUrl: '',
        loading: false,
        disabled: false,
        limit: 3,
      };
    },
    computed: {
      iconType() {
        const { loading } = this;
        return loading ? 'loading' : 'add';
      },
    },
    methods: {
      onBeforeReady(selectFiles, fileList) {
        const { limit } = this;
        const isLimit = selectFiles.length + fileList.length <= limit;
        if (!isLimit) {
          Message.warn(`最多上传${limit}张图片`);
        }

        return isLimit;
      },
      onBeforeUpload(file) {
        const { type, size } = file;
        const isJPEG = type === 'image/jpeg';
        if (!isJPEG) {
          Message.error('上传图片只支持 `JPG` 格式!');
        }
        const isLt2M = size / 1024 / 1024 <= 1;
        if (!isLt2M) {
          Message.error('上传图片大小不能超过1MB');
        }

        return isJPEG && isLt2M;
      },
      onChange({
        file: {
          error, status, originFile, response
        }
      }) {
        this.loading = status === 'uploading';
        if (status === 'success') {
          console.log('upload response', response);
          previewIMG(originFile, (url) => {
            this.thumbUrl = url;
            // 控制是否只能上传一次
            // this.disabled = true;
          });
        } else if (status === 'error') {
          console.log('upload error', error);
        }
      },
      onProgress(e) {
        console.log('onProgress', e);
      },
    },
  };
</script>

<style scoped  lang="scss">
  .demo .fu {
    font-size: 48px;
    color: #ccc;
  }
  .avatar-upload {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
