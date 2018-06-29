<template>
  <ux-demo :height="200"
           title="事件">
    <div slot="demo">
      <ux-affix :offset-bottom="30"
                @change="onChange">
        <ux-button>event</ux-button>
      </ux-affix>
    </div>
    <div slot="desc">
      浮动变化时触发事件
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/affix/event.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    methods: {
      onChange(flag) {
        console.log('是否浮动', flag);
      },
    },
  };
</script>

