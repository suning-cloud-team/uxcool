<template>
  <div>
    <div id="basicDemo"
         class="demo">
      basicDemo
      <ux-anchor>
        <ux-anchor-link href="#basicDemo"
                        title="basic demo" />
        <ux-anchor-link href="#secondDemo"
                        title="second demo" />
        <ux-anchor-link href="#ccc"
                        title="ccc">
          <span style="color:green">slot cccc</span>
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

    <div id="secondDemo"
         class="demo"
         style="margin:100px 0">
      second demo
    </div>

    <div id="t-d"
         class="demo">
      t-d
    </div>
  </div>
</template>

<script>
  export default {};
</script>
