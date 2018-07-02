<template>
  <div>
    <normal-demo />
    <accordion-demo />
    <nest-demo />
    <simple-demo />
    <custom-demo />
    <control-demo />
  </div>
</template>

<script>
  import NormalDemo from './normal.vue';
  import AccordionDemo from './accordion.vue';
  import NestDemo from './nest.vue';
  import SimpleDemo from './simple.vue';
  import CustomDemo from './custom.vue';
  import ControlDemo from './control.vue';

  export default {
    components: {
      NormalDemo,
      AccordionDemo,
      NestDemo,
      SimpleDemo,
      CustomDemo,
      ControlDemo,
    },
  };
</script>
