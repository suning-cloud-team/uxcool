<template>
  <article class="doc">
    <h1 class="ux-heading">主题</h1>

    <p>目前组件库内置了两套主题：
      <code>light</code>和
      <code>dark</code>。绝大多数组件都支持通过
      <code>theme</code>属性传递主题，从而改变组件风格。</p>

    <blockquote>这只是这一期项目的临时方案，可扩展性极差。每个组件都根据
      <code>light</code>和
      <code>dark</code>主题写了两套逻辑，后期会梳理样式文件，抽象出对应的变量，从而根据项目需求定制出任意多种不同的主题。</blockquote>

    <div class="theme-picker-panel">
      <label :class="radioClass">
        <input type="radio"
               value="light"
               v-model="theme">
        <span class="theme-picker-radio-indicator"></span>
        浅色主题
      </label>
      <p>较为清亮的简洁风格页面</p>
      <a @click="selectTheme('light')">
        <img src="../../../static/light.png"
             alt="light theme">
      </a>
    </div>
    <div class="theme-picker-panel">
      <label :class="radioClass">
        <input type="radio"
               value="dark"
               v-model="theme">
        <span class="theme-picker-radio-indicator"></span>
        深色主题
      </label>
      <p>用于数据监控和图表分析的深色背景页面</p>
      <a @click="selectTheme('dark')">
        <img src="../../../static/dark.png"
             alt="dark theme">
      </a>
    </div>
    <div class="theme-picker-panel">
      <label :class="radioClass">
        <input type="radio"
               value="custom"
               v-model="theme">
        <span class="theme-picker-radio-indicator"></span>
        自定义主题
      </label>
      <p>网页端仅提供主色调修改功能</p>
      <div v-if="theme === 'custom'">
        <div class="mb-xs-2">请选择主色调：
          <ux-dropdown :close-on-select="false">
            <div slot="trigger"
                 class="color-indicator"
                 :style="{backgroundColor: primaryPicker.hex}" />
            <div slot="overlay">
              <chrome-picker v-model="primaryPicker" />
            </div>
          </ux-dropdown>
        </div>
        <ux-button-group>
          <ux-button @click="compile">预览主题</ux-button>
          <ux-button @click="download">下载样式包</ux-button>
        </ux-button-group>
      </div>
    </div>
    <ux-spin wrap-class="full-page-mask high-priority"
             size="large"
             v-show="loading">
      <span slot="tip">编译中...</span>
      <div></div>
    </ux-spin>

  </article>
</template>

<style lang="scss">
  .theme-picker-panel {
    padding-left: 40px;
  }
  .theme-picker-radio {
    position: relative;
    display: inline-block;
    font-size: 20px;
    line-height: 40px;
    color: #333;
    cursor: pointer;

    > input[type='radio'] {
      display: none;

      &:checked + .theme-picker-radio-indicator {
        border: 2px solid #3b8beb;

        &::before {
          transform: scale(1);
        }
      }
    }

    &.dark {
      color: #fff;

      .theme-picker-radio-indicator {
        background: rgba(#000, 0.1);
        border-color: rgba(#fff, 0.3);
      }

      > input[type='radio']:checked + .theme-picker-radio-indicator {
        border-color: #00d8ff;
      }

      .theme-picker-radio-indicator::before {
        background: #00d8ff;
      }
    }
  }

  .theme-picker-radio-indicator {
    position: absolute;
    left: -35px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    transition: all 0.2s;

    &::before {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #3b8beb;
      transform: scale(0);
      transition: all 0.2s;
    }
  }

  .color-indicator {
    display: inline-block;
    width: 50px;
    height: 20px;
    margin: 0 10px;
    border: 1px solid #fff;
    border-radius: 3px;
    vertical-align: -5px;
  }

  .high-priority.full-page-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1200;
  }
</style>


<script>
  import axios from 'axios';
  import {
    CHANGE_TOGGLE_THEME,
    UPDATE_SELECTED_THEME,
    UPDATE_PRIMARY_COLOR,
  } from '@/store/mutation-types';
  import getEnv from '@/common/utils';
  import {
    ENV_DEV,
    ENV_SIT,
    ENV_PRE,
    ENV_PRD,
    DEV_SERVER_URL,
    SIT_SERVER_URL,
    PRE_SERVER_URL,
    PRD_SERVER_URL,
    INITIAL_PRIMARY_COLOR,
  } from '@/common/constants';
  import UxMessage from '@suning/uxcool/es/message';

  const ENV = getEnv();
  const ENV_URL_MAPPING = {
    [ENV_DEV]: DEV_SERVER_URL,
    [ENV_SIT]: SIT_SERVER_URL,
    [ENV_PRE]: PRE_SERVER_URL,
    [ENV_PRD]: PRD_SERVER_URL,
  };
  const BASE_URL = `${ENV_URL_MAPPING[ENV]}`;
  const instance = axios.create();

  export default {
    data() {
      return {
        // vue-color组件生成的颜色是一个包含hex属性的对象，为了保持结构一致，初始时也提供一个含有hex属性的对象,省去类型转化
        primaryPicker: {
          hex: this.$store.state.primaryColor,
        },
        loading: false,
      };
    },
    computed: {
      radioClass() {
        return ['theme-picker-radio', this.theme];
      },
      theme: {
        get() {
          return this.$store.state.selectedTheme;
        },
        set(theme) {
          if (this.theme === 'custom') {
            // 移除自定义主题样式
            const previewStyle = document.getElementById('previewStyle');

            if (previewStyle) {
              previewStyle.parentNode.removeChild(previewStyle);
            }

            // 重置主色调
            this.$store.commit(UPDATE_PRIMARY_COLOR, INITIAL_PRIMARY_COLOR);
            this.primaryPicker = { hex: INITIAL_PRIMARY_COLOR };
          }

          this.$store.commit(UPDATE_SELECTED_THEME, theme);
          this.$store.commit(CHANGE_TOGGLE_THEME, theme === 'dark' ? 'dark' : 'light');
        },
      },
    },
    methods: {
      selectTheme(theme) {
        this.theme = theme;
      },
      compile() {
        const { hex } = this.primaryPicker;
        const url = `${BASE_URL}/customize`;

        this.$store.commit(UPDATE_PRIMARY_COLOR, hex);

        this.loading = true;
        instance
          .post(url, {
            vars: {
              primaryColor: hex,
            },
          })
          .then(({ data }) => {
            let previewStyle = document.getElementById('previewStyle');

            if (previewStyle) {
              previewStyle.textContent = data;
            } else {
              previewStyle = document.createElement('style');
              previewStyle.id = 'previewStyle';
              previewStyle.type = 'text/css';
              previewStyle.textContent = data;
              document.getElementsByTagName('head')[0].appendChild(previewStyle);
            }
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            UxMessage.error('主题编译失败,请稍后再试');
          });
      },
      download() {
        const { hex } = this.primaryPicker;
        const form = document.createElement('form');
        const input = document.createElement('input');

        form.action = `${BASE_URL}/download`;
        form.method = 'POST';
        form.style.display = 'none';

        input.name = 'vars';
        input.value = JSON.stringify({ primaryColor: hex });
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      },
    },
  };
</script>

