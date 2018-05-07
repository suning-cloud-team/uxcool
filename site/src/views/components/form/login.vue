<template>
  <ux-demo title="水平登陆框"
           :height="200">
    <div slot="demo">
      <ux-form @form-flags="onFormFlags"
               layout="inline">
        <ux-form-item>
          <ux-field-decorator name="name"
                              rules="required">
            <ux-input placeholder="UserName"
                      v-model="form.userName">
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
                      v-model="form.password">
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
        </ux-form-item>
      </ux-form>
    </div>
    <div slot="desc">
      水平登陆框, 常用于顶部导航栏
    </div>
    <ux-code slot="code">
      {{ code }}
    </ux-code>
  </ux-demo>
</template>

<script>
  import code from '@/code/form/login.vue';

  export default {
    data() {
      return {
        code,
        form: {
          userName: '',
          password: '',
        },
        invalid: false,
      };
    },
    methods: {
      onFormFlags(flags) {
        this.invalid = flags.invalid;
      },
    },
  };
</script>
