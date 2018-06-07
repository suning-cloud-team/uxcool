<template>
  <div class="demo">
    <h4>render </h4>
    <!-- <ux-transfer :data-source="dataSource"
                 :render-item="renderContent"
                 :target-keys="targetKeys" /> -->

    <h4>render slot</h4>
    <p>当使用`slot render`时由于 `slot-scope`只能接受一个参数,所以`direction`参数挂载在$$direction属性上</p>
    <ux-transfer :data-source="dataSource"
                 :target-keys="targetKeys">
      <template slot="renderItem"
                slot-scope="{key, description, label, $$direction:direction}">
        <span v-if="key%4 === 0"
              style="color:skyblue ">
          {{ direction }}-{{ description }}- {{ label }}
        </span>
        <template v-else>
          {{ description }}-{{ label }}
        </template>
      </template>
    </ux-transfer>
  </div>
</template>

<script>
  import { Transfer } from '@suning/uxcool';

  function mockData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        title: `title-${i}`,
        label: `label-${i}`,
        description: `description content ${i}`,
        // disabled: i % 3 === 0,
    }));
  }
  export default {
    components: {
      UxTransfer: Transfer,
    },
    data() {
      return {
        dataSource: mockData(),
        targetKeys: [0, 2, 5],
      };
    },
    methods: {
      renderContent(item) {
        return item.key % 3 === 0 ? (
          <span style="color:red">{`${item.label}-${item.description}`}</span>
          ) : (
            `${item.label}-${item.description}`
        );
      },
    },
  };
</script>
