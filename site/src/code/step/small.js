export default `
<template>
<ux-steps current="1" size="small">
  <ux-step title="已完成" desc="这是描述1">
    <span slot="title" style="color:green">
      已完成!!
    </span>
  </ux-step>
  <ux-step title="进行中">
    <span slot="desc" style="color: grey">
      这是描述2
    </span>
  </ux-step>
  <ux-step title="待运行" desc="这是描述3"></ux-step>
  <ux-step title="待运行" desc="这是描述4"></ux-step>
</ux-steps>

<ux-steps current="1" size="small" direction="vertical">
  <ux-step title="已完成" desc="这是描述1"></ux-step>
  <ux-step title="进行中" desc="这是描述2"></ux-step>
  <ux-step title="待运行" desc="这是描述3"></ux-step>
  <ux-step title="待运行" desc="这是描述4"></ux-step>
</ux-steps>
</template>
`;
