import { mount, waitTime } from '@cloud-sn/v-test-utils';
import {
  UxInput, UxSearchInput, UxTextarea, UxInputGroup
} from '..';

describe('ux-input', () => {
  it('render allow-clear correctly', () => {
    const wrapper = mount(UxInput, {
      propsData: {
        allowClear: true,
        value: 'test value',
      },
    });
    wrapper.find('i').trigger('click');
    expect(wrapper.vm.innerValue).toBe('');
  });

  it('show word limit correctly', () => {
    const wrapper = mount(UxInput, {
      propsData: {
        showWordLimit: true,
        maxlength: 20,
        value: 'test value',
      },
    });
    expect(wrapper.find('.ux-input-limit-word').element.innerHTML).toBe('10/20');
  });

  describe('addon and prefix/suffix', () => {
    it('with props', () => {
      /**
       * although the prefix and suffix can be use by props according to the handler program,
       * however they have not been defined in props (by 19040734)
       */
      const wrapper = mount(UxInput, {
        propsData: {
          addonBefore: 'addon-before',
          addonAfter: 'addon-after',
        },
      });
      expect(wrapper.findAll('.ux-input-group-addon').at(0).element.innerHTML).toBe('addon-before');
      expect(wrapper.findAll('.ux-input-group-addon').at(1).element.innerHTML).toBe('addon-after');
    });

    it('with slots', () => {
      const wrapper = mount(UxInput, {
        slots: {
          prefix: 'prefix',
          suffix: 'suffix',
          addonBefore: 'addon-before',
          addonAfter: 'addon-after',
        },
      });
      expect(wrapper.find('.ux-input-prefix').element.innerHTML).toBe('prefix');
      expect(wrapper.find('.ux-input-suffix').element.innerHTML).toBe('suffix');
      expect(wrapper.findAll('.ux-input-group-addon').at(0).element.innerHTML).toBe('addon-before');
      expect(wrapper.findAll('.ux-input-group-addon').at(1).element.innerHTML).toBe('addon-after');
    });
  });

  it('emit event correctly', async () => {
    const pressenterFn = jest.fn();
    const keydownFn = jest.fn();
    const blurFn = jest.fn();
    const inputFn = jest.fn();
    const wrapper = mount(UxInput, {
      listeners: {
        pressenter: pressenterFn,
        keydown: keydownFn,
        blur: blurFn,
        input: inputFn
      },
    });
    wrapper.trigger('focusin');
    wrapper.trigger('keydown.enter');
    expect(pressenterFn).toHaveBeenCalledTimes(1);
    wrapper.trigger('blur');
    expect(blurFn).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: 'initValue' });
    await waitTime();
    expect(wrapper.element.value).toBe('initValue');
    wrapper.setValue('inputChangeValue');
    await waitTime();
    expect(wrapper.element.value).toBe('inputChangeValue');
    expect(inputFn).toHaveBeenCalled();
    wrapper.vm.blur();
    expect(wrapper.vm.getValue()).toBe('inputChangeValue');
  });
});

describe('ux-search-input', () => {
  it('render search button correctly', async () => {
    const searchFn = jest.fn();
    const wrapper = mount(UxSearchInput, {
      propsData: {
        // eslint-disable-next-line
        enterButton: (h) => (<span>search</span>),
      },
      listeners: {
        search: searchFn
      }
    });
    expect(wrapper.find('button').element.innerHTML).toBe('<span>search</span>');
    wrapper.find('button').trigger('click');
    expect(searchFn).toHaveBeenCalledTimes(1);
    wrapper.setProps({ enterButton: '' });
    await waitTime();
    expect(wrapper.find('button').exists()).toBeFalsy();
  });

  it('search button event correctly', async () => {
    const searchFn = jest.fn();
    const pressenterFn = jest.fn();
    const blurFn = jest.fn();
    const wrapper = mount(UxSearchInput, {
      propsData: {
        enterButton: true,
      },
      listeners: {
        search: searchFn,
        pressenter: pressenterFn,
        blur: blurFn
      }
    });
    const inputWrapper = wrapper.find('input');
    inputWrapper.element.value = 'searchContent';
    inputWrapper.trigger('keydown.enter');
    await waitTime();
    expect(searchFn).toHaveBeenCalled();
    expect(pressenterFn).toHaveBeenCalled();
    inputWrapper.trigger('blur');
    await waitTime();
    expect(blurFn).toHaveBeenCalled();
    wrapper.vm.blur();
    await waitTime();
    expect(blurFn).toHaveBeenCalledTimes(2);
  });
});

