<template>
  <ux-demo :height="200"
           title="面板嵌套">
    <div slot="demo">
      <ux-collapse accordion>
        <ux-collapse-panel header="This is header panel 1">
          <ux-collapse accordion>
            <ux-collapse-panel header="This is nest panel 1">
              {{ text }}
            </ux-collapse-panel>
          </ux-collapse>
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
      折叠面板嵌套
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/collapse/nest.vue';

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
