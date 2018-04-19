<template>
  <div class="software">
    <div class="add">
      <div class="wrap"
           @click="parentVisible=true">
        <ux-icon type="add"></ux-icon>
        <span>新增软件类型基线</span>
      </div>
    </div>
    <div class="table-wrap">
      <ux-table bordered
                size="middle"
                :columns="columns"
                v-model="tableData"
                :pagination="pagination"></ux-table>
    </div>
    <ux-modal v-model="parentVisible"
              width="1000px"
              :dialog-style="{top:'10px'}"
              title="新建通道"
              ok-text="保存">
      <div ref="modalRef">
        <div class="sw-name list-item">
          <label>软件名称&nbsp;&nbsp;</label>
          <ux-select class="sw-select"
                     :get-container="getContainer"
                     allow-clear>
            <ux-option value="A">A</ux-option>
            <ux-option value="B">B</ux-option>
            <ux-option value="C">C</ux-option>
          </ux-select>
          <span class="add"
                @click="nestVisible=true">
            <ux-icon type="add"></ux-icon>添加</span>
        </div>
        <ux-modal v-model="nestVisible"
                  :ok-cancel="false"
                  ok-text="保存">
          <span slot="title"
                style="">合约提交</span>
          <div class="baseline-name list-item">
            <label>输入软件名称&nbsp;&nbsp;</label>
            <input type="text">
          </div>
        </ux-modal>
        <div class="baseline-name list-item">
          <label>软件类型基线名称&nbsp;&nbsp;</label>
          <input type="text">
        </div>
        <div class="index-list list-item">
          <label>指标参数列表&nbsp;&nbsp;</label>
          <ux-select class="sw-select"
                     allow-clear
                     :get-container="getContainer"
                     placeholder='选择软件类型基线模板'>
            <ux-option value="A">A</ux-option>
            <ux-option value="B">B</ux-option>
            <ux-option value="C">C</ux-option>
          </ux-select>
        </div>
        <ux-table bordered
                  size="middle"
                  :columns="columnsAdd"
                  v-model="tableDataAdd"></ux-table>
        <div class="add-company">
          <ux-icon type="add"></ux-icon>
          <span>添加公司</span>
        </div>
      </div>
    </ux-modal>
    <ux-modal v-model="detailVisible"
              width="900px"
              :dialog-style="{'top':'40px'}"
              title="主机组基线详情-WFC_SIT_JBOSS-Standalone_12924"
              :ok-cancel="false"
              ok-text="关闭">
      <div class="detail-item">
        <label style="padding-left: 85px;">软件&nbsp;&nbsp;</label>
        <span style="color: #000">WildFly standalone 8.1.0.Final(OracleJDK)</span>
      </div>
      <div class="detail-item">
        <label>软件类型基线名称&nbsp;&nbsp;</label>
        <span style="color: #000">WildFly standalone 8.1.0.Final(OracleJDK)-baseV1</span>
      </div>
      <div class="detail-item">
        <label style="padding-left: 28px;">指标参数列表</label>
      </div>
      <ux-table bordered
                size="middle"
                :columns="columnsDetail"
                v-model="tableDataDetail"
                :pagination="pagination"></ux-table>
    </ux-modal>
    <ux-modal v-model="modifyVisible"
              width="900px"
              :ok-cancel="false"
              title="主机组基线详情-WFC_SIT_JBOSS-Standalone_12924"
              ok-text="保存">
      <div class="detail-item">
        <label style="padding-left: 85px;">软件&nbsp;&nbsp;</label>
        <span style="color: #000">WildFly standalone 8.1.0.Final(OracleJDK)</span>
      </div>
      <div class="detail-item">
        <label>软件类型基线名称&nbsp;&nbsp;</label>
        <span style="color: #000">WildFly standalone 8.1.0.Final(OracleJDK)-baseV1</span>
      </div>
      <div class="detail-item">
        <label style="padding-left: 28px;">指标参数列表</label>
      </div>
      <ux-table bordered
                size="middle"
                :columns="columnsAdd"
                v-model="tableDataAdd"></ux-table>
      <div class="add-company">
        <ux-icon type="add"></ux-icon>
        <span>添加公司</span>
      </div>
    </ux-modal>
    <ux-modal v-model="removeVisible"
              title="删除"
              ok-text='删除'>
      <p>确定删除软件类型基线---xxxx？</p>
    </ux-modal>
  </div>