describe('ux-textarea', () => {
  it('render style correctly', () => {
    const wrapper = mount(UxTextarea, {
      propsData: {
        textareaStyle: {
          backgroundColor: 'black',
        },
      },
    });
    expect(wrapper.find('textarea').element.style.backgroundColor).toBe('black');
  });

  it('render auto height correctly', async () => {
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      get: () => 26
    });
    const initTextValue = 'c\nggggggggg';
    const changeText = 'this is change Text';
    const mulitRowsText = 'c\nggggggggg\nffff\nkkkk';
    const wrapper = mount(UxTextarea, {
      propsData: {
        autoSize: { minRows: 2, maxRows: 3 },
        value: initTextValue,
        showWordLimit: true,
        textareaStyle: { width: '100px', fontSize: '14px', padding: '0px' },
      },
      attrs: {
        maxlength: 100
      }
    });
    const textareaWrapper = wrapper.find({ ref: 'textarea' });
    expect(textareaWrapper.element.value).toBe(initTextValue);
    expect(wrapper.find('.ux-input-limit-word').text()).toBe('11/100');
    wrapper.setProps({ value: changeText });
    await waitTime();
    expect(textareaWrapper.element.value).toBe(changeText);
    wrapper.find({ ref: 'textarea' }).setValue(mulitRowsText);
    await waitTime();
    expect(textareaWrapper.element.value).toBe(mulitRowsText);
    expect(textareaWrapper.attributes('style')).toEqual(expect.stringContaining('overflow-y: hidden'));
  });

  it('emit event is correctly', async () => {
    const inputFn = jest.fn();
    const pressenterFn = jest.fn();
    const keydownFn = jest.fn();
    const blurFn = jest.fn();

    const wrapper = mount(UxTextarea, {
      propsData: {
        autoSize: true,
        textareaStyle: { width: '100px', fontSize: '14px', padding: '0px' },
      },
      listeners: {
        input: inputFn,
        pressenter: pressenterFn,
        keydown: keydownFn,
        blur: blurFn
      }
    });
    const textareaWrapper = wrapper.find({ ref: 'textarea' });
    textareaWrapper.setValue('inputValue');
    await waitTime();
    expect(inputFn).toHaveBeenCalled();
    textareaWrapper.trigger('keydown.down');
    await waitTime();
    expect(keydownFn).toHaveBeenCalled();
    textareaWrapper.trigger('keydown.enter');
    await waitTime();
    expect(pressenterFn).toHaveBeenCalled();
    expect(keydownFn).toHaveBeenCalledTimes(2);
    textareaWrapper.trigger('change');
    textareaWrapper.trigger('blur');
    await waitTime();
    expect(blurFn).toHaveBeenCalled();
  });
});

describe('test input group', () => {
  it('compact mode', () => {
    const Test = {
      render() {
        return <UxInput style="width: 50%" />;
      },
    };
    const wrapper = mount(UxInputGroup, {
      slots: {
        default: [Test, Test],
      },
      propsData: {
        compact: true,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('different size', () => {
    const wrapper = mount(UxInputGroup, {
      slots: {
        default: UxInput,
      },
      propsData: {
        size: 'small',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    wrapper.setProps({ size: 'large' });
    expect(wrapper.element).toMatchSnapshot();
  });
});
