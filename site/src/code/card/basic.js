export default `
<template>
  <div>
    <ux-row :gutter="10">
      <ux-col :md="12" :lg="8" :xl="6">
        <ux-card>
          <template slot="title">卡片标题</template>
          卡片内容
        </ux-card>
      </ux-col>
      <ux-col :md="12" :lg="8" :xl="6">
        <ux-card>
          <template slot="title">带操作的卡片标题</template>
          <a slot="action">
            <ux-icon type="menu_more"></ux-icon>
          </a>
          卡片内容
        </ux-card>
      </ux-col>
    </ux-row>
    <ux-row :gutter="10">
      <ux-col :md="12" :lg="8">
        <ux-card>
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
</template>

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

  .stats-number {
    font-size: 16px;
    line-height: 40px;
  }

  .unit {
    font-size: 12px;
  }
</style>

`;
