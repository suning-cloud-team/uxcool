<template>
  <div>
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
</template>

<script>
  export default {
    data() {
      return {
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
