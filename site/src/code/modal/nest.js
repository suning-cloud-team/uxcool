export default `
<template>
  <div>
    <button class="ux-btn"
      @click="nestParentOpen">
    嵌套弹窗
    </button>
    <ux-modal v-model="nestParentVisible"
        title="Parent Modal"
        @ok="onOk($event, 'parent modal')"
        @cancel="onCancel($event, 'parent modal')">

      <button class="ux-btn ux-btn-error"
          @click="nestOpen">error</button>
      <ux-modal v-model="nestVisible"
            @ok="onOk($event, 'nest modal')"
            @cancel="onCancel($event, 'nest modal')">
        <span slot="title"
            style="color: red">Error Modal</span>
        <p>error Content</p>
      </ux-modal>

      <button class="ux-btn ux-btn-error"
          @click="nestOpen">error</button>
      <ux-modal v-model="nestVisible"
            @ok="onOk($event, 'nest modal')"
            @cancel="onCancel($event, 'nest modal')">
        <span slot="title"
            style="color: red">Error Modal</span>
        <p>error Content</p>
      </ux-modal>

      <button class="ux-btn ux-btn-error"
          @click="nestOpen">error</button>
      <ux-modal v-model="nestVisible"
            @ok="onOk($event, 'nest modal')"
            @cancel="onCancel($event, 'nest modal')">
        <span slot="title"
            style="color: red">Error Modal</span>
        <p>error Content</p>
      </ux-modal>
    </ux-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nestParentVisible: false,
        nestVisible: false
      };
    },
    methods: {
      nestParentOpen() {
        this.nestParentVisible = true;
      },
      nestOpen() {
        this.nestVisible = true;
      },
      onOk(e, from) {
        console.log(\`\${from} ok\`, e);
      },
      onCancel(e, from) {
        console.log(\`\${from} cancel\`, e);
      },
    },
  };
</script>
`;
