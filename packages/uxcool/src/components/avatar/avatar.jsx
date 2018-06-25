import Icon from '../icon';
import { buildComponentName } from '../utils';

export default {
  name: buildComponentName('Avatar'),
  props: {
    prefixCls: {
      type: String,
      default: 'ux-avatar',
    },
    size: {
      type: String,
      default: 'default',
      validator(val) {
        return ['default', 'large', 'small'].indexOf(val) > -1;
      },
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['square', 'circle'].indexOf(val) > -1;
      },
    },
    src: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isExistsImage: true,
      scale: 1,
      txtOffsetWidth: 0,
    };
  },
  computed: {
    classes() {
      const {
        prefixCls, size, shape, icon, src, isExistsImage
      } = this;

      return {
        [prefixCls]: true,
        [`${prefixCls}-${size === 'large' ? 'lg' : 'sm'}`]: size === 'small' || size === 'large',
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-icon`]: icon,
        [`${prefixCls}-image`]: src && isExistsImage,
      };
    },
    style() {
      const { scale, txtOffsetWidth } = this;
      let r = {};
      if (scale >= 1) {
        r = {};
      } else {
        r = {
          position: 'absolute',
          display: 'inline-block',
          left: `calc(50% - ${txtOffsetWidth / 2}px)`,
          transform: `scale(${scale})`,
        };
      }
      return r;
    },
  },
  mounted() {
    this.prevAvatarTextRef = null;
    this.setScale();
  },
  updated() {
    this.setScale();
  },
  methods: {
    onError() {
      this.isExistsImage = false;
    },
    setScale() {
      const { $el, $refs: { avatarTextRef }, prevAvatarTextRef } = this;
      if (avatarTextRef && $el) {
        if (prevAvatarTextRef && avatarTextRef.innerHTML === prevAvatarTextRef.innerHTML) {
          return;
        }
        this.prevAvatarTextRef = avatarTextRef.cloneNode(true);
        const txtW = avatarTextRef.offsetWidth;
        const wrapW = $el.getBoundingClientRect().width - 8;

        const scale = txtW === 0 ? 1 : wrapW / txtW;
        if (scale < 1) {
          this.txtOffsetWidth = txtW;
          this.scale = scale;
        } else {
          this.scale = 1;
        }
      }
    },
  },
  render() {
    const {
      $slots, classes, style, src, isExistsImage, icon, onError
    } = this;

    let element = null;
    if (src && isExistsImage) {
      element = <img src={src} on-error={onError} />;
    } else if (icon) {
      element = <Icon type={icon} />;
    } else {
      const slotDefault = $slots.default;
      element = (
        <span ref="avatarTextRef" style={style}>
          {slotDefault}
        </span>
      );
    }
    return (
      <span ref="avatarWrapref" class={classes}>
        {element}
      </span>
    );
  },
};
