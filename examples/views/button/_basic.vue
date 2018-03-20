<template>
  <div>
    <ux-button theme="primary">primary</ux-button>
    <ux-button theme="default">default</ux-button>
    <ux-button theme="success">success</ux-button>
    <ux-button theme="info">info</ux-button>
    <ux-button theme="warning">warning</ux-button>
    <ux-button theme="danger">danger</ux-button>
    <br>
    <br>
    <ux-button size="extraSmall">extra small</ux-button>
    <ux-button size="small">small</ux-button>
    <ux-button>default</ux-button>
    <ux-button size="large">large</ux-button>
    <ux-button size="extraLarge">extra large</ux-button>
    <br>
    <ux-button loading>loading</ux-button>
    <ux-button :loading="loading"
               @click="clickBtn">{{btnText}}</ux-button>
    <ux-button loading>loading</ux-button>

    <br>
    <ux-button>
      <i class="fu fu-arrow_left"></i>previous
    </ux-button>
    <ux-button>
      next
      <i class="fu fu-arrow_right right"></i>
    </ux-button>
    <br>
  </div>
</template>


<script>
  import '@suning/uxcool/src/components/button/style/index.scss';
  import UxButton from '@suning/uxcool/src/components/button/index';

  export default {
    components: {
      UxButton,
    },
    data() {
      return {
        loading: false,
        btnText: 'Click',
      };
    },
    methods: {
      clickBtn() {
        console.log('click');
        this.loading = !this.loading;
        this.btnText = this.loading ? 'loading' : 'Click';
      },
    },
  };
</script>

<style lang="scss">

</style>
