<template>
  <div class="demo">
    <h4>normal</h4>
    <ux-upload action="/upload">
      <ux-button>Click to Upload</ux-button>
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
