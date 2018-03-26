<template>
  <div>
    <ux-checkbox v-model="indeterminateChecked"
                 :indeterminate="indeterminate"
                 @change="onCheckedAll"
                 label="checked All" />
    <ux-checkbox-group v-model="ieCheckedList"
                       :options="opts2"
                       @change="onCheckedOpts2" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
