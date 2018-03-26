<template>
  <div>
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
</template>

<script>
  export default {
    data() {
      return {
        opts: ['A', 'B', 'C', 'D', 'E', 'F'],
        checked: [],
      };
    },
    created() {
      this.checked = [this.opts[0]];
    },
  };
</script>
