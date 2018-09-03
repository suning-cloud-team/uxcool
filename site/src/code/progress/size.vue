<template>
  <div>
    <ux-progress percentage="40"
                 size="small" />
    <ux-progress percentage="50"
                 status="active"
                 size="small" />
    <ux-progress percentage="60"
                 status="error"
                 size="small" />
    <ux-progress percentage="100"
                 size="small" />
    <ux-progress percentage="75"
                 hide-info
                 size="small" />

    <ux-progress type="circle"
                 percentage="75"
                 width="75" />
    <ux-progress type="circle"
                 percentage="45"
                 status="error"
                 width="75" />
    <ux-progress type="circle"
                 percentage="100"
                 status="success"
                 width="75" />
  </div>
</template>

<script>
  export default {};
</script>

