<template>
  <ux-demo title="禁用关闭">
    <div slot="demo"
         class="gutter-group">
      <button class="ux-btn"
              @click="visible = true">禁用关闭按钮</button>
      <ux-modal v-model="visible"
                title="标题"
                :theme="theme"
                :closable="false">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>

      <button class="ux-btn"
              @click="visible2 = true">禁用蒙层关闭</button>
      <ux-modal v-model="visible2"
                :theme="theme"
                :mask-closable="false"
                title="标题">
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
        <p>contents</p>
      </ux-modal>
    </div>
    <div slot="desc">默认显示关闭按钮，点击蒙层也可以关闭模态框，可以通过
      <code>closable</code>、
      <code>mask-closable</code>改变该默认行为。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/disableClose';

  export default {
    data() {
      return {
        visible: false,
        visible2: false,
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>

