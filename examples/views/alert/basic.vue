<template>
  <div>
    <div class="demo">
      <h6>normal</h6>
      <alert message="Success Tip"
             type="success" />
    </div>
    <div class="demo">
      <h6>closable</h6>
      <alert message="Success Tip"
             type="success"
             closable/>
    </div>

    <div class="demo">
      <h6>close text</h6>
      <alert message="Close Text"
             close-text="Close Now" />
    </div>

    <div class="demo"
         style="background: blue; overflow:hidden">
      <alert type="success"
             message="Success Tip"
             description="This is a success description"
             show-icon
             closable
             @close="onClose"
             @after-close="onAfterClose" />

    </div>
    <div class="demo">
      <h6>success, warning, info, error</h6>
      <alert type="success"
             message="Success Tip"
             show-icon/>
      <alert type="info"
             message="Info Tip"
             show-icon/>
      <alert type="error"
             message="Error Tip"
             show-icon />
      <alert type="warning"
             message="Warning Tip"
             show-icon />
    </div>

    <div class="demo">
      <h6>description and success, warning, info, error</h6>
      <alert type="success"
             message="Success Tip"
             description="This is a success description"
             show-icon/>
      <alert type="info"
             message="Info Tip"
             description="This is an info description"
             show-icon/>
      <alert type="error"
             message="Error Tip"
             description="This is an error description"
             show-icon />
      <alert type="warning"
             message="Warning Tip"
             description="This is a warning description"
             show-icon />
    </div>
    <div class="demo">
      <h6>banner</h6>
      <alert banner
             message="Close Text"
             close-text="Close Now" />
    </div>

    <div class="demo">
      <h6>slots</h6>
      <alert>
        <Icon slot="closeText"
              type="delete_o" />
        <span style="color:red;"
              slot="message">This is slot message</span>
        <span style="color:green;"
              slot="description">This is slot description</span>
      </alert>

    </div>

  </div>
</template>

<script>
  import { Alert, Icon } from '@suning/uxcool';

  export default {
    components: {
      Alert,
      Icon,
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

<style lang="scss" scoped>
  ::v-deep .ux-alert {
    margin-bottom: 10px;
  }
</style>
