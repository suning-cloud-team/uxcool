<template>
  <ux-demo :height="200"
           title="自定义面板">
    <div slot="demo">
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
    </div>
    <div slot="desc">
      自定义各个面板的背景色,圆角以及内容
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/collapse/custom.vue';

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
