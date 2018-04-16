<template>
  <div>
    <div class="demo">
      <popconfirm>
        Delete
        <div style="color: red"
             slot="title">
          <div>

            This is title?
          </div>
          <div>this is description</div>
        </div>
      </popconfirm>
    </div>
  </div>
</template>


<script>
  import { Popconfirm } from '@suning/uxcool';
  import CustomDemo from './custom.vue';

  export default {
    components: {
      Popconfirm,
      CustomDemo,
    },
  };
</script>
