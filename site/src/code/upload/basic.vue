<template>
  <div>
    <ux-upload name="abc"
               action="http://dip.cnsuning.com/service/1554195600131/1.0/upload">
      <ux-button icon="upload">Click to Upload</ux-button>
      <span style="margin-left:8px"
            @click.stop>this is upload tip</span>
    </ux-upload>
  </div>
</template>

<script>
  export default {};
</script>

