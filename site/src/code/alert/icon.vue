<template>
  <div>
    <ux-alert type="success"
              message="Success Tip"
              show-icon/>
    <ux-alert type="info"
              message="Info Tip"
              show-icon/>
    <ux-alert type="error"
              message="Error Tip"
              show-icon />
    <ux-alert type="warning"
              message="Warning Tip"
              show-icon />
    <ux-alert type="success"
              message="Success Tip"
              description="This is a success description"
              show-icon/>
    <ux-alert type="info"
              message="Info Tip"
              description="This is an info description"
              show-icon/>
    <ux-alert type="error"
              message="Error Tip"
              description="This is an error description"
              show-icon />
    <ux-alert type="warning"
              message="Warning Tip"
              description="This is a warning description"
              show-icon />
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>
