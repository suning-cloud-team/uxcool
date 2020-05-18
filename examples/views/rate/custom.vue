<template>

  <div class="demo">
    <h4>custom</h4>
    <ux-rate :value="1.5"
             style="font-size:40px"
             allow-half
             autofocus>
      <ux-icon slot="character"
               slot-scope="props"
               type="safty" />
    </ux-rate>
    <br>
    <ux-rate :value="1"
             character="★" />
    <br>
    <ux-rate :value="1"
             style="font-size:50px"
             character="M" />
    <br>
    <ux-rate :count="10"
             :value="1.5"
             style="font-size:50px"
             character="H" />
  </div>
</template>


<script>
  import { Rate, Icon } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxRate: Rate,
      UxIcon: Icon,
    },
  };
</script>
