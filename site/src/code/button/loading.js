export default `

<template>
  <div>
    <ux-button type="primary"
               loading>
      Loading
    </ux-button>
    <ux-button type="primary"
               size="small"
               loading>
      Loading
    </ux-button>
    <br>
    <ux-button type="primary"
               :loading="loading"
               @click="onLoadClick">
      Click me!
    </ux-button>
    <ux-button type="primary"
               icon="send_out"
               :loading="iconLoading"
               @click="onIconClick">Click me!</ux-button>

    <ux-button type="primary"
               icon="send_out"
               :loading="{delay:1500}">
      Click me!
    </ux-button>
    <br>
    <ux-button shape="circle"
               loading />
    <ux-button type="primary"
               shape="circle"
               loading />
  </div>
</template>

<script>
  import code from '@/code/button/loading';

  export default {
    data() {
      return {
        code,
        loading: false,
        iconLoading: false,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onLoadClick() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2500);
      },
      onIconClick() {
        this.iconLoading = true;
        setTimeout(() => {
          this.iconLoading = false;
        }, 2500);
      },
    },
  };
</script>
`;
