<template>
  <div>
    <div class="demo">
      <popconfirm placement="bottomRight"
                  title="Are you sure delete this task?">
        Delete
      </popconfirm>
      <popconfirm disabled
                  title="Are you sure delete this task?">
        Delete
      </popconfirm>
    </div>
    <custom-demo />
    <slot-demo />
  </div>
</template>


<script>
  import { Popconfirm } from '@suning/uxcool';
  import CustomDemo from './custom.vue';
  import SlotDemo from './slot.vue';

  export default {
    components: {
      Popconfirm,
      CustomDemo,
      SlotDemo,
    },
  };
</script>
