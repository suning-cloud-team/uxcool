import {
  mount, waitTime, triggerEvent, createWrapper
} from '@cloud-sn/v-test-utils';
import { UxForm, UxFormItem, UxFieldDecorator } from '..';
import { UxInput } from '../../input/index';
import { UxButton } from '../../button';
import { UxSelect, UxOption } from '../../select';

describe('form', () => {
  describe('validator work correctly', () => {
    it('validator message', async () => {
      const wrapper = mount({
        render() {
          return (
            <UxForm
              messages={{
                required: '必须输入一个value',
                in: (field) => `${field}必须是一个有效value`,
              }}
            >
              <UxFormItem label="field1">
                <UxFieldDecorator name="field1" rules="required">
                  <UxInput ref="input1Ref" />
                </UxFieldDecorator>
              </UxFormItem>
              <UxFormItem label="field2">
                <UxFieldDecorator name="field2" alias="域2" rules="in:1,2,3">
                  <UxInput ref="input2Ref" value="4" />
                </UxFieldDecorator>
              </UxFormItem>
              <UxFormItem label="field3">
                <UxFieldDecorator name="field3" rules={{ digits: 4, message: '长度不为定长4' }}>
                  <UxInput ref="input3Ref" value="aabbcc" />
                </UxFieldDecorator>
              </UxFormItem>
            </UxForm>
          );
        },
      });
      await waitTime();
      const inputEle1 = wrapper.find({ ref: 'input1Ref' });
      const inputEle2 = wrapper.find({ ref: 'input2Ref' });
      const inputEle3 = wrapper.find({ ref: 'input3Ref' });
      inputEle1.vm.$emit('blur');
      inputEle2.vm.$emit('blur');
      inputEle3.vm.$emit('blur');
      await waitTime(50);
      expect(wrapper.findAll('.ux-form-explain').at(0).element.innerHTML).toBe('必须输入一个value');
      expect(wrapper.findAll('.ux-form-explain').at(1).element.innerHTML).toBe(
        '域2必须是一个有效value'
      );
      expect(wrapper.findAll('.ux-form-explain').at(2).element.innerHTML).toBe('长度不为定长4');
    });

    describe('validator options', () => {
      it('initial', async () => {
        const wrapper = mount({
          render() {
            return (
              <UxForm>
                <UxFormItem label="field1">
                  <UxFieldDecorator name="field1" rules="required" validator={{ initial: true }}>
                    <UxInput />
                  </UxFieldDecorator>
                </UxFormItem>
              </UxForm>
            );
          },
        });
        await waitTime(50);
        expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('field1 是必须的.');
      });

      it('events', async () => {
        const wrapper = mount({
          render() {
            return (
              <UxForm>
                <UxFormItem label="field1">
                  <UxFieldDecorator
                    name="field1"
                    rules="required"
                    validator={{ events: 'my-event' }}
                  >
                    <UxInput ref="input1Ref" />
                  </UxFieldDecorator>
                </UxFormItem>
              </UxForm>
            );
          },
        });
        await waitTime(50);
        expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
        wrapper.find({ ref: 'input1Ref' }).vm.$emit('my-event');
        await waitTime(50);
        expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('field1 是必须的.');
      });

      it('disable', async () => {
        const wrapper = mount({
          render() {
            return (
              <UxForm>
                <UxFormItem label="field1">
                  <UxFieldDecorator
                    name="field1"
                    rules="required"
                    validator={{ events: 'my-event', disable: true }}
                  >
                    <UxInput ref="input1Ref" />
                  </UxFieldDecorator>
                </UxFormItem>
              </UxForm>
            );
          },
        });
        await waitTime(50);
        expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
        wrapper.find({ ref: 'input1Ref' }).vm.$emit('my-event');
        await waitTime(50);
        expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
      });

      it('delay', async () => {
        const wrapper = mount({
          render() {
            return (
              <UxForm>
                <UxFormItem label="field1">
                  <UxFieldDecorator
                    name="field1"
                    rules="required"
                    validator={{ events: 'my-event', delay: 200 }}
                  >
                    <UxInput ref="input1Ref" />
                  </UxFieldDecorator>
                </UxFormItem>
              </UxForm>
            );
          },
        });
        await waitTime(50);
        expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
        wrapper.find({ ref: 'input1Ref' }).vm.$emit('my-event');
        await waitTime(50);
        expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
        await waitTime(250);
        expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('field1 是必须的.');
      });
    });
  });

  describe('form render correctly', () => {
    it('required', async () => {
      const wrapper = mount({
        render() {
          return (
            <UxForm>
              <UxFormItem label="field1" ref="formItem1Ref">
                <UxFieldDecorator name="field1" rules="required">
                  <UxInput ref="input1Ref" />
                </UxFieldDecorator>
              </UxFormItem>
            </UxForm>
          );
        },
      });
      await waitTime();
      expect(wrapper.find('label').element.innerHTML).toBe('field1');
      expect(wrapper.contains('.ux-form-item-required')).toBeTruthy();
      expect(wrapper.contains('.ux-form-item-no-colon')).toBeTruthy();

      wrapper.find({ ref: 'formItem1Ref' }).setProps({ required: false });
      await waitTime();
      expect(wrapper.contains('.ux-form-item-required')).not.toBeTruthy();

      wrapper.find({ ref: 'formItem1Ref' }).setProps({ colon: true });
      await waitTime();
      expect(wrapper.contains('.ux-form-item-no-colon')).not.toBeTruthy();
    });

    it('messages with props', async () => {
      const wrapper = mount({
        render() {
          return (
            <UxForm>
              <UxFormItem label="field1" extra="warning" help="请正确输入">
                <UxFieldDecorator name="field1" rules="required">
                  <UxInput ref="input1Ref" />
                </UxFieldDecorator>
              </UxFormItem>
            </UxForm>
          );
        },
      });
      await waitTime();
      expect(wrapper.find('.ux-form-extra').element.innerHTML).toBe('warning');
      expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('请正确输入');
      wrapper.find({ ref: 'input1Ref' }).vm.$emit('blur');
      await waitTime(50);
      expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('field1 是必须的.');
    });

    it('messages with slots', async () => {
      const wrapper = mount({
        render() {
          return (
            <UxForm>
              <UxFormItem>
                <template slot="label">field1</template>
                <template slot="extra">warning</template>
                <template slot="help">请正确输入</template>
                <UxFieldDecorator name="field1" rules="required">
                  <UxInput ref="input1Ref" />
                </UxFieldDecorator>
              </UxFormItem>
            </UxForm>
          );
        },
      });
      await waitTime();
      expect(wrapper.find('.ux-form-extra').element.innerHTML).toBe('warning');
      expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('请正确输入');
      wrapper.find({ ref: 'input1Ref' }).vm.$emit('blur');
      await waitTime(50);
      expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('field1 是必须的.');
    });
  });

  describe('form methods work corrctly', () => {
    it('object methods work corrctly', async () => {
      const wrapper = mount({
        template: `
      <ux-form ref="uxFormRef">
        <ux-form-item label="field1">
          <ux-field-decorator name="field1" rules="required">
            <ux-input v-model="value"
              ref="input1Ref" />
          </ux-field-decorator>
        </ux-form-item>
      </ux-form>
      `,
        components: {
          UxForm,
          UxFormItem,
          UxFieldDecorator,
          UxInput,
        },
        data() {
          return {
            value: '',
          };
        },
      });
      await waitTime();
      expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
      const uxFormEle = wrapper.find({ ref: 'uxFormRef' });
      const inputEle = wrapper.find({ ref: 'input1Ref' });
      const validateResult = await uxFormEle.vm.validate();
      expect(validateResult.valid).not.toBeTruthy();
      expect(wrapper.find('.ux-form-explain').text()).toBe('field1 是必须的.');
      const fieldError = uxFormEle.vm.getFieldError('field1');
      const fieldsError = uxFormEle.vm.getFieldsError();
      expect(fieldError).toBe('field1 是必须的.');
      expect(fieldsError.field1.join('')).toBe('field1 是必须的.');
      uxFormEle.vm.clearErrors();
      await waitTime(100);
      expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();

      wrapper.setData({
        value: 'a',
      });
      await waitTime();
      expect(inputEle.element.value).toBe('a');
      uxFormEle.vm.resetFields();
      await waitTime();
      expect(inputEle.element.value).toBe('');
    });

    it('extends validator works correctly', async () => {
      UxForm.extendValidator('myRule', {
        validate(value) {
          return value === 'Name';
        },
        getMessage(field) {
          return `${field} 必须等于 Name`;
        },
      });
      const wrapper = mount({
        render() {
          return (
            <UxForm>
              <UxFormItem>
                <UxFieldDecorator name="field1" rules="myRule">
                  <UxInput ref="inputRef" value="test" />
                </UxFieldDecorator>
              </UxFormItem>
            </UxForm>
          );
        },
      });
      await waitTime();
      const inputEle = wrapper.find({ ref: 'inputRef' });
      inputEle.vm.$emit('blur');
      await waitTime();
      expect(wrapper.find('.ux-form-explain').element.innerHTML).toBe('field1 必须等于 Name');
      inputEle.setProps({ value: 'Name' });
      await waitTime();
      inputEle.vm.$emit('blur');
      await waitTime(100);
      expect(wrapper.contains('.ux-form-explain')).not.toBeTruthy();
      wrapper.destroy();
    });

    it('submit works correctly', async () => {
      const submitFn = jest.fn();
      const props = {
        messages: { required: 'this is requreid data!' },
        layout: 'vertical'
      };
      const wrapper = mount({
        data() {
          return {
            rules: 'required'
          };
        },
        render() {
          const { rules } = this;
          return (
            <UxForm ref="formRef" { ...{ props, on: { submit: submitFn } }}>
              <UxFormItem label="field1" colon>
                <UxFieldDecorator name="field1" rules={rules}>
                  <UxInput ref="inputRef" />
                </UxFieldDecorator>
              </UxFormItem>
              <UxFormItem>
                <UxButton type='primary' html-type="submit">submit</UxButton>
              </UxFormItem>
            </UxForm>
          );
        },
      });
      const inputEle = wrapper.find({ ref: 'inputRef' });
      await triggerEvent(inputEle, 'blur');
      expect(wrapper.find('.ux-form-explain').text()).toBe('this is requreid data!');
      inputEle.find('input').element.value = 'testvalue';
      await triggerEvent(inputEle.find('input'), 'input');
      wrapper.find('.ux-form').trigger('submit');
      await waitTime(100);
      expect(createWrapper(wrapper.vm.$children[0]).emitted().submit.length).toBe(1);
      expect(submitFn).toHaveBeenCalled();
      wrapper.setData({
        rules: [
          'required|numeric',
          {
            min: 3,
            message() {
              return '3个字符';
            },
          },
          { max: 5, message: '最大5个字符' },
        ],
      });
      await waitTime(50);
      await triggerEvent(inputEle, 'blur');
      expect(wrapper.find('.ux-form-explain').text()).toBe('field1 只能包含数字字符.');
      wrapper.destroy();
    });

    it('confirm validator correctly', async () => {
      const wrapper = mount({
        template: `
          <ux-form
            ref="formRef"
            @submit="onSubmit"
          >
            <ux-form-item label="E-mail">
              <ux-field-decorator name="email" rules="required|email|initial" :valuePath="'form.email'">
                <ux-input />
              </ux-field-decorator>
            </ux-form-item>
            <ux-form-item label="Password">
              <ux-field-decorator
                name="password"
                :rules="{ required: true, regex: /^\\d{6,}$/i }"
                :validator="{ alias: 'Password' }"
              >
                <ux-input type="password" v-model="form.password" />
              </ux-field-decorator>
            </ux-form-item>
            <ux-form-item label="Confirm Password">
              <ux-field-decorator
                name="confirm"
                rules="required|confirmed:@password"
                :validator="{ alias: 'Confirm Password' }"
              >
                <ux-input type="password" v-model="form.confirm" />
              </ux-field-decorator>
            </ux-form-item>
            <ux-form-item label="Phone Number">
              <ux-field-decorator name="phone" rules="required">
                <ux-input v-model="form.phone">
                  <ux-field-decorator slot="addonBefore" name="phoneSelect">
                    <ux-select v-model="form.phoneSelect" style="width:80px">
                      <ux-option value="86" label="+86" />
                      <ux-option value="87" label="+87" />
                    </ux-select>
                  </ux-field-decorator>
                </ux-input>
              </ux-field-decorator>
            </ux-form-item>
            <ux-form-item :wrapper-col="{ offset: 8 }">
              <ux-button type="primary" html-type="submit">Register</ux-button>
            </ux-form-item>
          </ux-form>        
        `,
        components: {
          UxForm,
          UxFormItem,
          UxFieldDecorator,
          UxInput,
          UxSelect,
          UxOption,
          UxButton
        },
        data() {
          return {
            form: {
              email: '',
              userName: '',
              password: '',
              confirm: '',
              phone: '',
              phoneSelect: '87'
            },
          };
        },
        methods: {
          onSubmit() {
            const {
              $refs: { formRef },
            } = this;
            if (formRef) {
              formRef.validate();
            }
          },
        },
      });
      await waitTime();
      wrapper.findAll('[type="password"]').at(0).setValue('123456');
      wrapper.findAll('[type="password"]').at(1).setValue('1234567');
      await waitTime(50);
      const confirmPassword = wrapper.findAll('.ux-form-item').at(2);
      expect(confirmPassword.find('.ux-form-explain').text()).toBe('Confirm Password 不能和password匹配.');
    });
  });
});
