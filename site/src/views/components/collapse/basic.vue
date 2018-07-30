<template>
  <ux-demo :height="200"
           title="基本用法">
    <div slot="demo">
      <ux-collapse :active-keys="'2'">
        <ux-collapse-panel name="1"
                           header="This is header panel 1">
          {{ text }}
        </ux-collapse-panel>
        <ux-collapse-panel name="2"
                           header="This is header panel 2">
          {{ text }}
        </ux-collapse-panel>
        <ux-collapse-panel name="3"
                           header="This is header panel 3">
          {{ text }}
        </ux-collapse-panel>
      </ux-collapse>
    </div>
    <div slot="desc">
      折叠面板,可同时展开多个
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/collapse/basic.vue';

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

