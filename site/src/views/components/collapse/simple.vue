<template>
  <ux-demo :height="200"
           title="简洁风格">
    <div slot="demo">
      <ux-collapse :border="false">
        <ux-collapse-panel header="This is header panel 1">
          {{ text }}
        </ux-collapse-panel>
        <ux-collapse-panel header="This is header panel 2">
          {{ text }}
        </ux-collapse-panel>
        <ux-collapse-panel header="This is header panel 3">
          {{ text }}
        </ux-collapse-panel>
      </ux-collapse>
    </div>
    <div slot="desc">
      简洁风格, 无边框
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/collapse/simple.vue';

  export default {
    data() {
      return {
        code,
        text:
          'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
      };
    },
  };
</script>
