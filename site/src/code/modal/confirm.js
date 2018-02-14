export default `
<template>
  <div>
    <button class="ux-btn"
      @click="confirm">基本确认</button>
    <button class="ux-btn"
      @click="deleteConfirm">自定义样式</button>
  </div>
</template>

<script>
  import UxModal from '@suning/uxcool/es/modal';

  export default {
    methods: {
      confirm() {
        UxModal.confirm({
          title: '确定要删除该项吗?',
          content: '一些描述文字...',
        }).then(
          () => {
            console.log('confirm ok');
          },
          () => {
            console.log('confirm cancel');
          }
        );
      },
      deleteConfirm() {
        UxModal.confirm({
          title: 'Do you want to delete this item?',
          content: 'some descriptions...',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
        }).then(
          () => {
            console.log('delete ok');
          },
          () => {
            console.log('delete cancel');
          }
        );
      },
    },
  };
</script>
`;
