<template>
  <div id="anchor-demo-container">
    <ux-anchor :get-container="getContainer">
      <ux-anchor-link href="#title1"
                      title="title1" />
      <ux-anchor-link href="#title2"
                      title="title2" />
      <ux-anchor-link href="#title3"
                      title="title3" />
    </ux-anchor>
    <div class="anchor-demo-content" id="title1">
      <h3>title1</h3>
    </div>
    <div class="anchor-demo-content" id="title2">
      <h3>title2</h3>
    </div>
    <div class="anchor-demo-content" id="title3">
      <h3>title3</h3>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getContainer() {
      return document.querySelector('#anchor-demo-container');
    },
  },
};
</script>


<style scoped>
  .anchor-demo-container {
    height: 400px;
    overflow: auto;
    position: relative;
    padding: 0 20px;
  }
  .anchor-demo-container .anchor-demo-content {
    height: 500px;
    background-color: #eee;
    margin-bottom: 30px;
  }
</style>
