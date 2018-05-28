<template>
  <div>
    <ux-checkbox-group v-model="checked">
      <ux-row>
        <ux-col :span="6"
                v-for="(v, i) in opts"
                :key="i">
          <ux-checkbox :value="v">{{ v }}</ux-checkbox>
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
