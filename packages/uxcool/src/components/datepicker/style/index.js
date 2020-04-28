import '../../style/index.scss';
import './index.scss';

// dependency style
import '../../input/style/index.scss';
// 打包脚本目前只会替换style/index.js中的scss后缀，为了防止按需引入import '@suning/uxcool/es/xxx/style/css'方式既导入es/style/index.css，
// 又导入es/style/index.scss造成最终打包的css文件重复导入公共样式，把slider.js中的导入语句直接拷贝过来
// import './slider';
import '../../grid/style/index.scss';
import '../../select/style/index.scss';
import '../../tag/style/index.scss';
