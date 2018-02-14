<template>
  <ux-demo title="纯色卡片"
           :height="200">
    <div slot="demo">
      <div>
        <ux-row :gutter="10">
          <ux-col :md="12"
                  :lg="8">
            <ux-card flat>
              <template slot="title">卡片标题</template>
              卡片内容
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8">
            <ux-card flat
                     class="bg-red">
              <template slot="title">带操作的卡片标题</template>
              <a slot="action">
                <ux-icon type="menu_more"></ux-icon>
              </a>
              卡片内容
            </ux-card>
          </ux-col>
        </ux-row>
        <ux-row :gutter="10">
          <ux-col :md="12"
                  :lg="8">
            <ux-card flat>
              <template slot="title">这里是系统名称哟</template>
              <template slot="action">
                <ux-tooltip :content="tooltip">
                  <a @click="toggleFocus">
                    <ux-icon type="heart_o"
                             class="pulse"
                             v-show="!focus"></ux-icon>
                    <ux-icon type="heart"
                             class="pulse"
                             v-show="focus"></ux-icon>
                  </a>
                </ux-tooltip>
              </template>
              <ux-row>
                <ux-col :span="12">
                  <div class="stats-text">应用数</div>
                  <div class="stats-number">6 </div>
                </ux-col>
                <ux-col :span="12">
                  <div class="stats-text">最大耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
              </ux-row>
              <div class="meta">
                <div class="source">
                  <div class="source-inner">易购网站</div>
                </div>
                <div class="time">2017-5-25 10:30:30</div>
              </div>
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8">
            <ux-card flat
                     :class="{'bg-red': bgRed}">
              <template slot="title">这里是系统名称哟</template>
              <template slot="action">
                <ux-tooltip content="切换背景色">
                  <a @click="bgRed = !bgRed">
                    <ux-icon type="skin"></ux-icon>
                  </a>
                </ux-tooltip>
              </template>
              <ux-row>
                <ux-col :span="12">
                  <div class="stats-text">应用数</div>
                  <div class="stats-number">6 </div>
                </ux-col>
                <ux-col :span="12">
                  <div class="stats-text">最大耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
              </ux-row>
              <div class="meta">
                <div class="source">
                  <div class="source-inner">易购网站</div>
                </div>
                <div class="time">2017-5-25 10:30:30</div>
              </div>
            </ux-card>
          </ux-col>
        </ux-row>
      </div>
    </div>
    <div slot="desc">设置
      <code>flat</code>属性可以使卡片显示为纯色。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/card/flat';

  export default {
    data() {
      return {
        code,
        focus: false,
        bgRed: false,
      };
    },
    computed: {
      tooltip() {
        return this.focus ? '取消关注' : '添加关注';
      },
    },
    methods: {
      toggleFocus() {
        this.focus = !this.focus;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .stats-text,
  .stats-number {
    white-space: nowrap;
    text-align: center;
  }

  .stats-text {
    line-height: 20px;
  }

  .stats-number {
    font-size: 18px;
    line-height: 40px;
  }

  .unit {
    font-size: 12px;
  }

  .meta {
    color: rgba(255, 255, 255, 0.3);
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }

  .source {
    float: left;
    width: 100%;

    &-inner {
      margin-right: 50%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .time {
    float: left;
    margin-left: -50%;
    width: 50%;
  }

  .pulse {
    animation: pulse 0.3s ease-in;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }
</style>
