<template>
  <ux-demo title="消息通知">
    <div slot="demo">
      <button class="ux-btn"
              @click="showInfo">Info</button>
      <button class="ux-btn"
              @click="showError">Error</button>
      <button class="ux-btn"
              @click="showWarning">Warning</button>
      <button class="ux-btn"
              @click="showSuccess">Success</button>
    </div>
    <div slot="desc">信息提示，只提供一个按钮用于关闭。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/message';
  import UxModal from '@suning/uxcool/es/modal';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      showInfo() {
        UxModal.info({
          title: 'This is Notification Message',
          content: (
            <div style={{ color: 'yellow' }}>
              <p>some content vnode</p>
            </div>
          ),
          theme: this.theme,
        });
      },
      showError() {
        UxModal.error({
          title: 'This is an error message',
          content: '<span style="color:red">Error Content</span>',
          dangerouslySetInnerHTML: true,
          theme: this.theme,
        }).then(
          () => {
            console.log('error ok');
          },
          () => {
            console.log('error close');
          }
        );
      },
      showWarning() {
        UxModal.warning({
          title: <span style={{ color: '#999' }}>This is an warning message</span>,
          /* global h */
          content: h(
            'span',
            {
              style: {
                color: 'skyblue',
              },
            },
            'warning message'
          ),
          theme: this.theme,
        }).then(() => {
          console.log('warning ok');
        });
      },
      showSuccess() {
        UxModal.success({
          title: 'This is an success message',
          content: <span style={{ color: 'green' }}>success message</span>,
          theme: this.theme,
        }).then(() => {
          console.log('success ok');
        });
      },
    },
  };
</script>

