<template>
  <ux-demo title="slot"
           :height="200">
    <div slot="demo">
      <ux-alert>
        <ux-icon slot="closeText"
                 type="delete_o" />
        <span style="color:red;"
              slot="message">This is slot message</span>
        <span style="color:green;"
              slot="description">This is slot description</span>
      </ux-alert>
    </div>
    <div slot="desc">
      通过
      <code>slot</code>,设置
      <code>closeText</code>,
      <code>message</code>,
      <code>description</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/alert/slot.vue';

  export default {
    data() {
      return {
        code,
      };
    },
  };
</script>
