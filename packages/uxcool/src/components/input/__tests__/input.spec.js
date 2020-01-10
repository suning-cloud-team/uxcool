import { mount } from '@suning/v-test-utils';
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

  it('emit event correctly', () => {
    const pressenterFn = jest.fn();
    const keydownFn = jest.fn();
    const blurFn = jest.fn();
    const wrapper = mount(UxInput, {
      listeners: {
        pressenter: pressenterFn,
        keydown: keydownFn,
        blur: blurFn,
      },
    });
    wrapper.trigger('focusin');
    wrapper.trigger('keydown.enter');
    expect(pressenterFn).toHaveBeenCalledTimes(1);
    wrapper.trigger('blur');
    expect(blurFn).toHaveBeenCalledTimes(1);
  });
});

describe('ux-search-input', () => {
  it('render search button correctly', () => {
    const searchFn = jest.fn();
    const wrapper = mount(UxSearchInput, {
      propsData: {
        // eslint-disable-next-line
        enterButton: (h) => <span>search</span>,
      },
      listeners: {
        search: searchFn,
      },
    });
    expect(wrapper.find('button').element.innerHTML).toBe('<span>search</span>');
    wrapper.find('button').trigger('click');
    expect(searchFn).toHaveBeenCalledTimes(1);
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
    // const wrapper = mount(UxTextarea, {
    //   propsData: {
    //     autoSize: { minRow: 2, maxRow: 6 },
    //     textareaStyle: { width: '100px', fontSize: '14px', padding: '0px' },
    //   },
    // });
    // cannot be tested due to height is uncatchable in jsdom
    // TODO
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
