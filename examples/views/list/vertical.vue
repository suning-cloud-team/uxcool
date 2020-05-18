<template>
  <div class="demo">
    <h4>vertical</h4>
    <ux-list :data-source="descs"
             :pagination="pagination"
             item-layout="vertical"
             footer="this is vertical footer"
             bordered>
      <ux-list-item slot="renderItem"
                    slot-scope="{item,index}">
        <span slot="actions">
          <ux-icon type="star_o"
                   style="margin-right:10px" />11
        </span>
        <span slot="actions">
          <ux-icon type="praise_o"
                   style="margin-right:10px" />121
        </span>
        <span slot="actions">
          <ux-icon type="Information_o"
                   style="margin-right:10px" />22
        </span>
        <img slot="extra"
             style="width:80%"
             src="//image5.suning.cn/uimg/cms/img/153077352410732211.jpg">
        <ux-list-item-meta>
          <ux-avatar slot="avatar">{{ item.avatar }} </ux-avatar>
          <a slot="title"
             :href="item.href"
             target="_blank">
            {{ item.title }}
          </a>
          <span slot="desc">{{ item.desc }}</span>
        </ux-list-item-meta>
        {{ item.content }}
      </ux-list-item>
    </ux-list>
  </div>
</template>


<script>
  import { List, Avatar, Icon } from '@cloud-sn/uxcool';

  function mockData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((_, i) => ({
        href: 'http://www.suning.com',
        title: 'list title part'.repeat(cnt + 1 - i),
        avatar: 'A',
        desc: 'This is Desc'.repeat(i),
        content: 'We supply a series of design principles '.repeat(i),
    }));
  }
  export default {
    components: {
      UxList: List,
      UxListItem: List.Item,
      UxListItemMeta: List.Item.Meta,
      UxAvatar: Avatar,
      UxIcon: Icon,
    },

    data() {
      return {
        pagination: {
          pageSize: 3,
        },
        descs: mockData(33),
      };
    },
  };
</script>
