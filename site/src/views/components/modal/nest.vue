<template>
  <ux-demo title="嵌套弹窗">
    <div slot="demo">
      <button class="ux-btn"
              @click="nestParentOpen">
        嵌套弹窗
      </button>
      <ux-modal v-model="nestParentVisible"
                title="Parent Modal"
                :theme="theme"
                @ok="onOk($event, 'parent modal')"
                @cancel="onCancel($event, 'parent modal')">

        <button class="ux-btn ux-btn-error"
                @click="nestOpen">error</button>
        <ux-modal v-model="nestVisible"
                  :theme="theme"
                  @ok="onOk($event, 'nest modal')"
                  @cancel="onCancel($event, 'nest modal')">
          <span slot="title"
                style="color: red">Error Modal</span>
          <p>error Content</p>
        </ux-modal>

        <button class="ux-btn ux-btn-error"
                @click="nestOpen">error</button>
        <ux-modal v-model="nestVisible"
                  :theme="theme"
                  @ok="onOk($event, 'nest modal')"
                  @cancel="onCancel($event, 'nest modal')">
          <span slot="title"
                style="color: red">Error Modal</span>
          <p>error Content</p>
        </ux-modal>

        <button class="ux-btn ux-btn-error"
                @click="nestOpen">error</button>
        <ux-modal v-model="nestVisible"
                  :theme="theme"
                  @ok="onOk($event, 'nest modal')"
                  @cancel="onCancel($event, 'nest modal')">
          <span slot="title"
                style="color: red">Error Modal</span>
          <p>error Content</p>
        </ux-modal>
      </ux-modal>
    </div>
    <div slot="desc">弹窗也可以嵌套，不过建议嵌套不超过两层。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/modal/nest';

  export default {
    data() {
      return {
        nestParentVisible: false,
        nestVisible: false,
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      nestParentOpen() {
        this.nestParentVisible = true;
      },
      nestOpen() {
        this.nestVisible = true;
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

