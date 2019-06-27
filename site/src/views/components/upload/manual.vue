<template>
  <ux-demo :height="200"
           title="手动上传">
    <div slot="demo">
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
    <div slot="desc">
      通过<code>auto-upload</code>属性和<code>submit()</code>实例方法实现手动上传。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/manual.vue';

  export default {
    data() {
      return {
        code,
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

