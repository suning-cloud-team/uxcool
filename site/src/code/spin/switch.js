export default `
<template>
  <div>
    <button class="ux-btn"
      @click="onClick">
      {{spinning? '关闭' : '打开'}} spin
    </button>
  </div>
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
</template>

<script>
import { addDays } from 'date-fns';

export default {
  data () {
    return {
      spinning: false,
      rows: Array(10)
        .fill(0)
        .map((v, i) => {
          const name = String.fromCharCode(i % 26 + 65);
          return {
            name,
            date: addDays(new Date(), i),
            addr: \`address\${name}\`,
          };
        })
    };
  },
  methods: {
    onClick() {
      this.spinning = !this.spinning;
    },
  },
}
</script>
`;