<template>
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

