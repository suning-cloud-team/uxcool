<template>
  <ux-demo title="确认框">
    <div slot="demo"
         class="gutter-group">
      <button class="ux-btn"
              @click="confirm">基本确认</button>
      <button class="ux-btn"
              @click="deleteConfirm">自定义样式</button>
    </div>
    <div slot="desc">模态框也提供静态方法用于轻量级对话框。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/confirm';
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
      confirm() {
        UxModal.confirm({
          title: '确定要删除该项吗?',
          content: '一些描述文字...',
          theme: this.theme,
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
          theme: this.theme,
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

