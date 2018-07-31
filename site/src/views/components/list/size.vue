<template>
  <ux-demo :height="200"
           title="大小">
    <div slot="demo">
      <h6>large</h6>
      <ux-list :data-source="descs"
               size="large"
               bordered>
        <template slot="renderItem"
                  slot-scope="{item}">
          <ux-list-item>{{ item }}</ux-list-item>
        </template>
      </ux-list>
      <h6>default</h6>
      <ux-list :data-source="descs"
               bordered>
        <template slot="renderItem"
                  slot-scope="{item}">
          <ux-list-item>{{ item }}</ux-list-item>
        </template>
      </ux-list>
      <h6>small</h6>
      <ux-list :data-source="descs"
               size="small"
               bordered>
        <template slot="renderItem"
                  slot-scope="{item}">
          <ux-list-item>{{ item }}</ux-list-item>
        </template>
      </ux-list>
    </div>
    <div slot="desc">
      列表通过
      <code>size</code>属性,设置大,中,小三种尺寸
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/list/size.vue';

  export default {
    data() {
      return {
        code,
        descs: [
          'Racing car sprays burning fuel into crowd.',
          'Japanese princess to wed commoner.',
          'Australian walks 100km after outback crash.',
          'Man charged over missing wedding girl.',
          'Los Angeles battles huge wildfires.',
        ],
      };
    },
  };
</script>
