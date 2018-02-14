<template>
  <ux-demo title="不带页脚">
    <div slot="demo">
      <button class="ux-btn"
              @click="open">Open</button>
      <ux-modal v-model="visible"
                hide-footer
                :theme="theme"
                title="Hide Footer"
                @ok="onOk($event, 'hide footer')"
                @cancel="onCancel($event, 'hide footer')">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>
    <div slot="desc">设置
      <code>hide-footer</code>属性可以隐藏页脚操作区。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/hideFooter';

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
    },
  };
</script>

