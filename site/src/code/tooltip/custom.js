export default `
<ux-tooltip :disabled="disabled" content="测试用tooltip内容">
  <button class="ux-btn" @click="changeDisabled">
    {{disabled ? '打开':'关闭'}}tooltip功能
  </button>
</ux-tooltip>
<script>
  export default {
    data() {
      return {
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
`;
