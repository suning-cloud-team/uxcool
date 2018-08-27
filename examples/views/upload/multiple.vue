<template>
  <div class="demo">
    <h4>multiple</h4>
    <ux-upload action="/upload"
               list-type="picture"
               multiple>
      <ux-button icon="upload">Click to Upload</ux-button>
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Button } from '@suning/uxcool';

  export default {
    components: {
      UxUpload: Upload,
      UxButton: Button,
    },
  };
</script>
