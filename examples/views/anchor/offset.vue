<template>
  <div>
    <h4>offset</h4>
    <div id="offsetDemo"
         class="demo">
      offsetDemo
      <ux-anchor :offset-top="100">
        <ux-anchor-link href="#offsetDemo"
                        title="basic demo" />
        <ux-anchor-link href="#secondDemo"
                        title="second demo" />
      </ux-anchor>
    </div>
  </div>
</template>


<script>
  import { Anchor } from '@suning/uxcool';

  export default {
    components: {
      UxAnchor: Anchor,
      UxAnchorLink: Anchor.Link,
    },
  };
</script>
