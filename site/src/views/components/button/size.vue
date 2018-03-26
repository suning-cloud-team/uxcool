<template>
  <ux-demo title="大小"
           vertical>
    <div slot="demo">
      <ux-radio-group v-model="size"
                      @change="onChangeSize">
        <ux-radio-button value="large">Large</ux-radio-button>
        <ux-radio-button value="default">Default</ux-radio-button>
        <ux-radio-button value="small">small</ux-radio-button>
      </ux-radio-group>
      <br>
      <br>
      <ux-button type="primary"
                 :size="size">Primary</ux-button>
      <ux-button :size="size">Default</ux-button>
      <ux-button type="dashed"
                 :size="size">Dashed</ux-button>
      <ux-button type="danger"
                 :size="size">Danger</ux-button>

      <br>
      <ux-button type="primary"
                 shape="circle"
                 icon="search"
                 :size="size" />
      <ux-button type="primary"
                 icon="search"
                 :size="size">Search</ux-button>
      <br>
      <ux-button-group :size="size">
        <ux-button type="primary">
          <ux-icon type="left" />Back
        </ux-button>
        <ux-button type="primary">
          Forward
          <ux-icon type="right" />
        </ux-button>
      </ux-button-group>
    </div>
    <div slot="desc">
      按钮有大,中,小三种尺寸, 可通过
      <code>size</code>属性设置
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/button/size';

  export default {
    data() {
      return {
        code,
        size: 'large',
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onChangeSize(val) {
        console.log('val', val);
        this.size = val;
      },
    },
  };
</script>
