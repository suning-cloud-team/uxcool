<template>
  <ux-demo title="自定义容器"
           :height="200">
    <div slot="demo">
      <div id="containerAnchor"
           style="background:skyblue;height:500px;overflow:auto">
        <div id="container-1"
             class="demo p-xs-3">
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
    </div>
    <div slot="desc"></div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/anchor/container.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      getContainer() {
        return document.querySelector('#containerAnchor');
      },
    },
  };
</script>

