export default `

<template>
  <div>
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
        <Icon type="left" />Back
      </ux-button>
      <ux-button type="primary">
        Forward
        <Icon type="right" />
      </ux-button>
    </ux-button-group>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        size: 'large',
      };
    },
    methods: {
      onChangeSize(val) {
        console.log('val', val);
        this.size = val;
      },
    },
  };
</script>
`;
