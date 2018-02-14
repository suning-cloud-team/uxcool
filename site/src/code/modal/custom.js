export default `
<template>
  <div>
    <button class="ux-btn"
      @click="headerOpen">自定义标题</button>
    <ux-modal v-model="headerVisible"
        @ok="onOk($event, 'custom header')"
        @cancel="onCancel($event, 'custom header')">
      <div slot="title">
        <ux-icon type="Information_o"></ux-icon> 自定义标题
      </div>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
    </ux-modal>

    <button class="ux-btn"
      @click="footerOpen">自定义页脚</button>
    <ux-modal v-model="footerVisible"
        title="Custom Footer"
        @ok="onOk($event, 'custom footer')"
        @cancel="onCancel($event, 'custom footer')">
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <div slot="footer">
        <button class="ux-btn ux-btn-success"
              @click="onSuccess">success</button>
      </div>
    </ux-modal>

    <button class="ux-btn"
      @click="customBtnOpen">自定义按钮文字</button>
    <ux-modal v-model="customBtnVisible"
      title="Custom Btn Text"
      @ok="onOk($event, 'custom btn text')"
      @cancel="onCancel($event, 'custom btn text')"
      ok-text="ok"
      cancel-text="cancel">
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
      <p>contents</p>
    </ux-modal>
  </div>
</template>

<script>
  import code from '@/code/modal/custom';

  export default {
    data() {
      return {
        headerVisible: false,
        footerVisible: false,
        customBtnVisible: false,
        code,
      };
    },
    methods: {
      headerOpen() {
        this.headerVisible = true;
      },
      footerOpen() {
        this.footerVisible = true;
      },
      customBtnOpen() {
        this.customBtnVisible = true;
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
