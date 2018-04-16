<template>
  <ux-demo title="垂直"
           :height="200">
    <div slot="demo"
         class="clearfix">
      <div class="demo-vertical">
        <ux-slider vertical
                   :value="30" />
      </div>
      <div class="demo-vertical">
        <ux-slider range
                   vertical
                   :value="[20,30,70]" />
      </div>

      <div class="demo-vertical">
        <ux-slider range
                   vertical
                   :marks="marks"
                   :value="[20,30,70]" />
      </div>
    </div>
    <div slot="desc">
      垂直的
      <code>Slider</code>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/slider/vertical.vue';

  function getMarks() {
    // 不可少
    // eslint-disable-next-line
    const h = this.$createElement;
    return {
      0: '0°C',
      26: '26°C',
      37: '37°C',
      100: {
        style: {
          color: '#f50',
        },
        // 受限于vue的节点唯一原则,此处只支持原生html标签
        label: <strong>100°C</strong>,
      },
    };
  }
  export default {
    data() {
      return {
        code,
        marks: {},
      };
    },
    created() {
      this.marks = getMarks.call(this);
    },
  };
</script>
<style scoped>
  .demo-vertical {
    float: left;
    width: 150px;
    height: 300px;
  }
</style>
