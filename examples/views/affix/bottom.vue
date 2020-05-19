<template>
  <div class="demo"
       style="padding-top:250px"
  >
    <h4>bottom</h4>
    <ux-affix :offset-bottom="10">
      <ux-button>bottom</ux-button>
    </ux-affix>
  </div>
</template>


<script>
  import { Affix, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxAffix: Affix,
      UxButton: Button,
    },
  };
</script>
