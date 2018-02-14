export default `
<template>
  <ux-steps :current="current">
    <ux-step title="Login"
      v-for="(step,i) in steps"
      :key="i"
      :title="step.title">
    </ux-step>
  </ux-steps>
  <div class="demo-step-body">
    {{currentStep.title}}
  </div>
  <button class="ux-btn" @click="prev">上一步</button>
  <button class="ux-btn" @click="next">下一步</button>
</template>

<style lang="scss">
.demo-step-body {
  width: 100%;
  height: 200px;
  background: #eee;
  margin: 20px 0 10px;
  text-align: center;
}
</style>

<script>

export default {
  data (){
    return {
      current: 1,
      currentStep: null,
      steps: []
    };
  },
  created() {
    this.steps = Array(4)
      .fill(0)
      .map((v, i) => ({ title: \`步骤\${i + 1}\` }));
    this.currentStep = this.steps[this.current];
  },
   methods: {
    prev() {
      const { current, steps } = this;
      const step = current - 1;
      this.current = step < 0 ? steps.length + step : step;
      this.currentStep = steps[this.current];
    },
    next() {
      const { current, steps } = this;
      this.current = (current + 1) % steps.length;
      this.currentStep = steps[this.current];
    },
  }
}
</script>
`