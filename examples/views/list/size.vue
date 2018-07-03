<template>
  <div class="demo">
    <h4>size</h4>
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
</template>


<script>
  import { List } from '@suning/uxcool';

  export default {
    components: {
      UxList: List,
      UxListItem: List.Item,
      UxListItemMeta: List.Item.Meta,
    },

    data() {
      return {
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
