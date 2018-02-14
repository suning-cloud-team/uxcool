export default `
<template>
  <div>
    <button class="ux-btn"  @click="open">Open</button>
    <ux-modal v-model="visible"
      title="Basic"
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
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      open() {
        this.visible = true;
      },
      onOk(e, from) {
        console.log(\`\${from} ok\`, e);
      },
      onCancel(e, from) {
        console.log(\`\${from} cancel\`, e);
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
`;
