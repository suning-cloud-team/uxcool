<template>
  <div>
    <div class="demo">
      <h4>String bug</h4>
      <avatar size="large">
        <span :style="style ">{{ name }}</span>
      </avatar>
      <h4>custome cmp</h4>
      <avatar>
        <custom-cmp :name="name" />
      </avatar>
    </div>
  </div>
</template>


<script>
  import { Avatar, Button } from '@cloud-sn/uxcool';

  export default {
    components: {
      Avatar,
      UxButton: Button,
      CustomCmp: {
        props: {
          name: {
            type: String,
            default: '',
          },
        },
        render() {
          return <span role="custom">{this.name}</span>;
        },
      },
    },
    data() {
      return {
        idx: 0,
        name: 'string',
        style: { color: 'red' },
      };
    },
    created() {
      setTimeout(() => {
        this.style = { color: 'green' };
        this.name = 'abcabcabc';
      }, 1500);
    },
  };
</script>
