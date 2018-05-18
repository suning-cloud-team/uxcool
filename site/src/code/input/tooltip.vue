<template>
  <div>
    <ux-tooltip trigger="focus"
                placement="topLeft"
                tooltip-class="input-tooltip"
                :content="tooltipVal">
      <ux-input v-model="inputVal"
                style="width:150px;" />
    </ux-tooltip>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        inputVal: '',
      };
    },
    computed: {
      tooltipVal() {
        const { inputVal = '' } = this;
        const r = inputVal;
        const arr = r.split('.');
        arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return arr.join('.');
      },
    },
  };
</script>
<style>
  .input-tooltip .ux-tooltip-inner {
    min-width: 32px;
    min-height: 33px;
  }
</style>