</template>

<script>
  function getCols() {
    const { onDetail, onModify, onRemove } = this;
    return [
      {
        key: 'order',
        title: '序号',
        dataIndex: 'order',
        align: 'center',
        width: 50,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'name',
        title: '基线名称',
        dataIndex: 'name',
        align: 'center',
        width: 200,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'swName',
        title: '软件名称',
        dataIndex: 'swName',
        align: 'center',
        width: 200,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        width: 100,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        title: '操作',
        align: 'center',
        width: 100,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
        cellRender(_, record) {
          return record.status === '已启用' ? (
            <a
              className="operation"
              on-click={() => {
                onDetail();
              }}
            >
              详情
            </a>
            ) : (
            <span>
              <a
                className="operation"
                on-click={() => {
                  onModify();
                }}
              >
                修改
              </a>
              <ux-divider type="vertical" />
              <a
                className="operation"
                on-click={() => {
                  onRemove();
                }}
              >
                删除
              </a>
              <ux-divider type="vertical" />
              <a className="operation">启用</a>
            </span>
          );
        },
      },
    ];
  }
  function getData() {
    return [
      {
        key: '1',
        order: '1',
        name: 'WildlyStandaloneOpenJDK1.7-baseV1',
        swName: 'WildFly standalone 8.1.0.Final(OpenJDK)',
        status: '已启用',
      },
      {
        key: '2',
        order: '2',
        name: 'WildlyStandaloneOpenJDK1.7-baseV1',
        swName: 'WildFly standalone 8.1.0.Final(OpenJDK)',
        status: '已启用',
      },
      {
        key: '3',
        order: '3',
        name: 'WildlyStandaloneOpenJDK1.7-baseV1',
        swName: 'WildFly standalone 8.1.0.Final(OpenJDK)',
        status: '已启用',
      },
      {
        key: '4',
        order: '4',
        name: 'WildlyStandaloneOpenJDK1.7-baseV1',
        swName: 'WildFly standalone 8.1.0.Final(OpenJDK)',
        status: '未启用',
      },
      {
        key: '5',
        order: '5',
        name: 'WildlyStandaloneOpenJDK1.7-baseV1',
        swName: 'WildFly standalone 8.1.0.Final(OpenJDK)',
        status: '未启用',
      },
    ];
  }
  function getColsAdd() {
    return [
      {
        key: 'order',
        title: '序号',
        dataIndex: 'order',
        align: 'center',
        width: 20,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'module',
        title: '模块',
        dataIndex: 'module',
        align: 'center',
        width: 50,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'indexItem',
        title: '指标项',
        dataIndex: 'indexItem',
        align: 'center',
        width: 70,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'standard',
        title: '标准值(可为空)',
        dataIndex: 'standard',
        align: 'center',
        width: 60,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        title: '扫描方式',
        align: 'center',
        width: 50,
        cellRender(_, record) {
          return (
            <ux-select class="select" placeholder="选择扫描方式" allow-clear>
              <ux-option value="A">A</ux-option>
              <ux-option value="B">B</ux-option>
              <ux-option value="C">C</ux-option>
            </ux-select>
          );
        },
      },
      {
        title: '修正方式',
        align: 'center',
        width: 50,
        cellRender(_, record) {
          return (
            <ux-select class="select" placeholder="选择修正方式" allow-clear>
              <ux-option value="A">A</ux-option>
              <ux-option value="B">B</ux-option>
              <ux-option value="C">C</ux-option>
            </ux-select>
          );
        },
      },
      {
        title: '操作',
        align: 'center',
        width: 20,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
        cellRender(_, record) {
          return <ux-icon type="minus_circle_o" class="minus" />;
        },
      },
    ];
  }
  function getDataAdd() {
    return [
      {
        key: 'line1',
        order: '1',
        module: 'datasource',
        indexItem: 'driver type',
        standard: '',
      },
      {
        key: 'line2',
        order: '2',
        module: 'datasource',
        indexItem: 'idle-timeout-minutes',
        standard: 'idle-timeout-minutes',
      },
    ];
  }
  function getColsDetail() {
    return [
      {
        key: 'order',
        title: '序号',
        dataIndex: 'order',
        align: 'center',
        width: 20,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'module',
        title: '模块',
        dataIndex: 'module',
        align: 'center',
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'indexItem',
        title: '指标项',
        dataIndex: 'indexItem',
        align: 'center',
        width: 70,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'standard',
        title: '标准值(可为空)',
        dataIndex: 'standard',
        align: 'center',
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'scan',
        title: '扫描方式',
        dataIndex: 'scan',
        align: 'center',
        width: 50,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
      {
        key: 'amend',
        title: '修正方式',
        dataIndex: 'amend',
        align: 'center',
        width: 50,
        onCell(_, record) {
          return {
            className: 'cell',
          };
        },
      },
    ];
  }
  function getDataDetail() {
    return [
      {
        key: 'line1',
        order: '1',
        module: 'datasource',
        indexItem: 'driver type',
        standard: '',
        scan: '已启用',
        amend: '脚本1',
      },
      {
        key: 'line2',
        order: '2',
        module: 'datasource',
        indexItem: 'idle-timeout-minutes',
        standard: 'idle-timeout-minutes',
        scan: '已启用',
        amend: '脚本1',
      },
      {
        key: 'line3',
        order: '3',
        module: 'datasource',
        indexItem: 'driver type',
        standard: '',
        scan: '已启用',
        amend: '脚本1',
      },
      {
        key: 'line4',
        order: '4',
        module: 'datasource',
        indexItem: 'idle-timeout-minutes',
        standard: 'idle-timeout-minutes',
        scan: '已启用',
        amend: '脚本1',
      },
      {
        key: 'line5',
        order: '5',
        module: 'datasource',
        indexItem: 'idle-timeout-minutes',
        standard: 'idle-timeout-minutes',
        scan: '已启用',
        amend: '脚本1',
      },
    ];
  }
  export default {
    created() {
      this.columns = getCols.call(this);
      this.tableData = getData.call(this);
      this.columnsAdd = getColsAdd.call(this);
      this.tableDataAdd = getDataAdd.call(this);
      this.columnsDetail = getColsDetail.call(this);
      this.tableDataDetail = getDataDetail.call(this);
    },
    data() {
      return {
        columns: [],
        tableData: [],
        columnsAdd: [],
        tableDataAdd: [],
        columnsDetail: [],
        tableDataDetail: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          showBeforeTotal(total, pageSize, totalPage, pageNo, range) {
            return `共${total}条, 每页显示${pageSize}条, 1-${pageSize} / ${total}条, 共${totalPage}页`;
          },
        },
        parentVisible: false,
        nestVisible: false,
        detailVisible: false,
        modifyVisible: false,
        removeVisible: false,
      };
    },
    methods: {
      getContainer() {
        return this.$refs.modalRef;
      },
      onDetail() {
        this.detailVisible = true;
      },
      onModify() {
        this.modifyVisible = true;
      },
      onRemove() {
        this.removeVisible = true;
      },
    },
  };
