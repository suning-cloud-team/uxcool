<template>
  <ux-demo title="加载中"
           vertical>
    <div slot="demo">
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
    <div slot="desc">通过
      <code>loading</code>属性使按钮处于加载状态。
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
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
