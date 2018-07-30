<template>
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
