<template>
  <ux-demo title="动态增减表单项"
           :height="200">
    <div slot="demo">
      <ux-form ref="formRef"
               @submit="onSubmit">
        <ux-form-item v-for="(item,i) in items"
                      :key="i"
                      v-bind="getFormItemAttrs(i)"
                      help="abc">
          <ux-field-decorator :name="`field${i}`"
                              rules="required">
            <ux-input v-model="item.value"
                      style="width:80%;margin-right:8px;" />
            <ux-icon type="minus_circle_o"
                     @click="()=>removeItem(item)" />
          </ux-field-decorator>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button @click="addItem"
                     type="dashed"
                     style="width: 100%">
            <ux-icon type="add" />Add Field
          </ux-button>
        </ux-form-item>
        <ux-form-item :wrapper-col="{offset:8}">
          <ux-button type="primary"
                     html-type="submit">
            Submit
          </ux-button>
          <ux-button @click="reset"
                     style="margin-left:10px">
            Reset
          </ux-button>
        </ux-form-item>
      </ux-form>
    </div>
    <div slot="desc">
      动态增加,减少表单项
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/dynamic.vue';

  export default {
    data() {
      return {
        code,
        items: [],
      };
    },
    methods: {
      getFormItemAttrs(i) {
        return i === 0
          ? { label: `Field${i}`, labelCol: { xs: 24, sm: 8 }, wrapperCol: { xs: 24, sm: 16 } }
          : { wrapperCol: { span: 16, offset: 8 } };
      },
      addItem() {
        this.items.push({
          value: '2',
        });
      },
      removeItem(item) {
        this.items = this.items.filter(v => v !== item);
      },
      onSubmit() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            console.log('Receive values', values);
            if (!valid) {
              console.log('valid error');
            }
          });
        }
      },
      reset() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.resetFields();
        }
      },
    },
  };
</script>
