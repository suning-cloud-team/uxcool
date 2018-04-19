<template>
  <ux-demo title="按钮组合"
           vertical>
    <div slot="demo"
         class="gutter-group">
      <ux-button-group>
        <ux-button>Canel</ux-button>
        <ux-button>Ok</ux-button>
      </ux-button-group>

      <ux-button-group>
        <ux-button disabled>L</ux-button>
        <ux-button disabled>M</ux-button>
        <ux-button disabled>R</ux-button>
      </ux-button-group>
      <br>
      <ux-button-group>
        <ux-button>L</ux-button>
        <ux-button>M</ux-button>
        <ux-button>R</ux-button>
      </ux-button-group>

      <br>

      <ux-button-group>
        <ux-button type="primary">
          <ux-icon type="left" />Go Back
        </ux-button>
        <ux-button type="primary">
          Go Forward
          <ux-icon type="right" />
        </ux-button>
      </ux-button-group>

      <ux-button-group>
        <ux-button type="primary"
                   icon="cloud_upload" />
        <ux-button type="primary"
                   icon="cloud_download" />
      </ux-button-group>
    </div>
    <div slot="desc">
      可将按钮放入
      <code>ux-button-group</code>中,组成按钮组合.通过
      <code>size</code>设置按钮组中按钮大小
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/button/group';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>
