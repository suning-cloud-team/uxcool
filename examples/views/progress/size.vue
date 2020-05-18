<template>
  <div class="demo">
    <h3>size</h3>
    <ux-progress percentage="40"
                 size="small" />
    <ux-progress percentage="50"
                 status="active"
                 size="small" />
    <ux-progress percentage="60"
                 status="error"
                 size="small" />
    <ux-progress percentage="100"
                 size="small" />
    <ux-progress percentage="75"
                 hide-info
                 size="small" />
    <ux-progress type="circle"
                 percentage="75"
                 width="75" />

  </div>
</template>


<script>
  import { Progress } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxProgress: Progress,
    },
  };
</script>
