<template>
  <div>
    <ux-progress :format="format"
                 class="user-custom-progress"
                 percentage="200" />
    <ux-progress :format="format"
                 type="circle"
                 percentage="40" />
  </div>

</template>

<script>
  export default {
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
