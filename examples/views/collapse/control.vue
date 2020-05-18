<template>
  <div class="demo">
    <h4>Control</h4>
    <ux-collapse :active-keys="activeKeys"
                 control
                 accordion
                 @change="onChange">
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
</template>

<script>
  import { Collapse } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxCollapse: Collapse,
      UxCollapsePanel: Collapse.Panel,
    },
    data() {
      return {
        activeKeys: [],
        text:
          'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
      };
    },
    methods: {
      onChange(val) {
        if (Array.isArray(val)) {
          const idx = val.indexOf('3');
          if (idx > -1) {
            val.splice(idx, 1);
          }
        }
        this.activeKeys = val;
      },
    },
  };
</script>
