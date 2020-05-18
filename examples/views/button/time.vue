<template>
  <div class="demo">
    <button @click="resetCountDown">
      reset countdown
    </button>
    <ux-button loading>
      中文{{ timer ? timer : '' }}
    </ux-button>
  </div>
</template>

<script>
  import { Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxButton: Button,
    },
    data() {
      return {
        timer: 5,
      };
    },
    created() {
      this.countDown();
    },
    methods: {
      resetCountDown() {
        this.timer = 5;
        this.countDown();
      },
      countDown() {
        this.timer -= 1;
        if (this.timer > 0) {
          setTimeout(() => {
            this.countDown();
          }, 1000);
        }
      },
    },
  };
</script>
