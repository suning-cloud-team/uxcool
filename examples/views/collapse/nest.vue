<template>
  <div class="demo">
    <h4>Nest</h4>
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
</template>

<script>
  import { Collapse } from '@suning/uxcool';

  export default {
    components: {
      UxCollapse: Collapse,
      UxCollapsePanel: Collapse.Panel,
    },
    data() {
      return {
        text:
          'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
      };
    },
  };
</script>
