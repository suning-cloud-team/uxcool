<template>
  <ux-demo title="基本用法">
    <div slot="demo">
      <button class="ux-btn"
              @click="open">Open</button>
      <ux-modal v-model="visible"
                title="Basic"
                :theme="theme"
                @ok="onOk($event, 'basic')"
                @cancel="onCancel($event, 'basic')"
                @close="onClose"
                @after-close="onAfterClose">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>
    <div slot="desc">通过设置
      <code>value</code>属性控制对话框显示/隐藏，可使用
      <code>v-model</code>双向绑定。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/basic';

  export default {
    data() {
      return {
        visible: false,
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      open() {
        this.visible = true;
      },
      onOk(e, from) {
        console.log(`${from} ok`, e);
      },
      onCancel(e, from) {
        console.log(`${from} cancel`, e);
      },
      onSuccess(e) {
        this.footerVisible = false;
        console.log('success', e);
      },
      onClose(e) {
        console.log('close', e);
      },
      onAfterClose(e) {
        console.log('afterClose', e);
      },
    },
  };
</script>

