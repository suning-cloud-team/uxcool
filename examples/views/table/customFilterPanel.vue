<template>
  <div class="demo">
    <h6> custom filter panel</h6>
    <p>filterDropdown, filterDropdownVisible ,onFilterDropdownVisibleChange需配合使用</p>
    <ux-table :theme="theme"
              :columns="columns"
              :scroll="{x:'150%'}"
              v-model="data" />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { Divider, Table as UxTable, Icon } from '@cloud-sn/uxcool';

  function getCols() {
    // eslint-disable-next-line
    const { columnFilter, onSearch, onInputChange, onFilterDropdownVisible } = this;
    return [
      {
        fixed: 'left',
        width: 150,
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe',
          },
          {
            text: 'Jim',
            value: 'Jim',
          },
          {
            text: 'John',
            value: 'John',
          },
        ],
        // `h` 不可少
        // eslint-disable-next-line
        filterDropdown(h) {
          return (
            <div class="custom-filter-dropdown">
              <input
                type="text"
                class="ux-input"
                on-input={(e) => {
                  onInputChange(e, 'name');
                }}
              />
              <button
                class="ux-btn ux-btn-primary"
                on-click={(e) => {
                  onSearch(e, 'name');
                }}
              >
                搜索
              </button>
            </div>
          );
        },
        // `h` 不可少
        // eslint-disable-next-line
        filterIcon(h) {
          return <Icon type="info_circle_o" />;
        },
        filterDropdownVisible: columnFilter.name.filterDropdownVisible,
        filteredValue: columnFilter.name.searchVal,
        onFilterDropdownVisibleChange(visible) {
          onFilterDropdownVisible('name', visible);
        },
      },
      {
        key: 'age',
        width: 200,
        title: 'Age',
        dataIndex: 'age',
      },
      {
        key: 'addr',
        width: 200,
        title: 'Addr',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        filterDropdownVisible: columnFilter.addr.filterDropdownVisible,
        onFilterDropdownVisibleChange(visible) {
          onFilterDropdownVisible('addr', visible);
        },
        onFilter(v, record) {
          return record.address.includes(v);
        },
        onCell(record) {
          return {
            style: {
              color: record.address.length > 30 ? 'red' : 'green',
            },
            className: 'aa',
          };
        },
      },
    ];
  }

  function getData() {
    return [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
      {
        key: '4',
        name: 'Jim User',
        age: 99,
        address:
          'Sidney No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake ParkLondon No. 1 Lake Park',
      },
    ];
  }

  export default {
    components: {
      UxTable,
      Divider,
      Icon,
    },
    data() {
      return {
        columns: [],
        originData: [],
        data: [],
        columnFilter: {
          name: {
            searchVal: '',
            filterDropdownVisible: true,
          },
          addr: {
            filterDropdownVisible: true,
          },
        },
      };
    },
    computed: mapState(['theme']),
    created() {
      this.columns = this.getCols();

      this.originData = getData.call(this);
      this.data = this.originData;
    },
    methods: {
      getCols,
      setFilterDropdownVisible(key, visible) {
        const { columnFilter } = this;
        columnFilter[key].filterDropdownVisible = visible;
        // important
        this.columns = this.getCols();
      },
      onFilterDropdownVisible(key, visible) {
        this.setFilterDropdownVisible(key, visible);
      },
      onInputChange(e, key) {
        const { columnFilter } = this;
        const { value } = e.target;
        columnFilter[key].searchVal = value;
      },
      onSearch(e, key) {
        const { columnFilter, setFilterDropdownVisible, originData } = this;
        const { searchVal } = columnFilter[key];
        setFilterDropdownVisible(key, false);
        const reg = new RegExp(searchVal, 'gi');
        this.data = originData.filter(v => (v[key].match ? !!v[key].match(reg) : false)).map(v => ({
          ...v,
          [key]: searchVal ? (
            <span>
              {v[key]
                .split(reg)
                .map((rv, i) => (i > 0 ? [<span class="highlight">{searchVal}</span>, rv] : rv))}
            </span>
            ) : (
              v[key]
            ),
        }));
      },
    },
  };
</script>

<style>
  .custom-filter-dropdown {
    padding: 8px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  .custom-filter-dropdown input {
    width: 130px;
    margin-right: 8px;
    vertical-align: middle;
  }

  .highlight {
    color: #f50;
  }
</style>
