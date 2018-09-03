<template>
  <div class="demo">
    <h3>line</h3>
    <ux-progress percentage="40" />
    <ux-progress percentage="50"
                 status="active" />
    <ux-progress percentage="60"
                 status="error" />
    <ux-progress percentage="100" />
    <ux-progress :format="format"
                 percentage="40" />
    <ux-progress percentage="75"
                 hide-info/>
    <ux-progress percentage="30"
                 stroke-width="1" />
    <ux-progress percentage="30"
                 stroke-color="skyblue" />
    <ux-progress stroke-width="4" />

  </div>
</template>


<script>
  import { Progress } from '@suning/uxcool';

  export default {
    components: {
      UxProgress: Progress,
    },
    methods: {
      format(percent) {
        return Number(percent) * 2;
      },
    },
  };
</script>
