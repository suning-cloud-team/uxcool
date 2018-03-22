export default `

<template>
  <div >
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
        <Icon type="left" />Go Back
      </ux-button>
      <ux-button type="primary">
        Go Forward
        <Icon type="right" />
      </ux-button>
    </ux-button-group>

    <ux-button-group>
      <ux-button type="primary"
                 icon="cloud_upload" />
      <ux-button type="primary"
                 icon="cloud_download" />
    </ux-button-group>
  </div>
</template>

<script>
  export default {};
</script>
`;
