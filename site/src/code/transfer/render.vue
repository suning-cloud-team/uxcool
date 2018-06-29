<template>
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
</template>

<script>
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
    data() {
      return {
        dataSource: mockData(),
        targetKeys: [0, 2, 5],
      };
    },
  };
</script>
