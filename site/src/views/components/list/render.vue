<template>
  <ux-demo :height="200"
           title="自定义渲染">
    <div slot="demo">
      <ux-list :data-source="descs"
               :render-item="renderItem" />
    </div>
    <div slot="desc">
      通过
      <code>render-item</code>函数自定义渲染列表元素
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/list/render.vue';

  export default {
    data() {
      return {
        code,
        descs: [
          {
            title: 'title1',
            desc: 'Racing car sprays burning fuel into crowd.',
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
            title: 'title4',
            desc: 'Los Angeles battles huge wildfires.',
          },
        ],
      };
    },
    methods: {
      renderItem({ item }) {
        return (
          <ux-list-item actions={[<a>edit</a>, <a>more</a>]}>
            <ux-list-item-meta>
              <ux-avatar slot="avatar">A</ux-avatar>
              <span slot="title">{item.title}</span>
              <span slot="desc">{item.desc}</span>
            </ux-list-item-meta>
            <div>extra</div>
          </ux-list-item>
        );
      },
    },
  };
</script>