</script>

<style>
  .software {
    font-size: var(--h4);
    letter-spacing: 0;
    line-height: var(--h1);
  }
  .software .table-wrap {
    margin: auto 20px;
  }
  .software .add {
    color: #108ee9;
    cursor: pointer;
  }
  .software .add .wrap {
    float: right;
    margin: auto 30px 10px auto;
  }
  .cell {
    text-align: center;
    color: #000;
  }
  .operation {
    color: #108ee9;
  }
  .minus {
    background: #ff5555;
    color: #fff;
    border-radius: 50%;
  }
  .ux-modal .select {
    width: 100%;
  }

  .ux-modal .list-item {
    margin-bottom: 10px;
  }
  .ux-modal .sw-select {
    width: 300px;
  }
  .ux-modal .sw-name {
    padding-left: 55px;
  }
  .ux-modal .index-list {
    padding-left: 27px;
    margin-bottom: 20px;
  }
  .ux-modal .baseline-name input {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 31px;
    width: 300px;
  }
  .ux-modal .add {
    position: relative;
    left: 10px;
    color: #108ee9;
    cursor: pointer;
  }
  .ux-modal .add-company {
    color: #108ee9;
    cursor: pointer;
    margin-bottom: 100px;
  }
  .ux-modal .detail-item {
    margin-bottom: 10px;
  }
</style>
