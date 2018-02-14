<template>
  <ux-demo title="顺序" anchor="order">
    <div slot="demo">
      <ux-row class="demo-row"
              flex>
        <ux-col :span="6"
                :order="4"
                class="demo-col">1: order-4</ux-col>
        <ux-col :span="6"
                :order="3"
                class="demo-col light">2: order-3</ux-col>
        <ux-col :span="6"
                :order="2"
                class="demo-col">3: order-2</ux-col>
        <ux-col :span="6"
                :order="1"
                class="demo-col light">4: order-1</ux-col>
      </ux-row>
    </div>
    <div slot="desc">
      在Flex布局中，使用
      <code>order</code>指定顺序可以改变栅格顺序。
    </div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
import code from '@/code/grid/order';

export default {
  data() {
    return {
      code,
    };
  },
};
</script>
