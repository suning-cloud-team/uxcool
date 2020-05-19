<template>
  <div class="demo"
       style="margin-top:1500px"
  >
    <h4>container(不迁移)</h4>
    <div ref="containerRef"
         style="height: 150px; border:1px solid #ccc; overflow:auto"
    >
      <div style="height:500px">
        <div style="padding-top:200px">
          <ux-affix :get-target="getTarget"
                    :offset-bottom="10"
          >
            <ux-button>container</ux-button>
          </ux-affix>
        </div>
      </div>
    </div>
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
      getTarget() {
        const {
          $refs: { containerRef },
        } = this;
        return containerRef;
      },
    },
  };
</script>
