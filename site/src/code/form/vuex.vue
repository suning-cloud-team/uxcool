<template>
  <ux-form ref="formRef"
           layout="inline"
           @submit="onSubmit">
    <ux-form-item>
      <ux-field-decorator name="name"
                          rules="required">
        <ux-input placeholder="UserName"
                  :value="userName"
                  @input="updateUserName">
          <ux-icon type="account"
                   slot="prefix"
                   style="color:rgba(0,0,0,.25)" />
        </ux-input>
      </ux-field-decorator>
    </ux-form-item>
    <ux-form-item>
      <ux-field-decorator name="password"
                          :rules="{required:true, regex: /^\d{6,}$/i}">
        <ux-input type="password"
                  placeholder="Password"
                  :value="password"
                  @input="updatePassword">
          <ux-icon type="lock"
                   slot="prefix"
                   style="color:rgba(0,0,0,.25)" />
        </ux-input>
      </ux-field-decorator>
    </ux-form-item>
    <ux-form-item>
      <ux-button type="primary"
                 :disabled="invalid"
                 html-type="submit">Log in</ux-button>

      <ux-button @click="reset"
                 style="margin-left:10px;">clear</ux-button>
    </ux-form-item>
  </ux-form>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        invalid: false,
      };
    },
    computed: mapState({
      userName: state => state.form.userName,
      password: state => state.form.password,
    }),
    created() {
      // this.updateUserName('abc');
      // this.updatePassword('123');
    },
    methods: {
      ...mapMutations(['updateUserName', 'updatePassword']),
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

  // vuex store code
  // modules: {
  //     form: {
  //       state: {
  //         userName: '',
  //         password: '',
  //       },
  //       mutations: {
  //         updateUserName(state, name) {
  //           const nState = state;
  //           nState.userName = name;
  //         },
  //         updatePassword(state, pwd) {
  //           const nState = state;
  //           nState.password = pwd;
  //         },
  //       },
  //     },
  //   },
</script>
