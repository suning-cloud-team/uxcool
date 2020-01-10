import { mount, waitTime } from '@suning/v-test-utils';
import { UxForm, UxFormItem, UxFieldDecorator } from '..';
import { UxInput } from '../../input/index';

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
    });
  });
});
