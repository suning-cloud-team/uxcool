<template>
  <div>
    <ux-popconfirm title="Are you sure delete this task?"
                   :disabled="!isTrigger"
                   @confirm="onConfirm"
                   @cancel="onCancel">
      <a @click="onDelete">Delete</a>
    </ux-popconfirm>
    <ux-switch v-model="isTrigger"
               @change="onChange" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
