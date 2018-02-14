<template>
  <div>
    <div class="demo">
      <h6>small ,normal,large</h6>
      <ux-spin size="small"
               tip="small"></ux-spin>
      <ux-spin tip="normal"></ux-spin>
      <ux-spin size="large"
               tip="large"></ux-spin>
    </div>
    <div class="demo">
      <ux-spin tip="loading"></ux-spin>
      <ux-spin tip="loading"
               spin-style="width:100%">
        <span slot="tip"
              style="color: red">
          loading...
        </span>
      </ux-spin>
    </div>
    <div class="demo"
         style="text-align:center">
      <ux-spin>
        <div class="area">
        </div>
      </ux-spin>

      <ux-spin wrap-class="custom-wrap-a"
               spin-class="custom-spin-b"
               size="small">
        <span slot="tip">loading text</span>
        <div class="area">
        </div>
      </ux-spin>
      <ux-spin wrap-class="custom-wrap-a"
               spin-class="custom-spin-b"
               size="large">
        <span slot="tip">loading text</span>
        <div class="area2">
        </div>
      </ux-spin>
    </div>
    <div class="demo">
      <button class="ux-btn"
              @click="onClick">
        {{spinning? '关闭' : '打开'}} spin
      </button>
      <br>
      <ux-spin :spinning="spinning"
               wrap-style="width:100%">
        <div style="width:100%; max-height: 150px;overflow:auto">
          <table class="ux-table">
            <thead>
              <th>name</th>
              <th>date</th>
              <th>address</th>
            </thead>
            <tr v-for="(row,i) in rows"
                :key="i">
              <td>{{row.name}}</td>
              <td>{{row.date}}</td>
              <td>{{row.addr}}</td>
            </tr>
          </table>
        </div>

      </ux-spin>

    </div>
  </div>

</template>

<script>
  import { addDays } from 'date-fns';
  import '../../../src/components/spin/style/index.scss';
  import UxSpin from '../../../src/components/spin/index';
  import Icon from '../../../src/components/icon';

  export default {
    data() {
      return {
        spinning: false,
        rows: Array(10)
          .fill(0)
          .map((v, i) => {
            const name = String.fromCharCode(i % 26 + 65);
            return {
              name,
              date: addDays(new Date(), i),
              addr: `address${name}`,
            };
          }),
      };
    },
    methods: {
      onClick() {
        this.spinning = !this.spinning;
      },
    },
    components: {
      UxSpin,
      Icon,
    },
  };
</script>

<style lang="scss" scoped>
  .area,
  .area2 {
    background: #eee;
    margin: 0 auto;
  }
  .area {
    width: 200px;
    height: 200px;
  }
  .area2 {
    width: 500px;
    height: 500px;
  }
  .fullscreen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>