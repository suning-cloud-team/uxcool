<template>
  <div class="demo">
    <h4>Normal</h4>
    <ux-card-advance title="card title"
                     hoverable>
      <a slot="extra">More</a>
      <p>content</p>
      <p>content</p>
      <p>content</p>
    </ux-card-advance>
  </div>
</template>
<script >
  import { Card } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxCardAdvance: Card,
    },
  };
</script>
