<template>
  <ux-demo :height="200"
           title="格式化">
    <div slot="demo">
      <ux-progress :format="format"
                   class="user-custom-progress"
                   percentage="200" />
      <ux-progress :format="format"
                   type="circle"
                   percentage="40" />
    </div>
    <div slot="desc">
      自定义进度条内容
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/progress/format.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      format(percent) {
        return `${percent} 项`;
      },
    },
  };
</script>

<style >
  .user-custom-progress.ux-progress-show-info .ux-progress-outer {
    padding: calc(3em + 8px);
    margin: calc(-3em - 8px);
  }
  .user-custom-progress .ux-progress-text {
    width: 3em;
  }
</style>
