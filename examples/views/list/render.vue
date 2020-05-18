<template>
  <div class="demo">
    <h4>normal</h4>
    <ux-list :data-source="descs"
             :render-item="renderItem" />

  </div>
</template>


<script>
  import { List, Avatar } from '@cloud-sn/uxcool';

  export default {
    components: {
      UxList: List,
      UxListItem: List.Item,
      UxListItemMeta: List.Item.Meta,
      UxAvatar: Avatar,
    },

    data() {
      return {
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
