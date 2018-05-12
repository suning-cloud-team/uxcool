<template>
  <div>
    <h4>tooltip</h4>
    <div class="demo">
      <ux-tooltip trigger="focus"
                  placement="topLeft"
                  tooltip-class="input-tooltip"
                  :content="tooltipVal">
        <ux-input v-model="inputVal"
                  style="width:150px;" />
      </ux-tooltip>
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
        const { inputVal = '' } = this;
        const r = inputVal;
        const arr = r.split('.');
        arr[0] = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        return arr.join('.');
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
