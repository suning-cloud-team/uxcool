<template>
  <ux-demo :height="200"
           title="小型进度条">
    <div slot="demo">
      <ux-progress percentage="40"
                   size="small" />
      <ux-progress percentage="50"
                   status="active"
                   size="small" />
      <ux-progress percentage="60"
                   status="error"
                   size="small" />
      <ux-progress percentage="100"
                   size="small" />
      <ux-progress percentage="75"
                   hide-info
                   size="small" />

      <ux-progress type="circle"
                   percentage="75"
                   width="75" />
      <ux-progress type="circle"
                   percentage="45"
                   status="error"
                   width="75" />
      <ux-progress type="circle"
                   percentage="100"
                   status="success"
                   width="75" />
    </div>
    <div slot="desc">
      <code>type=line</code>时,通过
      <code>size=small</code>设置小型进度条;<br>
      <code>type=circle</code>时,通过
      <code>width</code>属性控制画板大小,
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/progress/size.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

