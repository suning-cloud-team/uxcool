<template>
  <ux-demo title="布局"
           :height="200">
    <div slot="demo">
      <ux-checkbox-group>
        <ux-row>
          <ux-col :span="6"
                  v-for="(v, i) in opts"
                  :key="i">
            <ux-checkbox :vlaue="v">{{ v }}</ux-checkbox>
          </ux-col>
        </ux-row>
      </ux-checkbox-group>
    </div>
    <div slot="desc">
      <code>Checkbox Group</code> 结合
      <code>Grid</code> 组件,实现灵活布局
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/checkbox/layout.vue';

  export default {
    data() {
      return {
        code,
        opts: ['A', 'B', 'C', 'D', 'E', 'F'],
        checked: [],
      };
    },
    created() {
      this.checked = [this.opts[0]];
    },
  };
</script>
