<template>
  <div>
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
  export default {
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
