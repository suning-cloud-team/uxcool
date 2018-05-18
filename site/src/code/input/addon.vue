<template>
  <div>
    <ux-input addon-before="http://"
              addon-after=".com" />
    <ux-input size="large">
      <ux-select slot="addonBefore"
                 value="http://"
                 style="width:90px">
        <ux-option value="http://">http://</ux-option>
        <ux-option value="https://">https://</ux-option>
        <ux-option value="ftp://">ftp://</ux-option>
      </ux-select>
      <ux-select slot="addonAfter"
                 value=".edu"
                 style="width:80px">
        <ux-option value=".com">.com</ux-option>
        <ux-option value=".org.org.org.org.org.org">.org.org.org.org.org.org</ux-option>
        <ux-option value=".edu">.edu</ux-option>
        <ux-option value=".cn">.cn</ux-option>
      </ux-select>
    </ux-input>
    <ux-input>
      <ux-icon slot="addonAfter"
               type="regulation" />
    </ux-input>
  </div>
</template>


<script>
  export default {};
</script>
<style scoped>
  .ux-input-group-wrapper {
    margin-bottom: 10px;
  }
</style>
