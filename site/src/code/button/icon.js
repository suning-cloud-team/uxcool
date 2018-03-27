export default `
<template>
  <div>
    <ux-button type="primary"
               @click="onClick"
               @click.native="onNativeClick"
               shape="circle"
               icon="search" />
    <ux-button type="primary"
               icon="search">Search</ux-button>
    <ux-button shape="circle"
               icon="search" />
    <ux-button icon="search">Search</ux-button>
    <br>
    <ux-button shape="circle"
               icon="search" />
    <ux-button icon="search">Search</ux-button>
    <ux-button type="dashed"
               shape="circle"
               icon="search" />
    <ux-button type="dashed"
               icon="search">Search</ux-button>
  </div>
</template>

<script>
  export default {
    methods: {
      onClick() {
        console.log('click');
      },
      onNativeClick(e) {
        console.log('native click', e);
      },
    },
  };
</script>
`;
