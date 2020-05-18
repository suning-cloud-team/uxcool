<template>
  <div class="demo">
    <h3>dashboard</h3>
    <ux-progress :stroke-color="strokeColor"
                 :percentage="percent"
                 type="dashboard" />

  </div>
</template>


<script>
  import { Progress } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxProgress: Progress,
    },
    data() {
      return {
        strokeColor: 'red',
        percent: 40,
      };
    },
    created() {
      setTimeout(() => {
        this.percent = 100;
        this.strokeColor = 'skyblue';
      }, 1500);
    },
  };
</script>
