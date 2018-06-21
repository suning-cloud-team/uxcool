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
    data() {
      return {
        c: { abc: true },
        style: {
          width: '150px',
        },
        visible: false,
        isShow: true,
      };
    },
    created() {
      setTimeout(() => {
        this.isShow = false;
        this.style = {
          width: '200px',
        };
      }, 3500);
    },
    methods: {
      onMenuClick(e) {
        console.log('onMenuClick', e);
      },
      changeVisible() {
        this.visible = !this.visible;
      },
    },
  };
</script>
