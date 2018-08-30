<template>
  <ux-demo :height="200"
           title="用户头像">
    <div slot="demo">
      <ux-upload :show-upload-list="false"
                 :before-ready="onBeforeReady"
                 :before-upload="onBeforeUpload"
                 class="avatar-upload"
                 action="http://dip.cnsuning.com:80/service/2698/1.0.0/upload"
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
    <div slot="desc">
      点击上传用户头像, 使用
      <code>before-upload</code>
      限制用户上传的图片格式及大小,并且限制上传数量 </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/avatar.vue';
  import { UxMessage } from '@suning/uxcool';

  function previewIMG(file, cb) {
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  }

  export default {
    data() {
      return {
        code,
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
          UxMessage.warn(`最多上传${limit}张图片`);
        }

        return isLimit;
      },
      onBeforeUpload(file) {
        const { type, size } = file;
        const isJPEG = type === 'image/jpeg';
        if (!isJPEG) {
          UxMessage.error('上传图片只支持 `JPG` 格式!');
        }
        const isLt2M = size / 1024 / 1024 <= 1;
        if (!isLt2M) {
          UxMessage.error('上传图片大小不能超过1MB');
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
