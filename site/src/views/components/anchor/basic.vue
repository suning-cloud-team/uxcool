<template>
  <ux-demo title="基本用法"
           :height="200">
    <div slot="demo">
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
    <div slot="desc"></div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/anchor/basic.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

