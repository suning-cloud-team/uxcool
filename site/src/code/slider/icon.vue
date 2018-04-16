<template>
  <div>
    <div class="demo-icon">
      <ux-icon type="unhappy_o"
               :style="unHappyStyle" />
      <ux-slider :min="0"
                 :max="10"
                 v-model="value"
                 @change="onChange" />
      <ux-icon type="happy_o"
               :style="happyStyle" />
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        min: 0,
        max: 10,
        value: 5,
        unHappyStyle: {},
        happyStyle: {},
      };
    },
    computed: {
      mid() {
        const { min, max } = this;
        return (max - min) / 2;
      },
    },
    created() {
      this.setStyle(this.value);
    },
    methods: {
      setStyle(val) {
        const { mid } = this;
        if (val >= mid) {
          this.happyStyle = {
            color: 'rgba(0, 0, 0, 0.45)',
          };
          this.unHappyStyle = {};
        } else {
          this.happyStyle = {};
          this.unHappyStyle = {
            color: 'rgba(0, 0, 0, 0.45)',
          };
        }
      },
      onChange(val) {
        this.setStyle(val);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .demo-icon {
    position: relative;
    padding: 20px 30px;
    width: 300px;
    .fu {
      position: absolute;
      font-size: 16px;
      top: 33px;
      color: rgba(0, 0, 0, 0.25);
      &:first-child {
        left: 0;
      }
      &:last-child {
        right: 0;
      }
    }
  }
</style>
