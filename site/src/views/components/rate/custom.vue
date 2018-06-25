<template>
  <ux-demo :height="200"
           title="自定义">
    <div slot="demo">
      <ux-rate :value="1.5"
               style="font-size:40px"
               allow-half
               autofocus>
        <ux-icon slot="character"
                 slot-scope="props"
                 type="safty" />
      </ux-rate>
      <br>
      <ux-rate :value="1"
               character="★" />
      <br>
      <ux-rate :value="1"
               style="font-size:50px"
               character="M" />
      <br>
      <ux-rate :count="10"
               :value="1.5"
               style="font-size:50px"
               character="H" />
    </div>
    <div slot="desc">
      自定义图标或文字
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/rate/custom.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>

