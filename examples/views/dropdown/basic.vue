<template>
  <div>
    <normal-demo />
    <container-demo />
    <button-demo />
    <position-demo />
    <disable-demo />
    <event-demo />
  </div>
</template>
<script>
  import NormalDemo from './normal.vue';
  import ContainerDemo from './container.vue';
  import ButtonDemo from './button.vue';
  import PositionDemo from './position.vue';
  import DisableDemo from './disable.vue';
  import EventDemo from './event.vue';

  export default {
    components: {
      NormalDemo,
      ContainerDemo,
      ButtonDemo,
      PositionDemo,
      DisableDemo,
      EventDemo,
    },
  };
</script>
