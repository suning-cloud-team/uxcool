<template>
  <div>
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
</template>

<script>
  export default {
    data() {
      return {
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
