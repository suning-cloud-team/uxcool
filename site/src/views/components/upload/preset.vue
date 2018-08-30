<template>
  <ux-demo :height="200"
           title="已上传文件列表">
    <div slot="demo">
      <ux-upload v-model="fileList"
                 :on-preview="onPreview"
                 action="http://dip.cnsuning.com:80/service/2698/1.0.0/upload"
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
    <div slot="desc">
      通过
      <code>fileList</code>属性,自定义已上传文件列表
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/upload/preset.vue';

  export default {
    data() {
      return {
        code,
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
        if (thumbUrl || url) {
          this.isPreview = true;
          this.previewUrl = thumbUrl || url;
        }
      },
    },
  };
</script>
