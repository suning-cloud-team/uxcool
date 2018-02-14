<template>
  <ux-demo title="关闭/打开tooltip功能">
    <div slot="demo">
      <ux-tooltip :disabled="disabled"
                  content="测试用tooltip内容">
        <button class="ux-btn"
                @click="changeDisabled">
          {{disabled ? '打开':'关闭'}}tooltip功能
        </button>
      </ux-tooltip>
    </div>
    <div slot="desc">
      关闭/打开tooltip功能
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/tooltip/custom';

  export default {
    data() {
      return {
        code,
        disabled: false,
      };
    },
    methods: {
      changeDisabled() {
        this.disabled = !this.disabled;
      },
    },
  };
</script>