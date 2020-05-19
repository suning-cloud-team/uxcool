<template>
  <div class="demo">
    <ux-progress :percentage="percent" />
    <ux-progress :percentage="percent"
                 type="circle" />
    <div>
      <ux-button icon="add"
                 @click="add" />
      <ux-button style="margin-left:5px;"
                 icon="minus"
                 @click="minus" />
    </div>
  </div>
</template>


<script>
  import { Progress, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxProgress: Progress,
      UxButton: Button,
    },
    data() {
      return {
        percent: 10,
      };
    },
    methods: {
      add() {
        let { percent } = this;
        percent += 5;
        if (percent > 100) {
          percent = 100;
        }
        this.percent = percent;
      },
      minus() {
        let { percent } = this;
        percent -= 5;
        if (percent < 0) {
          percent = 0;
        }
        this.percent = percent;
      },
    },
  };
</script>
