<template>
  <div>
    <h4>size</h4>
    <div class="demo">
      <ux-input size="large" />
      <ux-input />
      <ux-input size="small" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Input, Icon, Select, Tooltip } from '@suning/uxcool';

  export default {
    components: {
      UxInput: Input,
      UxIcon: Icon,
      UxSelect: Select,
      UxOption: Select.Option,
      UxTooltip: Tooltip,
    },
    data() {
      return {
        inputVal: '',
      };
    },
    computed: {
      ...mapState(['theme']),
      tooltipVal() {
        const { inputVal } = this;
        return inputVal;
      },
    },
  };
</script>

<style lang="scss" >
  .input-tooltip .ux-tooltip-inner {
    min-width: 32px;
    min-height: 33px;
  }
</style>
