<template>
  <div>
    <div id="basicDemo"
         class="demo">
      basicDemo
    </div>

    <div id="secondDemo"
         class="demo">
      second demo
    </div>
    <div id="t-d"
         class="demo">
      t-d
    </div>
    <ux-anchor style="position: fixed; right: 0px; top: 50%;">
      <ux-anchor-link href="#basicDemo"
                      title="basic demo" />
      <ux-anchor-link href="#secondDemo"
                      title="second demo" />
      <ux-anchor-link href="#ccc"
                      title="ccc">
        <ux-anchor-link href="#t-d"
                        title="t-d">
          <ux-anchor-link href="#t-t-d"
                          title="t-t-d" />

        </ux-anchor-link>
        <ux-anchor-link href="#c-d"
                        title="c-d" />
      </ux-anchor-link>
    </ux-anchor>
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

<style scoped>
.demo {
  height: 600px;
}
</style>
