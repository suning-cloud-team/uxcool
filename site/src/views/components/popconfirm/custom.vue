<template>
  <ux-demo title="条件判断"
           :height="200">
    <div slot="demo">
      <ux-popconfirm title="Are you sure delete this task?"
                     :disabled="!isTrigger"
                     @confirm="onConfirm"
                     @cancel="onCancel">
        <a @click="onDelete">Delete</a>
      </ux-popconfirm>
      <ux-switch v-model="isTrigger"
                 @change="onChange" />
    </div>
    <div slot="desc">
      判断是否需要弹出确认框
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/popconfirm/custom.vue';

  export default {
    data() {
      return {
        code,
        isTrigger: true,
      };
    },
    methods: {
      onChange(visible) {
        this.isTrigger = visible;
        console.log(visible);
      },
      onConfirm() {
        console.log('confirm');
      },
      onCancel() {
        console.log('cancel');
      },
      onDelete() {
        if (!this.isTrigger) {
          this.onConfirm();
        }
      },
    },
  };
</script>
