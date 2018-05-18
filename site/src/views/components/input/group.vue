<template>
  <ux-demo title="组合输入框"
           :height="200">
    <div slot="demo">
      <ux-input-group>
        <ux-col :span="4">
          <ux-input />
        </ux-col>
        <ux-col :span="5">
          <ux-input/>
        </ux-col>
      </ux-input-group>

      <ux-input-group compact>
        <ux-input value="123"
                  style="width:10%;" />
        <ux-input value="456"
                  style="width:20%;" />
      </ux-input-group>

      <ux-input-group compact>
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
        <ux-input style="width:20%" />
      </ux-input-group>

      <ux-input-group compact>
        <ux-input style="width:20%" />
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
      </ux-input-group>

      <ux-input-group compact>
        <ux-input style="width:20%" />
        <ux-date-picker />
      </ux-input-group>

      <ux-input-group compact>
        <ux-date-picker />
        <ux-input style="width:20%" />
      </ux-input-group>

      <ux-input-group compact>
        <ux-date-picker />
        <ux-range-date-picker />
      </ux-input-group>
      <ux-input-group compact>
        <ux-range-date-picker />
        <ux-date-picker />
      </ux-input-group>

      <ux-input-group compact>
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
        <ux-select value=".edu">
          <ux-option value=".com">.com</ux-option>
          <ux-option value=".org.org.org.org.org.org">.org.org.org.org.org.org</ux-option>
          <ux-option value=".edu">.edu</ux-option>
          <ux-option value=".cn">.cn</ux-option>
        </ux-select>
      </ux-input-group>

      <ux-input-group compact>
        <ux-select value="http://">
          <ux-option value="http://">http://</ux-option>
          <ux-option value="https://">https://</ux-option>
          <ux-option value="ftp://">ftp://</ux-option>
        </ux-select>
        <ux-input style="width:100px"
                  placeholder="Min" />
        <ux-input style="width:30px;border-left:none;background:#fff"
                  placeholder="~"
                  disabled />
        <ux-input style="width:100px;border-left:none; "
                  placeholder="Max" />
      </ux-input-group>
    </div>
    <div slot="desc">
      组合输入框, 当使用
      <code>compact</code>模式时,不需要使用
      <code>ux-col</code>区分列
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>


<script>
  import code from '@/code/input/group.vue';

  export default {
    data() {
      return {
        code,
      };
    },
    computed: {
      theme() {
        return this.$store.state.theme;
      },
    },
  };
</script>

<style lange="scss" scoped>
  .ux-input-group {
    margin-bottom: 20px;
    .ux-input {
      margin-bottom: 0;
    }
  }
</style>
