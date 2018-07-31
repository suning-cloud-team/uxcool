<template>
  <div>
    <normal-demo/>
    <custom-demo />
    <format-demo />
    <value-demo/>
    <size-demo/>
    <disabled-demo />
    <disabled-hours-demo />
    <show-hour-demo />
    <step-demo />
    <addon-demo />
  </div>
</template>


<script>
  import NormalDemo from './normal.vue';
  import ValueDemo from './value.vue';
  import SizeDemo from './size.vue';
  import DisabledDemo from './disabled.vue';
  import DisabledHoursDemo from './disabledHours.vue';
  import ShowHourDemo from './showhour.vue';
  import StepDemo from './step.vue';
  import AddonDemo from './addon.vue';
  import CustomDemo from './custom.vue';
  import FormatDemo from './format.vue';

  export default {
    components: {
      NormalDemo,
      ValueDemo,
      SizeDemo,
      DisabledDemo,
      DisabledHoursDemo,
      ShowHourDemo,
      StepDemo,
      AddonDemo,
      CustomDemo,
      FormatDemo,
    },
  };
</script>
