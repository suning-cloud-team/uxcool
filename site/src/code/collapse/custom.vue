<template>
  <ux-collapse :border="false">
    <ux-collapse-panel header="This is custom style panel"
                       style="margin-bottom: 20px; border-bottom: none;
                         background: #fafafa;border-radius:6px">
      {{ text }}
    </ux-collapse-panel>
    <ux-collapse-panel>
      <template slot="header">
        This is custom header panel
        <ux-icon type="horn" />
      </template>
      {{ text }}
    </ux-collapse-panel>
    <ux-collapse-panel :show-arrow="false"
                       header="This is hide arrow">
      {{ text }}
    </ux-collapse-panel>
    <ux-collapse-panel disabled
                       header="This is disabled panel">
      {{ text }}
    </ux-collapse-panel>
  </ux-collapse>
</template>

<script>
  export default {
    data() {
      return {
        text:
          'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
      };
    },
  };
</script>
