<template>
  <article class="doc">
    <h1 class="ux-heading">主题</h1>

    <p>目前组件库内置了两套主题：<code>light</code>和<code>dark</code>。绝大多数组件都支持通过<code>theme</code>属性传递主题，从而改变组件风格。</p>

    <blockquote>这只是这一期项目的临时方案，可扩展性极差。每个组件都根据<code>light</code>和<code>dark</code>主题写了两套逻辑，后期会梳理样式文件，抽象出对应的变量，从而根据项目需求定制出任意多种不同的主题。</blockquote>

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
</style>


<script>
import { CHANGE_TOGGLE_THEME } from '@/store/mutation-types';

export default {
  computed: {
    radioClass() {
      return ['theme-picker-radio', this.theme];
    },
    theme: {
      get() {
        return this.$store.state.theme;
      },
      set(theme) {
        this.$store.commit(CHANGE_TOGGLE_THEME, theme);
      },
    },
  },
  methods: {
    selectTheme(theme) {
      this.theme = theme;
    },
  },
};
</script>
