<template>
  <div>
    <ux-textarea id="textarea1"
                 row="4" />
    <ux-textarea id="textarea2"
                 row="4"
                 style="height: 100px; margin-top: 10px; resize: none;" />
    <ux-textarea id="textarea3"
                 :textarea-style="{height: '100px', marginTop: '10px', resize: 'none'}"
                 row="4" />
  </div>
</template>


<script>
  export default {};
</script>
