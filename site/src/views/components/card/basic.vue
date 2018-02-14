<template>
  <ux-demo title="基本卡片"
           :height="200">
    <div slot="demo">
      <div>
        <ux-row :gutter="10">
          <ux-col :md="12"
                  :lg="8"
                  :xl="6">
            <ux-card :theme="theme">
              <template slot="title">卡片标题</template>
              卡片内容
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8"
                  :xl="6">
            <ux-card :theme="theme">
              <template slot="title">带操作的卡片标题</template>
              <a slot="action">
                <ux-icon type="menu_more"></ux-icon>
              </a>
              卡片内容
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8"
                  :xl="6">
            <ux-card :theme="theme">
              <template slot="title">卡片标题</template>
              卡片内容
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8"
                  :xl="6">
            <ux-card :theme="theme">
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
            <ux-card :theme="theme">
              <template slot="title">这里是系统名称哟</template>
              <ux-row>
                <ux-col :span="6">
                  <div class="stats-text">平均耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">最大耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">错误数</div>
                  <div class="stats-number">99 </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">调用量</div>
                  <div class="stats-number">400</div>
                </ux-col>
              </ux-row>
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8">
            <ux-card :theme="theme">
              <template slot="title">这里是系统名称哟</template>
              <ux-row>
                <ux-col :span="6">
                  <div class="stats-text">平均耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">最大耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">错误数</div>
                  <div class="stats-number">99 </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">调用量</div>
                  <div class="stats-number">400</div>
                </ux-col>
              </ux-row>
            </ux-card>
          </ux-col>
          <ux-col :md="12"
                  :lg="8">
            <ux-card :theme="theme">
              <template slot="title">这里是系统名称哟</template>
              <ux-row>
                <ux-col :span="6">
                  <div class="stats-text">平均耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">最大耗时</div>
                  <div class="stats-number">100
                    <span class="unit">ms</span>
                  </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">错误数</div>
                  <div class="stats-number">99 </div>
                </ux-col>
                <ux-col :span="6">
                  <div class="stats-text">调用量</div>
                  <div class="stats-number">400</div>
                </ux-col>
              </ux-row>
            </ux-card>
          </ux-col>
        </ux-row>
      </div>
    </div>
    <div slot="desc">可以通过
      <code>slot</code>插入自定义内容。</div>
    <ux-code slot="code">{{code}}</ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/card/basic';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
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
    font-size: 12px;
    line-height: 20px;
    color: #999;
  }

  .ux-card-dark .stats-text {
    color: rgba(255, 255, 255, 0.3);
  }

  .stats-number {
    font-size: 16px;
    line-height: 40px;
  }

  .unit {
    font-size: 12px;
  }
</style>
