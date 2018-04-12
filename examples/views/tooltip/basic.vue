<template>
  <div>
    <div class="demo">
      <ux-tooltip content="测试">
        ux-tooltip will show when mouse enter.
      </ux-tooltip>
    </div>
    <div class="topLeftWrap">
      <div class="top">
        <ux-tooltip placement="topLeft"
                    :content="buildContent('Top-Left')">
          <button>Top-Left</button>
        </ux-tooltip>
        <ux-tooltip placement="top"
                    :content="buildContent('Top')">
          <button>Top</button>
        </ux-tooltip>
        <ux-tooltip placement="topRight"
                    :content="buildContent('Top-Right')">
          <button>Top-Right</button>
        </ux-tooltip>
      </div>
      <div class="left">
        <ux-tooltip placement="leftTop"
                    :auto-adjust-overflow="false"
                    :content="buildContent('Left-Top')">
          <button>Left-Top</button>
        </ux-tooltip>
        <ux-tooltip placement="left"
                    :content="buildContent('Left')">
          <button>Left</button>
        </ux-tooltip>
        <ux-tooltip placement="leftBottom"
                    :content="buildContent('Left-Bottom')">
          <button>Left-Bottom</button>
        </ux-tooltip>
      </div>
      <div class="right">
        <ux-tooltip placement="rightTop"
                    :content="buildContent('Right-Top')">
          <button>Right-Top</button>
        </ux-tooltip>
        <ux-tooltip placement="right"
                    :content="buildContent('Right')">
          <button>Right</button>
        </ux-tooltip>
        <ux-tooltip placement="rightBottom"
                    :content="buildContent('Right-Bottom')">
          <button>Right-Bottom</button>
        </ux-tooltip>
      </div>
      <div class="bottom">
        <ux-tooltip placement="bottomLeft"
                    :content="buildContent('Bottom-Left')">
          <button>Bottom-Left</button>
        </ux-tooltip>
        <ux-tooltip placement="bottom"
                    :content="buildContent('Bottom')">
          <button>Bottom</button>
        </ux-tooltip>
        <ux-tooltip placement="bottomRight"
                    :content="buildContent('Bottom-Right')">
          <button>Bottom-Right</button>
        </ux-tooltip>
      </div>
    </div>
    <!--top-->
    <div class="demo">
      <ux-tooltip trigger="focus">
        <div slot="content">
          测试1<br/>测试2
        </div>
        <button class="ux-btn">Bottom</button>
      </ux-tooltip>
    </div>

    <div class="demo">
      <ux-tooltip :disabled="disabled"
                  content="测试用tooltip内容">
        <button class="ux-btn"
                @click="changeDisabled">{{disabled ? '打开':'关闭'}}tooltip功能</button>
      </ux-tooltip>
    </div>

    <div class="demo">
      <ux-tooltip placement="topRight"
                  :auto-adjust-overflow="false">
        <div slot="content">
          测试1 测试2
        </div>
        <button class="ux-btn">对齐</button>
      </ux-tooltip>

      <ux-tooltip arrow-point-at-center
                  placement="topRight">
        <div slot="content">
          测试1 测试2
        </div>
        <button class="ux-btn">中心对齐</button>
      </ux-tooltip>
    </div>
  </div>

</template>


<script>
  import '@suning/uxcool/src/components/button/style/index.scss';
  import '@suning/uxcool/src/components/tooltip/style/index.scss';
  import UxTooltip from '@suning/uxcool/src/components/tooltip/index';

  export default {
    components: {
      UxTooltip,
    },
    data() {
      return {
        disabled: false,
      };
    },
    methods: {
      buildContent(prefix) {
        return `${prefix}提示文字`;
      },
      changeDisabled() {
        this.disabled = !this.disabled;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .demo {
    margin-top: 20px;
  }
  .topLeftWrap {
    width: 600px;
    margin: 0 auto;
    .top {
      text-align: center;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .bottom {
      clear: both;
      text-align: center;
    }
    .right,
    .left {
      button {
        display: block;
      }
    }
    button {
      width: 150px;
      height: 50px;
      background: #fff;
      border: 1px solid skyblue;
      margin-top: 15px;
    }
  }
</style>
