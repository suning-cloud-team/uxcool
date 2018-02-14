export default `
<ux-popover content="无标题">
  无标题
</ux-popover>
<br>
<ux-popover :content="innerContent">
  自定义标题
  <span slot="title"
      style="color:red">标题红</span>
</ux-popover>`;
