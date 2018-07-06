<template>
  <div class="demo">
    <ux-button icon="account">abc</ux-button>
    <ux-button>中文啊</ux-button>
    <ux-button icon="loading">中文</ux-button>
    <ux-button>中文</ux-button>
    <ux-button icon="account">中文</ux-button>
    <ux-button>
      <span>
        <span>
          <span>中文</span>
        </span>
      </span>
    </ux-button>
  </div>
</template>
<script>
  import { Button } from '@suning/uxcool';

  export default {
    components: {
      UxButton: Button,
    },
  };
</script>
