<template>
  <div>
    <div id="offsetDemo"
         class="demo">
      offsetDemo
      <ux-anchor :offset-top="100">
        <ux-anchor-link href="#offsetDemo"
                        title="basic demo" />
        <ux-anchor-link href="#targetDemo"
                        title="target demo" />
      </ux-anchor>
    </div>
    <div id="targetDemo"
         class="demo"
         style="margin:200px 0">
      target demo
    </div>
  </div>
</template>

<script>
  export default {};
</script>

