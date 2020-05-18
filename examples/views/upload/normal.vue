<template>
  <div class="demo">
    <h4>normal</h4>
    <ux-upload action="/upload">
      <ux-button>Click to Upload</ux-button>
      <span style="margin-left:8px"
            @click.stop>this is upload tip</span>
    </ux-upload>
  </div>
</template>

<script>
  import { Upload, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxUpload: Upload,
      UxButton: Button,
    },
  };
</script>
