export default `
<ux-popover content="自定义标题" :popover-style="{width:'200px'}">
  弹窗框样式
  <span slot="title" style="color:red">标题红</span>
  <template slot="content">
    <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
    <div>额外内容</div>
  </template>
</ux-popover>`;
