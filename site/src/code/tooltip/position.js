export default `
<div>
  <div class="top">
    <ux-tooltip placement="topLeft"
                :content="buildContent('Top-Left')">
      <button class="ux-btn">Top-Left</button>
    </ux-tooltip>
    <ux-tooltip placement="top"
                :content="buildContent('Top')">
      <button class="ux-btn">Top</button>
    </ux-tooltip>
    <ux-tooltip placement="topRight"
                :content="buildContent('Top-Right')">
      <button class="ux-btn">Top-Right</button>
    </ux-tooltip>
  </div>
  <div class="left">
    <ux-tooltip placement="leftTop"
                :content="buildContent('Left-Top')">
      <button class="ux-btn">Left-Top</button>
    </ux-tooltip>
    <ux-tooltip placement="left"
                :content="buildContent('Left')">
      <button class="ux-btn">Left</button>
    </ux-tooltip>
    <ux-tooltip placement="leftBottom"
                :content="buildContent('Left-Bottom')">
      <button class="ux-btn">Left-Bottom</button>
    </ux-tooltip>
  </div>
  <div class="right">
    <ux-tooltip placement="rightTop"
                :content="buildContent('Right-Top')">
      <button class="ux-btn">Right-Top</button>
    </ux-tooltip>
    <ux-tooltip placement="right"
                :content="buildContent('Right')">
      <button class="ux-btn">Right</button>
    </ux-tooltip>
    <ux-tooltip placement="rightBottom"
                :content="buildContent('Right-Bottom')">
      <button class="ux-btn">Right-Bottom</button>
    </ux-tooltip>
  </div>
  <div class="bottom">
    <ux-tooltip placement="bottomLeft"
                :content="buildContent('Bottom-Left')">
      <button class="ux-btn">Bottom-Left</button>
    </ux-tooltip>
    <ux-tooltip placement="bottom"
                :content="buildContent('Bottom')">
      <button class="ux-btn">Bottom</button>
    </ux-tooltip>
    <ux-tooltip placement="bottomRight"
                :content="buildContent('Bottom-Right')">
      <button class="ux-btn">Bottom-Right</button>
    </ux-tooltip>
  </div>
</div>
<script>
  export default {
    methods: {
      buildContent(prefix) {
        return \`\${prefix}提示文字\`;
      },
    },
  };
</script>
<style lang="scss" scoped>
.top {
  text-align: center;
}
.left {
  float: left;
}
.right {
  float: right;
}
.bottom {
  clear: both;
  text-align: center;
}
.left,
.right {
  button {
    display: block;
    margin-top: 10px;
  }
}
</style>
`;
