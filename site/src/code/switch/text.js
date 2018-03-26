export default `
<template>
  <div>
    <ux-switch checked-children="开"
               unchecked-children="关" />
    <br>
    <ux-switch>
      <span slot="checkedChildren">
        <ux-icon type="setting" />
      </span>
      <span slot="uncheckedChildren">
        <ux-icon type="safty" />
      </span>
    </ux-switch>
  </div>
</template>

<script>
  export default {};
</script>
`;
