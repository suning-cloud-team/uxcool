<template>
  <div>
    <ux-radio-group type="button"
                    size="large"
                    :options="opts2" />
    <br>
    <br>
    <ux-radio-group type="button"
                    :options="opts2" />
    <br>
    <br>
    <ux-radio-group type="button"
                    size="small"
                    :options="opts2" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        opts2: [{ label: '1', value: 'a1', checked: true }, 'b1', 'c1', '1'],
      };
    },
  };
</script>
