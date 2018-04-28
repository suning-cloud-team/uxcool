<template>
  <div>
    <h4>config</h4>
    <div class="demo">
      <h6>config</h6>
      <ux-button @click="resetConfig">reset</ux-button>
      <ux-button @click="setConfig">set top =60px, duration=3000 </ux-button>
      <ux-button @click="setConfig1">theme=dark </ux-button>
      <ux-button @click="open">open message</ux-button>
    </div>
  </div>
</template>


<script>
  import { Button, Message } from '@suning/uxcool';

  export default {
    components: {
      UxButton: Button,
    },
    methods: {
      setConfig() {
        Message.config({
          top: '60px',
          duration: 3000,
          getContainer() {
            return document.querySelector('#msgContainer');
          },
        });
      },
      setConfig1() {
        Message.config({
          theme: 'dark',
        });
      },
      resetConfig() {
        Message.config({});
      },
      open() {
        Message.success({
          content: 'this is config message',
          duration: 0,
        });
      },
    },
  };
</script>
