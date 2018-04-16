<template>
  <ux-demo title="自定义提示"
           :height="200">
    <div slot="demo">
      <h4>tip</h4>
      <div class="demo">
        <ux-slider :value="20"
                   :tip-formatter="tipFormat" />
      </div>
      <div class="demo">
        <ux-slider range
                   :value="[20, 40]"
                   :tip-formatter="rangeTipFormat" />
      </div>

      <h4>no tip</h4>
      <div class="demo">
        <ux-slider :value="20"
                   :tip-formatter="false" />
        <ux-slider range
                   :value="[20,40]"
                   :tip-formatter="false" />
      </div>
    </div>
    <div slot="desc">
      使用
      <code>tip-formatter</code>格式化
      <code>Tooltip</code>内容; 设置
      <code>tip-formatter=false</code>,则隐藏
      <code>Tooltip</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/slider/tip.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      tipFormat(v) {
        return `${v}%`;
      },
      rangeTipFormat(v, index) {
        return `${index}-${v}`;
      },
    },
  };
</script>
