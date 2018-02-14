export default `
<template>
  <ux-row :gutter="10">
    <ux-col :md="12" :lg="8">
      <ux-card flat
                vertical
                class="bg-red">
        <template slot="title">卡片标题</template>
        <ul class="list">
          <li>
            <a>
              <div class="stats-wrapper">
                <div class="stats total">
                  <div class="stats-text">未处理事件</div>
                  <div class="stats-number">10</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <ul class="list vertical">
              <li>
                <a>
                  <div class="stats-wrapper">
                    <div class="stats">
                      <span class="stats-text">灾难</span>
                      <span class="stats-number">6</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="stats-wrapper">
                    <div class="stats">
                      <span class="stats-text">严重</span>
                      <span class="stats-number">3</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="stats-wrapper">
                    <div class="stats">
                      <span class="stats-text">警告</span>
                      <span class="stats-number">1</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </ux-card>
    </ux-col>
    <ux-col :md="12" :lg="8">
      <ux-card flat
                vertical>
        <template slot="title">卡片标题</template>
        <ul class="list">
          <li>
            <a>
              <div class="stats-wrapper">
                <div class="stats total">
                  <div class="stats-text">未处理事件</div>
                  <div class="stats-number">0</div>
                </div>
              </div>
            </a>
          </li>
          <li>
            <ul class="list vertical">
              <li>
                <a>
                  <div class="stats-wrapper">
                    <div class="stats">
                      <span class="stats-text">灾难</span>
                      <span class="stats-number">0</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="stats-wrapper">
                    <div class="stats">
                      <span class="stats-text">严重</span>
                      <span class="stats-number">0</span>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a>
                  <div class="stats-wrapper">
                    <div class="stats">
                      <span class="stats-text">警告</span>
                      <span class="stats-number">0</span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </ux-card>
    </ux-col>
  </ux-row>
</template>

<style lang="scss" scoped>
  .list {
    display: flex;

    li {
      flex: 1;
      position: relative;
      margin-top: -1px;
      text-align: center;

      & + li::before {
        content: '';
        position: absolute;
        top: 10px;
        bottom: 10px;
        left: -1px;
        width: 1px;
        background: rgba(255,255,255,.3);
      }

      > a {
        color: #FFF;
      }
    }

    &.vertical {
      flex-direction: column;
      height: 100%;

      > li:first-child {
        margin-top: 0;
      }

      > li + li::before {
        top: -1px;
        bottom: auto;
        left: 10px;
        right: 10px;
        width: auto;
        height: 1px;
      }
    }
  }

  .stats-wrapper {
    display: table;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;

    &:hover {
      border-color: #FFF;
    }
  }

  .stats {
    display: table-cell;
    padding: 15px;
    font-size: 12px;
    vertical-align: middle;

    &.total {
      padding: 24px 0;

      .stats-text {
        margin-right: 0;
        font-size: 14px;
        line-height: 24px;
      }

      .stats-number {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }

  .stats-text {
    margin-right: 10px;
    color: rgba(255,255,255,.8);
  }
</style>
`;
