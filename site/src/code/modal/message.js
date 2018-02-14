export default `
<template>
  <div>
    <button class="ux-btn"
      @click="showInfo">Info</button>
    <button class="ux-btn"
      @click="showError">Error</button>
    <button class="ux-btn"
      @click="showWarning">Warning</button>
    <button class="ux-btn"
      @click="showSuccess">Success</button>
  </div>
</template>

<script>
  import UxModal from '@suning/uxcool/es/modal';

  export default {
    methods: {
      showInfo() {
        UxModal.info({
          title: 'This is Notification Message',
          content: (
            <div style={{ color: 'yellow' }}>
              <p>some content vnode</p>
            </div>
          ),
        });
      },
      showError() {
        UxModal.error({
          title: 'This is an error message',
          content: '<span style="color:red">Error Content</span>',
          dangerouslySetInnerHTML: true,
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
        }).then(() => {
          console.log('warning ok');
        });
      },
      showSuccess() {
        UxModal.success({
          title: 'This is an success message',
          content: <span style={{ color: 'green' }}>success message</span>,
        }).then(() => {
          console.log('success ok');
        });
      },
    },
  };
</script>
`;
