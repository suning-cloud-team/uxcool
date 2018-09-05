<template>
  <div class="demo">
    <h3>circle</h3>
    <h4>top</h4>
    <ux-progress type="circle"
                 gap-position="top"
                 percentage="40" />
    <h4>bottom</h4>
    <ux-progress type="circle"
                 gap-position="bottom"
                 percentage="10"
                 stroke-color="skyblue" />
    <h4>right</h4>
    <ux-progress type="circle"
                 gap-position="right"
                 percentage="100"
                 status="error" />
    <h4>left</h4>
    <ux-progress type="circle"
                 gap-position="left"
                 percentage="30"
                 status="active" />
  </div>
</template>


<script>
  import { Progress } from '@suning/uxcool';

  export default {
    components: {
      UxProgress: Progress,
    },
  };
</script>
