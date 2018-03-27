<template>
  <div>
    <ux-alert>
      <ux-icon slot="closeText"
               type="delete_o" />
      <span style="color:red;"
            slot="message">This is slot message</span>
      <span style="color:green;"
            slot="description">This is slot description</span>
    </ux-alert>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>
