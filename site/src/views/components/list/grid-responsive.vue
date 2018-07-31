<template>
  <ux-demo :height="200"
           title="栅格列表(响应式)">
    <div slot="demo">
      <ux-list :data-source="descs"
               :grid="grid"
               item-layout="vertical">
        <ux-list-item slot="renderItem"
                      slot-scope="{item}">
          <span slot="actions">edit</span>
          <span slot="actions">more</span>
          <ux-list-item-meta>
            <ux-avatar slot="avatar">A</ux-avatar>
            <span slot="title">{{ item.title }}</span>
            <span slot="desc">{{ item.desc }}</span>
          </ux-list-item-meta>
        </ux-list-item>
      </ux-list>
    </div>
    <div slot="desc">
      可通过设置
      <code>grid</code>参数中的xs,sm,md,lg,xl,xxl属性,获得响应式效果
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/list/grid-responsive.vue';

  export default {
    data() {
      return {
        code,
        descs: [
          {
            title: 'title1',
            desc: 'Racing car sprays burning fuel into crowd',
          },
          {
            title: 'title2',
            desc: 'Japanese princess to wed commoner.',
          },
          {
            title: 'title3',
            desc: 'Australian walks 100km after outback crash.',
          },
          {
            title: 'title4',
            desc: 'Man charged over missing wedding girl.',
          },
          {
            title: 'title5',
            desc: 'Los Angeles battles huge wildfires.',
          },
          {
            title: 'title6',
            desc: 'Los Angeles battles huge wildfires.Racing car sprays burning fuel into crowd.',
          },
          {
            title: 'title7',
            desc: 'Los Angeles battles huge wildfires.',
          },
        ],
        grid: {
          gutter: 8,
          column: 4,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 5,
          xl: 3,
        },
      };
    },
  };
</script>
