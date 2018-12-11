<template>
  <div class="demo">
    <h4>certain category</h4>
    value: {{ value }}
    <ux-auto-complete v-model="value"
                      :data-source="dataSource"
                      :dropdown-match-select-width="false"
                      :popup-style="popupStyle"
                      :lazy="lazy"
                      :filter-option="filterOption"
                      :render-input-element="getInputElement"
                      size="large"
                      allow-clear
                      popup-class="certain-category-wrapper"
                      @change="onChange">
      <template slot="renderGroupLabel"
                slot-scope="{label}">
        <span>{{ label }}</span>
        <a href="###"
           style="float:right">更多</a>
      </template>
      <template slot="renderLabel"
                slot-scope="{title,value, count}">
        <div v-if="value === 'all'"
             style="text-align:center;">
          <a href="###">查询所有结果</a>
        </div>
        <div v-else>
          <span>{{ title }}</span>
          <span class="certain-search-item-count">{{ count }} 人 关注</span>
        </div>

      </template>
    </ux-auto-complete>
  </div>
</template>


<script>
  import { AutoComplete, Select, Input } from '@suning/uxcool';

  export default {
    components: {
      UxAutoComplete: AutoComplete,
      UxOption: Select.Option,
      UxSearchInput: Input.Search,
    },
    data() {
      return {
        lazy: {
          remain: 10,
        },
        popupStyle: { minWidth: '300px' },
        value: '',
        dataSource: [
          {
            label: '话题',
            children: [
              {
                value: '话题A',
                title: '话题A',
                count: 1200,
              },
              {
                value: '话题B',
                title: '话题B',
                count: 200,
              },
            ],
          },

          {
            label: '问题',
            children: [
              {
                value: '问题A',
                title: '问题A',
                count: 21200,
              },
              {
                value: '问题B',
                title: '问题B',
                count: 1200,
              },
              {
                value: '问题C',
                title: '问题C',
                count: 200,
              },
            ],
          },
          {
            label: '文章',
            children: [
              {
                value: '文章A',
                title: '文章A',
                count: 12200,
              },
            ],
          },
          {
            value: 'all',
            disabled: true,
          },
        ],
      };
    },
    methods: {
      onChange(...args) {
        console.log(this.$refs);
        console.log('onChange', ...args);
      },
      filterOption(value, option) {
        return option.value.indexOf(value) > -1;
      },
      getInputElement() {
        return <ux-search-input ref="abc" />;
      },
    },
  };
</script>

<style >
  .certain-category-wrapper .ux-select-dropdown-menu-item-group {
    margin-bottom: -1px;
    border-bottom: 1px solid #f6f6f6;
  }
  .certain-search-item-count {
    float: right;
    color: #999;
    margin-right: 16px;
  }
</style>
