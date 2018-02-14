<template>
  <div>
    <ux-row :gutter="10">
      <ux-col :md="12"
              :lg="8"
              :xl="6">
        <ux-card>
          <template slot="title">卡片标题</template>
          卡片内容
        </ux-card>
      </ux-col>
      <ux-col :md="12"
              :lg="8"
              :xl="6">
        <ux-card>
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
        <ux-card class="ux-card-dark">
          <template slot="title">卡片标题</template>
          卡片内容
        </ux-card>
      </ux-col>
      <ux-col :md="12"
              :lg="8"
              :xl="6">
        <ux-card class="ux-card-dark">
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
      <ux-col :md="12"
              :lg="8">
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
      <ux-col :md="12"
              :lg="8">
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

<script>
  import { UxRow, UxCol } from '@suning/uxcool/src/components/grid';
  import UxIcon from '@suning/uxcool/src/components/icon';
  import UxCard from '@suning/uxcool/src/extra/card';
  import '@suning/uxcool/src/components/grid/style/index.scss';
  import '@suning/uxcool/src/extra/card/style/index.scss';

  export default {
    components: {
      UxRow,
      UxCol,
      UxIcon,
      UxCard,
    },
  };
</script>

