<template>
  <div>
    <section>
      <h3>basic</h3>
      <ux-row class="demo-row">
        <ux-col class="demo-col">span: 24</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="12"
                class="demo-col">span: 12</ux-col>
        <ux-col :span="12"
                class="demo-col light">span: 12</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col light">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
      </ux-row>
    </section>
    <section>
      <h3>flex</h3>
      <ux-row class="demo-row"
              flex>
        <ux-col class="demo-col">span: 24</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              :flex="true">
        <ux-col :span="12"
                class="demo-col">span: 12</ux-col>
        <ux-col :span="12"
                class="demo-col light">span: 12</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              :flex="true">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col light">span: 8</ux-col>
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex>
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col">span: 6</ux-col>
        <ux-col :span="6"
                class="demo-col light">span: 6</ux-col>
      </ux-row>
    </section>
    <section>
      <h3>order</h3>
      <ux-row class="demo-row"
              flex>
        <ux-col :span="6"
                :order="4"
                class="demo-col">1: order-4</ux-col>
        <ux-col :span="6"
                :order="3"
                class="demo-col light">2: order-3</ux-col>
        <ux-col :span="6"
                :order="2"
                class="demo-col">3: order-2</ux-col>
        <ux-col :span="6"
                :order="1"
                class="demo-col light">4: order-1</ux-col>
      </ux-row>
    </section>
    <section>
      <h3>alignment</h3>
      <ux-row class="demo-row"
              flex
              justify="start">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              justify="center">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              justify="end">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              justify="space-between">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              justify="space-around">
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col">span: 4</ux-col>
        <ux-col :span="4"
                class="demo-col light">span: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              align="top">
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 60px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 100px;">span: 4</div>
        </ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              align="middle">
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 60px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 100px;">span: 4</div>
        </ux-col>
      </ux-row>
      <ux-row class="demo-row"
              flex
              align="bottom">
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 60px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col">
          <div style="height: 30px;">span: 4</div>
        </ux-col>
        <ux-col :span="4"
                class="demo-col light">
          <div style="height: 100px;">span: 4</div>
        </ux-col>
      </ux-row>
    </section>
    <section>
      <h3>offset</h3>
      <ux-row class="demo-row">
        <ux-col :span="8"
                class="demo-col">span: 8</ux-col>
        <ux-col :span="8"
                :offset="8"
                class="demo-col light">span: 8, offset: 8</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="12"
                :offset="6"
                class="demo-col">span: 12, offset: 6</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :span="7"
                :offset="1"
                class="demo-col">span: 7, offset: 1</ux-col>
        <ux-col :span="7"
                :offset="1"
                class="demo-col">span: 7, offset: 1</ux-col>
        <ux-col :span="7"
                :offset="1"
                class="demo-col">span: 7, offset: 1</ux-col>
      </ux-row>
    </section>
    <section>
      <h3>gutter</h3>
      <ux-row :gutter="10">
        <ux-col :span="6">
          <div class="demo-col">span: 6</div>
        </ux-col>
        <ux-col :span="6">
          <div class="demo-col">span: 6</div>
        </ux-col>
        <ux-col :span="6">
          <div class="demo-col">span: 6</div>
        </ux-col>
        <ux-col :span="6">
          <div class="demo-col">span: 6</div>
        </ux-col>
      </ux-row>
    </section>
    <section>
      <h3>responsive</h3>
      <ux-row class="demo-row">
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col">xs: 24, sm: 12, md: 8, lg: 6, xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col light">xs: 24, sm: 12, md: 8, lg: 6, xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col">xs: 24, sm: 12, md: 8, lg: 6, xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col light">xs: 24, sm: 12, md: 8, lg: 6, xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col">xs: 24, sm: 12, md: 8, lg: 6, xl: 4</ux-col>
        <ux-col :xs="24"
                :sm="12"
                :md="8"
                :lg="6"
                :xl="4"
                class="demo-col light">xs: 24, sm: 12, md: 8, lg: 6, xl: 4</ux-col>
      </ux-row>
      <ux-row class="demo-row">
        <ux-col :xs="{span: 24}"
                :sm="{span: 11, offset: 1}"
                :md="{span: 8, offset: 8}"
                :lg="{span: 6, offset: 6}"
                :xl="{span: 4, offset: 0}"
                class="demo-col">xs: {span: 24}<br> sm: {span: 11, offset: 1} <br> md: {span: 8, offset: 8}<br> lg: {span: 6, offset: 6}<br> xl: {span: 4, offset: 0}</ux-col>
        <ux-col :xs="{span: 24}"
                :sm="{span: 11, offset: 1}"
                :md="{span: 8, offset: 8}"
                :lg="{span: 6, offset: 6}"
                :xl="{span: 4, offset: 0}"
                class="demo-col light">xs: {span: 24}<br> sm: {span: 11, offset: 1} <br> md: {span: 8, offset: 8}<br> lg: {span: 6, offset: 6}<br> xl: {span: 4, offset: 0}</ux-col>
      </ux-row>
    </section>
  </div>

</template>

<script>
  import { UxRow, UxCol } from '../../../src/components/grid';
  import '../../../src/components/grid/style/index.scss';

  export default {
    components: {
      UxRow,
      UxCol,
    },
  };
</script>

<style lang="scss">
  .demo-grid {
    background-image: repeating-linear-gradient(
      90deg,
      #eee 0,
      #eee 4.16666667%,
      transparent 4.16666667%,
      transparent 8.33333333%
    );
  }

  .demo-row {
    margin-bottom: 10px;
    background: #eee;
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
</style>


