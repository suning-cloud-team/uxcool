<template>
  <div class="demo">
    <h4>picture</h4>
    <ux-upload action="/upload"
               list-type="picture">
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
