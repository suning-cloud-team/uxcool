export default `
<template>
  <div>
    <button class="ux-btn"
    @click="open">Open</button>
    <ux-modal v-model="visible"
        hide-footer
        title="Hide Footer"
        @ok="onOk($event, 'hide footer')"
        @cancel="onCancel($event, 'hide footer')">
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
        visible: false
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
      }
    },
  };
</script>
`;
