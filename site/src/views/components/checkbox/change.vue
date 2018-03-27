<template>
  <ux-demo title="受控Checkbox"
           :height="200">
    <div slot="demo">
      <ux-checkbox v-model="cChecked"
                   :disabled="cDisabled">
        <span>
          {{ cChecked ? 'checked' : 'unChecked' }}-{{ cDisabled ? 'disabled' : 'unDisabled' }}
        </span>
      </ux-checkbox>
      <br>
      <ux-button @click="changeCChecked">
        {{ cChecked ? 'unChecked' : 'checked' }}
      </ux-button>
      <ux-button @click="changeCDisabled">
        {{ cDisabled ? 'unDisabled' : 'disabled' }}
      </ux-button>
    </div>
    <div slot="desc">
      受控Checkbox
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/checkbox/change.vue';

  export default {
    data() {
      return {
        code,
        cChecked: false,
        cDisabled: false,
      };
    },
    methods: {
      changeCChecked() {
        this.cChecked = !this.cChecked;
      },
      changeCDisabled() {
        this.cDisabled = !this.cDisabled;
      },
    },
  };
</script>
