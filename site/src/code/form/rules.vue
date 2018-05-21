<template>
  <div>
    <ux-form>
      <ux-form-item label="alpha:en">
        <ux-field-decorator name="Field1"
                            rules="alpha:en">
          <ux-input v-model="input1" />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="in:1,2,3,4">
        <ux-field-decorator name="Field2"
                            rules="in:1,2,3,4">
          <ux-input v-model="input2" />
        </ux-field-decorator>
      </ux-form-item>
      <ux-form-item label="between:10,20">
        <ux-field-decorator name="Field3"
                            rules="between:10,20">
          <ux-input v-model="input3" />
        </ux-field-decorator>
      </ux-form-item>
    </ux-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
      };
    },
  };
</script>
