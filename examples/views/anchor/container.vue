<template>
  <div id="containerAnchor"
       style="background:skyblue;height:500px;overflow:auto">
    <div id="container-1"
         class="demo">
      container1
      <ux-anchor :get-container="getContainer"
                 :offset-top="100">
        <ux-anchor-link href="#container-1"
                        title="basic demo" />
        <ux-anchor-link href="#container-2"
                        title="second demo" />
      </ux-anchor>
    </div>

    <div id="container-2"
         class="demo"
         style="margin:1400px 0">
      constiner 2
    </div>

  </div>
</template>


<script>
  import { Anchor } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxAnchor: Anchor,
      UxAnchorLink: Anchor.Link,
    },
    methods: {
      getContainer() {
        return document.querySelector('#containerAnchor');
      },
    },
  };
</script>
