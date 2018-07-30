<template>
  <ux-demo :height="200"
           title="手工控制">
    <div slot="demo">
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
    <div slot="desc">
      使用
      <code>control</code>属性,实现手工控制面板折叠
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/collapse/control.vue';

  export default {
    data() {
      return {
        code,
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
