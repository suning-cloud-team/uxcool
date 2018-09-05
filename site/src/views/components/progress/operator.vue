<template>
  <ux-demo :height="200"
           title="交互进度条">
    <div slot="demo">
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
    <div slot="desc">
      可交互的进度条
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/progress/operator.vue';

  export default {
    data() {
      return {
        code,
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
