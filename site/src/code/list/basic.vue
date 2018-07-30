<template>
  <ux-list :data-source="descs">
    <template slot="renderItem"
              slot-scope="{item}">
      <ux-list-item>
        <span slot="actions">edit</span>
        <span slot="actions">more</span>
        <ux-list-item-meta>
          <ux-avatar slot="avatar">A</ux-avatar>
          <span slot="title">{{ item.title }}</span>
          <span slot="desc">{{ item.desc }}</span>
        </ux-list-item-meta>
        <div>extra</div>
      </ux-list-item>

    </template>
  </ux-list>
</template>

<script>
  export default {
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
  };
</script>
