export default `
<ux-popover trigger="click"
  :visible="visible"
  @visible-change="onVisibleChange">
  <button class="ux-btn">打开</button>
  <a slot="content"
    href="###"
    @click="close">关闭</a>
</ux-popover>
<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onVisibleChange(visible) {
      this.visible = visible;
    },
    close() {
      this.visible = false;
    },
  },
};
</script> 
`;
