<template>
  <ux-demo title="高级搜索"
           :height="200">
    <div slot="demo">
      <ux-form ref="formRef"
               @submit="onSubmit">
        <ux-row :gutter="24">
          <ux-col :span="8"
                  v-for="i in cnt"
                  :key="i"
                  v-show="isShow(i)">
            <ux-form-item :label="`Field ${i}`">
              <ux-field-decorator :name="`field-${i}`"
                                  rules="required">
                <ux-input v-model="form['field'+i]" />
              </ux-field-decorator>
            </ux-form-item>
          </ux-col>
        </ux-row>
        <ux-row style="text-align:right">
          <ux-col :span="24"
                  class="search-form-btn">
            <ux-button type="primary"
                       html-type="submit">Search</ux-button>
            <ux-button style="margin-left:10px;"
                       @click="reset">Clear</ux-button>
            <a @click="toggle">Collapse
              <ux-icon :type="expand ?'up' : 'down'" />
            </a>
          </ux-col>
        </ux-row>
      </ux-form>
    </div>
    <div slot="desc">
      三列布局,常用于数据表格高级查询
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/search.vue';

  export default {
    data() {
      return {
        code,
        expand: false,
        form: { checkbox: [] },
      };
    },
    computed: {
      cnt() {
        return this.expand ? 10 : 6;
      },
    },
    created() {
      this.form = {
        ...this.form,
        ...Array(10)
          .fill(0)
          .reduce((r, k, i) => {
            const nr = r;
            nr[`field${i + 1}`] = '';
            return nr;
          }, {}),
      };
    },
    methods: {
      isShow(i) {
        return i <= this.cnt;
      },
      toggle() {
        this.expand = !this.expand;
      },
      reset() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.resetFields();
        }
      },
      onSubmit() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            if (!valid) {
              console.log('Receive values', values);
            }
          });
        }
      },
      destroy() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.$destroy();
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  /deep/ .demo-example {
    width: 100%;
    .search-form-btn {
      button + a {
        margin-left: 10px;
      }
    }
  }
</style>
