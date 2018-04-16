<template>
  <div>
    <ux-alert message="Success Tip"
              type="success"
              closable/>
    <ux-alert message="Close Text"
              close-text="Close Now" />

    <ux-alert type="success"
              message="Success Tip"
              description="This is a success description"
              show-icon
              closable
              @close="onClose"
              @after-close="onAfterClose" />
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      onClose() {
        console.log('on close');
      },
      onAfterClose() {
        console.log('on after close');
      },
    },
  };
</script>
