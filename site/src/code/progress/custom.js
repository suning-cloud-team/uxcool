export default `
<template>
  <div style="width: 400px">
    <ux-progress stroke-width="2"></ux-progress>
    <ux-progress percentage="30" stroke-width="2">
    </ux-progress>
    <ux-progress percentage="30" stroke-width="2" status="error">
      <ux-icon type="close_circle_o"></ux-icon>
    </ux-progress>
    <ux-progress percentage="100" stroke-width="2" status="success">
      <ux-icon type="ok_circle"></ux-icon>
    </ux-progress>
    <ux-progress percentage="100" stroke-width="20" hide-info></ux-progress>
    <ux-progress percentage="100" stroke-width="20"  status="error"  hide-info></ux-progress>
    <ux-progress percentage="100" stroke-width="20"  status="success" hide-info></ux-progress>
  </div>
</template>
`;
