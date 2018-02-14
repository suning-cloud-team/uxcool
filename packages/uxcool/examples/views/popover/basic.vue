<template>
  <div>
    <div>
      <ux-popover trigger="hover"
                  content="hover激活">
        <button class="ux-btn">
          hover激活
        </button>
      </ux-popover>
      <ux-popover trigger="click"
                  content="click激活">
        <button class="ux-btn">
          click激活
        </button>
      </ux-popover>
      <ux-popover trigger="focus"
                  content="focus激活">
        <button class="ux-btn">
          focus激活
        </button>
      </ux-popover>
    </div>
    <div class="demo">
      <ux-popover title="标题"
                  content="测试内容">
        popover when mouse enter
      </ux-popover>
    </div>
    <div class="demo">
      <ux-popover content="无标题">
        无标题
      </ux-popover>
    </div>

    <div class="demo">
      <ux-popover :content="innerContent">
        自定义标题
        <span slot="title"
              style="color:red">标题红</span>
      </ux-popover>
    </div>

    <div class="demo">
      <ux-popover content="自定义标题"
                  :popover-style="{width:'200px'}">
        自定义标题内容
        <span slot="title"
              style="color:red">标题红</span>
        <template slot="content">
          <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>
    </div>

    <div class="demo">
      <ux-popover content="动态标题"
                  :auto-adjust-overflow="false">
        动态标题
        <span v-if="isShowTitle"
              slot="title"
              style="color:red">标题红</span>
        <template slot="content">
          <span style="color:green">这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>
      <button class="ux-btn"
              @click="showTitle">显示/隐藏标题</button>
    </div>
    <div class="demo">
      <ux-popover trigger="click"
                  title="表格"
                  placement="topLeft"
                  arrow-point-at-center>
        <button class="ux-btn">展开表格</button>
        <table slot="content"
               class="ux-table"
               style="width:550px">
          <tr>
            <th>名称</th>
            <th>日期</th>
            <th>地址</th>
          </tr>
          <tr v-for="(tr,i) in table"
              :key="i">
            <td>{{tr.name}}</td>
            <td>{{tr.date}}</td>
            <td>{{tr.address}}</td>
          </tr>
        </table>
      </ux-popover>
    </div>

    <!--visible 和visible-change时间需要配合使用-->
    <div class="demo">
      <ux-popover trigger="click"
                  :visible="visible"
                  @visible-change="onVisibleChange">
        <button class="ux-btn">打开</button>
        <a slot="content"
           href="###"
           @click="close">关闭</a>
      </ux-popover>
    </div>

    <div class="demo">
      <h6 style="color: white">dark theme</h6>
      <ux-popover content="自定义标题"
                  theme="dark"
                  placement="top"
                  :popover-style="{width:'200px'}">
        自定义标题内容
        <span slot="title"
              style="color:red">标题红</span>
        <template slot="content">
          <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>

      <ux-popover content="自定义标题"
                  theme="dark"
                  placement="left"
                  :popover-style="{width:'200px'}">
        自定义标题内容
        <span slot="title">标题</span>
        <template slot="content">
          <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>

      <ux-popover content="自定义标题"
                  theme="dark"
                  placement="right"
                  :popover-style="{width:'200px'}">
        自定义标题内容
        <span slot="title">标题</span>
        <template slot="content">
          <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>

      <ux-popover content="自定义标题"
                  theme="dark"
                  placement="bottom"
                  :popover-style="{width:'200px'}">
        自定义标题内容
        <span slot="title">标题</span>
        <template slot="content">
          <span style="color:green">这是内容这是内容这是内容这是内容这是内容这是内容这是内容</span>
          <div>额外内容</div>
        </template>
      </ux-popover>
    </div>
  </div>
</template>


<script>
  import '../../../src/components/button/style/index.scss';
  import '../../../src/components/table/style/index.scss';
  import '../../../src/components/popover/style/index.scss';
  import UxPopover from '../../../src/components/popover';

  export default {
    data() {
      return {
        visible: false,
        innerContent: '测试内容2',
        isShowTitle: false,
        table: [
          { name: '测试1', date: '2019-01-11', address: '地址1' },
          { name: '测试2', date: '2019-02-12', address: '地址2' },
          { name: '测试3', date: '2019-03-13', address: '地址3' },
        ],
      };
    },
    created() {
      setTimeout(() => {
        this.innerContent = '这是新生成的Content';
      }, 2500);
    },
    methods: {
      showTitle() {
        this.isShowTitle = !this.isShowTitle;
      },
      close() {
        this.visible = false;
      },
      onVisibleChange(visible) {
        this.visible = visible;
      },
    },
    components: {
      UxPopover,
    },
  };
</script>

<style lang="scss" scoped>
  .demo {
    margin-top: 20px;
  }
</style>
