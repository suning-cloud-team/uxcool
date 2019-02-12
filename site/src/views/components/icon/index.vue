<template>
  <div class="doc icon-wrap">
    <h1 class="ux-heading">Icon
      <span class="subtitle">图标</span>
    </h1>
    <h2 class="ux-heading">命名规则</h2>
    <p>图标命名以后缀区分类型：</p>
    <ul>
      <li>
        <p><code>-d</code> 常用图标</p>
      </li>
      <li>
        <p><code>-a</code> 箭头图标</p>
      </li>
      <li>
        <p><code>-t</code> 提示性图标 </p>
      </li>
      <li>
        <p><code>-m</code> 实体图标</p>
      </li>
      <li>
        <p><code>-b</code> 粗体图标</p>
      </li>
    </ul>
    <blockquote>
      <p><code>0.5.0-next.37</code>版本对图标进行了重命名, 增删了部分图标。为了向后兼容，大部分旧图标的旧命名还会保留一段时间(不推荐使用)，但可能会在后续版本中移除。建议有条件的项目组使用最新的图标命名。</p>
    </blockquote>
    <h2 class="ux-heading">
      如何使用
    </h2>
    <ux-code>
      {{ code }}
    </ux-code>
    <h2 class="ux-heading">图标列表</h2>

    <ux-tabs>
      <ux-tab-pane v-for="(group, index) in list"
                   :tab="group.name"
                   :name="group.name"
                   :key="index">
        <div class="p-xs-2">
          <ux-row flex>
            <ux-col v-clipboard="copyText(icon)"
                    v-for="(icon, i) in group.icons"
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
      </ux-tab-pane>
    </ux-tabs>
  </div>
</template>

<script>
  import UxMessage from '@suning/uxcool/es/message';
  import icon from './icon';

  export default {
    data() {
      return {
        code: '<ux-icon type="all-d" />',
        list: [],
      };
    },
    created() {
      const arrows = {
        name: '箭头',
        icons: [],
      };
      const tips = {
        name: '提示',
        icons: [],
      };
      const faces = {
        name: '实体',
        icons: [],
      };
      const bold = {
        name: '粗线条',
        icons: [],
      };
      const general = {
        name: '常用',
        icons: [],
      };

      const REG_ARROW = /-a$/;
      const REG_TIP = /-t$/;
      const REG_FACE = /-m$/;
      const REG_BOLD = /-b$/;
      const REG_GENERAL = /-d$/;
      icon.forEach((item) => {
        const { name } = item;
        if (REG_ARROW.test(name)) {
          arrows.icons.push(item);
        } else if (REG_TIP.test(name)) {
          tips.icons.push(item);
        } else if (REG_FACE.test(name)) {
          faces.icons.push(item);
        } else if (REG_BOLD.test(name)) {
          bold.icons.push(item);
        } else if (REG_GENERAL.test(name)) {
          general.icons.push(item);
        }
      });

      this.list = [general, arrows, tips, faces, bold];
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
    color: #666;
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
