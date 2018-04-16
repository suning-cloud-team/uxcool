<template>
  <ux-demo title="带icon的滑块"
           :height="200">
    <div slot="demo">
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
    <div slot="desc">
      <code>slider</code>左右可设置
      <code>icon</code>来表示业务含义
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/slider/icon.vue';

  export default {
    data() {
      return {
        code,
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
