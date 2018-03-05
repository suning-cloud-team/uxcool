<template>
  <ux-demo title="状态切换">
    <div slot="demo">
      <div style="margin-bottom: 10px;">
        <button class="ux-btn"
                @click="onClick">
          {{spinning? '关闭' : '打开'}} spin
        </button>
      </div>
      <ux-spin :spinning="spinning"
               wrap-style="width:100%">
        <div style="width:100%; max-height: 150px;overflow:auto">
          <table class="table-custom"
                 :class="{'ux-table-dark': theme === 'dark'}">
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
    <div slot="desc">点击切换loading状态。</div>
    <ux-code slot="code">
      {{code}}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/spin/switch';

  import { addDays } from 'date-fns';

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
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
    methods: {
      onClick() {
        this.spinning = !this.spinning;
      },
    },
  };
</script>

