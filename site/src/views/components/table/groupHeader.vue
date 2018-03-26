<template>
  <ux-demo title="表头分组"
           vertical>
    <div slot="demo">
      <ux-table :columns="columns"
                v-model="data"
                bordered
                :pagination="true"
                :scroll="{x: '130%', y: 250}" />
    </div>
    <div slot="desc">
      <p>
        多级header时,只支持最内层元素添加
        <code>filter</code>功能,
        <code>sort</code>各层级都支持;
        <br>通过
        <code>column[n].children</code> 嵌套头部;
      </p>
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/table/groupHeader.vue';

  function getCols() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 100,
        fixed: 'left',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'John',
            value: 'John',
          },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
      },
      {
        title: 'Other',
        children: [
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 200,
            sorter: (a, b) => a.age - b.age,
          },
          {
            title: 'Address',
            children: [
              {
                title: 'Street',
                dataIndex: 'street',
                key: 'street',
                width: 200,
              },
              {
                title: 'Block',
                children: [
                  {
                    title: 'Building',
                    dataIndex: 'building',
                    key: 'building',
                    width: 100,
                  },
                  {
                    title: 'Door No.',
                    dataIndex: 'number',
                    key: 'number',
                    width: 100,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: 'Company',
        children: [
          {
            key: 'companyAddress',
            title: 'Company Address',
            dataIndex: 'companyAddress',
          },
          {
            key: 'companyName',
            title: 'Company Name',
            dataIndex: 'companyName',
          },
        ],
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 60,
        fixed: 'right',
      },
    ];
  }

  function getData(cnt = 10) {
    return Array(cnt)
      .fill(0)
      .map((v, i) => ({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      }));
  }

  export default {
    data() {
      return {
        code,
        columns: [],
        data: [],
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    created() {
      this.columns = getCols.call(this);
      this.data = getData.call(this, 100);
    },
  };
</script>
