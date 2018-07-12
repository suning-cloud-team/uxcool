<template>
  <article class="doc">
    <h1 class="ux-heading">Grid
      <span class="subtitle">栅格</span>
    </h1>

    <div>
      <ux-row class="demo-row striped">
        <ux-col :span="24"
                class="demo-col">span: 24</ux-col>
      </ux-row>
      <ux-row class="demo-row striped">
        <ux-col :span="12"
                class="demo-col">span: 12</ux-col>
        <ux-col :span="12"
                class="demo-col light">span: 12</ux-col>
      </ux-row>
      <ux-row class="demo-row striped">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col light">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
      </ux-row>
      <ux-row class="demo-row striped">
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
      </ux-row>
    </div>

    <ux-heading id="overview"
                level="2">概述</ux-heading>
    <p>24列栅格系统，用法和
      <code>bootstrap</code>相似，支持6类不同宽度的屏幕:</p>
    <ul class="list-styled">
      <li>
        <p>
          <code>xs</code>: 超小屏( &lt; 576);</p>
      </li>
      <li>
        <p>
          <code>sm</code>: 极小屏( ≥ 576px );</p>
      </li>
      <li>
        <p>
          <code>md</code>: 小屏幕( ≥ 768px );</p>
      </li>
      <li>
        <p>
          <code>lg</code>: 中等屏( ≥ 992px );</p>
      </li>
      <li>
        <p>
          <code>xl</code>: 大屏幕( ≥ 1200px );</p>
      </li>
      <li>
        <p>
          <code>xxl</code>: 极大屏( ≥ 1600px )。</p>
      </li>
    </ul>

    <blockquote>
      <code>0.3.0-alpha.6</code>之前版本只有5类屏，即 xs: ≥ 576px, sm: ≥ 768px, md: ≥ 992px, lg: ≥ 1200px, xl: ≥ 1600px,
    </blockquote>

    <demo-basic></demo-basic>
    <demo-gutter></demo-gutter>
    <demo-offset-grid></demo-offset-grid>
    <demo-flex-grid></demo-flex-grid>
    <demo-order-grid></demo-order-grid>
    <demo-align-grid></demo-align-grid>
    <demo-responsive-grid></demo-responsive-grid>

    <hr>

    <ux-heading level="2"
                id="api">API</ux-heading>
    <table class="api-table">
      <caption>UxRow Props</caption>
      <thead>
        <tr>
          <th>属性</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>gutter</td>
          <td>直接后代UxCol的间隔（像素）</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>flex</td>
          <td>是否启用flex布局</td>
          <td>Boolean</td>
          <td>false</td>
        </tr>
        <tr>
          <td>justify</td>
          <td>水平对齐方式，可选值:
            <code>start</code>,
            <code>center</code>,
            <code>end</code>,
            <code>space-around</code>,
            <code>space-between</code>。
          </td>
          <td>String</td>
          <td>-</td>
        </tr>
        <tr>
          <td>align</td>
          <td>垂直对齐方式，可选值:
            <code>top</code>,
            <code>middle</code>,
            <code>bottom</code>。
          </td>
          <td>String</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>

    <table class="api-table">
      <caption>UxCol Props</caption>
      <thead>
        <tr>
          <th>属性</th>
          <th>说明</th>
          <th>类型</th>
          <th>默认值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>span</td>
          <td>栅格数, 一行总格数24, 可选值为1 ~ 24。</td>
          <td>Number</td>
          <td>-</td>
        </tr>
        <tr>
          <td>order</td>
          <td>顺序，flex布局模式下有效， 可选值为0 ~ 24。</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>offset</td>
          <td>偏移格数,可选值0 ~ 23。</td>
          <td>Number</td>
          <td>0</td>
        </tr>
        <tr>
          <td>xs</td>
          <td>响应式栅格数，可以为数字类型，或者对象类型{span: Number, order: Number, offset: Number}。</td>
          <td>Number | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>sm</td>
          <td>
            <code>≥576px</code>响应式栅格数，可以为数字类型，或者对象类型{span: Number, order: Number, offset: Number}。</td>
          <td>Number | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>md</td>
          <td>
            <code>≥768px</code>响应式栅格数，可以为数字类型，或者对象类型{span: Number, order: Number, offset: Number}。</td>
          <td>Number | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>lg</td>
          <td>
            <code>≥992px</code>响应式栅格数，可以为数字类型，或者对象类型{span: Number, order: Number, offset: Number}。</td>
          <td>Number | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>xl</td>
          <td>
            <code>≥1200px</code>响应式栅格数，可以为数字类型，或者对象类型{span: Number, order: Number, offset: Number}。</td>
          <td>Number | Object</td>
          <td>-</td>
        </tr>
        <tr>
          <td>xxl</td>
          <td>
            <code>≥1600px</code>响应式栅格数，可以为数字类型，或者对象类型{span: Number, order: Number, offset: Number}。</td>
          <td>Number | Object</td>
          <td>-</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<style lang="scss">
  .demo-row {
    margin-bottom: 10px;

    &.striped {
      background-image: repeating-linear-gradient(
        90deg,
        #eee 0,
        #eee 4.16666667%,
        transparent 4.16666667%,
        transparent 8.33333333%
      );
    }

    &.bg {
      background: #eee;
    }
  }

  .demo-col {
    padding: 20px 10px;
    background: rgba(0, 153, 229, 0.7);
    font-size: 18px;
    color: #fff;
    text-align: center;
    &.light {
      background: rgba(0, 153, 229, 0.5);
    }
  }

  .ux-layout-dark {
    .demo-row.striped {
      background-image: repeating-linear-gradient(
        90deg,
        rgba(#fff, 0.15) 0,
        rgba(#fff, 0.15) 4.16666667%,
        transparent 4.16666667%,
        transparent 8.33333333%
      );
    }

    .demo-row.bg {
      background: rgba(0, 0, 0, 0.1);
    }

    .demo-col.light {
      background: rgba(0, 153, 229, 0.3);
    }
  }
</style>

<script>
  import demoBasic from './basic.vue';
  import demoGutter from './gutter.vue';
  import demoFlexGrid from './flex.vue';
  import demoOrderGrid from './order.vue';
  import demoAlignGrid from './align.vue';
  import demoOffsetGrid from './offset.vue';
  import demoResponsiveGrid from './responsive.vue';

  export default {
    data() {
      return {};
    },
    components: {
      demoBasic,
      demoGutter,
      demoFlexGrid,
      demoOrderGrid,
      demoAlignGrid,
      demoOffsetGrid,
      demoResponsiveGrid,
    },
  };
</script>
