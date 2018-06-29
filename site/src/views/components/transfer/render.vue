<template>
  <ux-demo :height="200"
           title="自定义内容渲染">
    <div slot="demo">
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
    <div slot="desc">
      当使用`slot render`时由于 `slot-scope`只能接受一个参数,所以`direction`参数挂载在$$direction属性上
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/transfer/render.vue';

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
        code,
        dataSource: mockData(),
        targetKeys: [0, 2, 5],
      };
    },
  };
</script>
