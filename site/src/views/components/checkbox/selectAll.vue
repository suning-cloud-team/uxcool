<template>
  <ux-demo title="全选"
           :height="200">
    <div slot="demo">
      <ux-checkbox v-model="indeterminateChecked"
                   :indeterminate="indeterminate"
                   @change="onCheckedAll"
                   label="checked All" />
      <ux-checkbox-group v-model="ieCheckedList"
                         :options="opts2"
                         @change="onCheckedOpts2" />
    </div>
    <div slot="desc">
      通过设置
      <code>indeterminate</code>属性可实现半选效果
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/checkbox/selectAll.vue';

  export default {
    data() {
      return {
        code,
        ieCheckedList: [],
        indeterminate: false,
        indeterminateChecked: false,
        opts2: ['aa', 'cc', 'dd', 'ee'],
      };
    },
    methods: {
      onCheckedAll(e) {
        this.ieCheckedList = e.target.checked ? this.opts2 : [];
        this.indeterminate = false;
        this.indeterminateChecked = e.target.checked;
      },
      onCheckedOpts2(checkedList) {
        this.indeterminate = checkedList.length > 0 && checkedList.length < this.opts2.length;
        this.indeterminateChecked = checkedList.length === this.opts2.length;
      },
    },
  };
</script>
