<template>
  <div class="doc icon-wrap">
    <h1 class="ux-heading">Icon
      <span class="subtitle">图标</span>
    </h1>
    <h2 class="ux-heading">
      如何使用
    </h2>
    <ux-code>
      {{ code }}
    </ux-code>
    <h2 class="ux-heading">图标列表</h2>

    <ux-row flex>
      <ux-col v-clipboard="copyText(icon)"
              v-for="(icon, i) in list"
              :xl="4"
              :lg="6"
              :md="8"
              :sm="12"
              :key="i"
              class="icon-item"
              @success="onCopySuccess">
        <ux-icon :type="icon.name" />
        <div class="icon-item-code">{{ icon.font }}</div>
        <div class="icon-item-name">{{ icon.name }}</div>
      </ux-col>
    </ux-row>
  </div>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';
  import list from './icon';

  export default {
    data() {
      return {
        list,
        code: '<ux-icon type="down" />',
      };
    },
    methods: {
      copyText({ name }) {
        return `<ux-icon type="${name}" />`;
      },
      onCopySuccess() {
        UxMessage.success('图标组件代码已复制到剪贴板');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .icon-item {
    padding: 16px;
    text-align: center;
    cursor: pointer;

    &-name {
      font-size: 16px;
      word-break: break-all;
      word-wrap: break-word;
    }

    &-code {
      margin: 10px 0;
      font-size: 12px;
    }

    &:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);

      i {
        transform: scale(1.2);
      }
    }

    i {
      font-size: 36px;
      transition: transform 0.3s;
    }
  }
</style>
