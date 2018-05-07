<template>
  <ux-demo title="弹出层操作表单"
           :height="200">
    <div slot="demo">
      <div>
        <h4>modal</h4>
        <div class="demo">
          <ux-button @click="()=>showModal(modalVal)">showModal</ux-button>
          <ux-button @click="()=>showModal(modalVal1)">showModal1</ux-button>
          <ux-modal v-model="visible"
                    control
                    title="New Collection"
                    @ok="onOk"
                    @cancel="onCancel">
            <ux-form ref="formRef"
                     layout="vertical">
              <ux-form-item label="Title">
                <ux-field-decorator name="title"
                                    rules="required">
                  <ux-input v-model="form.title" />
                </ux-field-decorator>
              </ux-form-item>
              <ux-form-item label="Description">
                <ux-field-decorator name="desc"
                                    rules="required">
                  <ux-input v-model="form.desc" />
                </ux-field-decorator>
              </ux-form-item>
              <ux-form-item>
                <ux-field-decorator name="role"
                                    rules="required">
                  <ux-radio-group v-model="form.role">
                    <ux-radio value="public"
                              label="public" />
                    <ux-radio value="private"
                              label="private" />
                  </ux-radio-group>
                </ux-field-decorator>
              </ux-form-item>
            </ux-form>
          </ux-modal>
        </div>
      </div>
    </div>
    <div slot="desc">
      当用户需要新增一个列表项时,可以使用弹出层来操作表单,创建新项
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/modal.vue';

  const defaultForm = {
    title: '',
    desc: '',
    role: 'public',
  };
  export default {
    data() {
      return {
        code,
        visible: false,
        form: {
          ...defaultForm,
        },
        modalVal: {
          title: 'modalVal',
          desc: 'test in modalVal',
        },
        modalVal1: {
          desc: 'test in modalVal',
          role: 'private',
        },
      };
    },
    methods: {
      setVisible(flag) {
        this.visible = flag;
      },
      clearErrors() {
        const { $refs: { formRef } } = this;
        if (formRef) {
          formRef.clearErrors();
        }
      },
      showModal(val) {
        const { visible, clearErrors } = this;
        clearErrors();
        this.form = { ...defaultForm, ...val };
        this.visible = !visible;
      },
      onOk() {
        const { $refs: { formRef }, setVisible } = this;
        if (formRef) {
          formRef.validate().then(({ valid, values }) => {
            console.log('Receive values', values);
            if (!valid) {
              return;
            }
            setVisible(false);
          });
        }
      },
      onCancel() {
        this.setVisible(false);
      },
    },
  };
</script>
