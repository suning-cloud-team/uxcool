<template>
  <div class="demo"
       style="padding-top:650px">
    <h4>event</h4>
    <ux-affix :offset-bottom="30"
              @change="onChange">
      <ux-button>event</ux-button>
    </ux-affix>
  </div>
</template>


<script>
  import { Affix, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxAffix: Affix,
      UxButton: Button,
    },
    methods: {
      onChange(flag) {
        // eslint-disable-next-line no-console
        console.log('是否浮动', flag);
      },
    },
  };
</script>
