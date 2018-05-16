<template>
  <article class="doc">
    <h1 class="ux-heading">快速上手</h1>

    <ux-heading level="2" id="overview">概览</ux-heading>
    <p><code>uxcool</code>组件大致分为通用组件和业务组件。</p>
    <p>其中通用组件可复用性比较高；而业务组件是对以往项目中碰到的一些业务功能的简单封装，耦合了部分业务规则，复用性不是很高, 封装的也不是很灵活，一般仅提供一种示例参考，这一类组件归在<code>extra</code>目录下，变动性比较大，后期可能会优化或者删除，开发人员根据实际项目需要，按需引入。</p>

    <ux-heading level="2" id="general">引入通用组件</ux-heading>
    <p>一般在webpack入口文件<code>main.js</code>中如下配置：</p>
    <ux-code non-copyable>
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Routers from './router.js';

// 引入通用组件库（不包含业务组件）
import Uxcool from '@suning/uxcool/es/index';

// 引入组件库样式
import '@suning/uxcool/dist/uxcool.css';

Vue.use(VueRouter);
Vue.use(Uxcool);

/*
 * 或者按需引入
 * import { UxBadge, UxProgress} from '@suning/uxcool/es/components';
 * import '@suning/uxcool/es/badge/style/index.css';
 * import '@suning/uxcool/es/progress/style/index.css';
 *
 * Vue.component(UxBadge.name, UxBadge);
 * Vue.component(UxProgress.name, UxProgress);
 */


// The routing configuration
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
    </ux-code>

    <ux-heading level="2" id="business">引入业务组件</ux-heading>
    <p>对于业务组件，推荐按需引入。<code>dist/uxcool-extra</code>样式文件也包含了样式库核心样式，所以在引入了通用组件的情况下，请尽量避免同时再引<code>dist/uxcool-extra</code>，可以参照以下方式：</p>

    <ux-code non-copyable>
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Routers from './router.js';
// 引入组件库（不包含业务组件）
import Uxcool from '@suning/uxcool/es/index';

// 引入业务组件
import UxcoolExtra from '@suning/uxcool/es/extra/index';
// 引入组件库样式
import '@suning/uxcool/dist/uxcool.css';

// 按需分别引入对应的业务组件样式
import '@suning/uxcool/es/extra/card/style/index.css';
import '@suning/uxcool/es/extra/chart/style/index.css';
import '@suning/uxcool/es/extra/topology/style/index.css';

Vue.use(VueRouter);
Vue.use(Uxcool);
Vue.use(UxcoolExtra);

// The routing configuration
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

    </ux-code>

    <ux-heading level="2" id="custom">定制主题</ux-heading>
    <p>Uxcool使用SCSS编写，如果你的项目也使用SCSS,则可以直接在项目中修改SCSS变量。</p>
    <p>你可以新建一个样式文件，如<code>custom.scss</code>:</p>

    <ux-code non-copyable>
// custom.scss
// 修改主色调为绿色
$primary-color: #67c23a;

// ** 必需 **
// sass不提供url rewriting功能，所有的链接资源都是相对输出文件而言，所以需要手动覆盖字体图标路径
$icon-url: '~@suning/uxcool/dist/assets/fonts/uxcool';

@import '~@suning/uxcool/dist/uxcool.scss';
// extra模块比较偏业务，没有放入通用组件，依赖了通用公共样式，所以在已有公共样式的情况下，直接引es模块下的样式就行了
@import '~@suning/uxcool/es/extra.scss';
    </ux-code>

    <p>然后在项目入口文件引入以上样式文件：</p>
    <ux-code non-copyable>
import Vue from 'vue';
import Uxcool from '@suning/uxcool/es/index';
import UxcoolExtra from '@suning/uxcool/es/extra/index';

// 直接引入scss文件
import './custom.scss';

Vue.use(Uxcool);
Vue.use(UxcoolExtra);
    </ux-code>

    <blockquote>
      由于SASS的限制，使用样式库SCSS文件，字体图标路径一定要覆盖。
    </blockquote>

    <p>上面的例子也是目前定制主题的最简单方式：只修改主色调。对于需要深度定制主题的需求，可以修改其他预定义变量的值，具体变量可参考<code>@suning/uxcool/es/style/themes/_default.scss</code>（目前变量定义有些混乱，会在后续版本中优化完善）。</p>
    <p>对于非SCSS的项目组，如果想要定制主题，可用页面提供的在线编译主题功能，下载编译好的CSS文件; 如果想要深度定制，目前只能本地修改参数，编译好后放入项目工程：</p>
    <ux-code non-copyable>
// 克隆项目源码
git clone `http://git.cnsuning.com/ux/uxcool-lerna.git
// 安装项目依赖
npm run bootstrap
// TODO:修改@suning/uxcool/es/style/themes/_default.scss的变量
// 运行编译命令
npm run build
// TODO: 把dist目录下的CSS文件拷贝到项目工程中
    </ux-code>
    <blockquote>
      <p>目前主题定制支持度不是很高，建议项目组只修改主色调等皮肤色值。</p>
      <p>TODO: 后续版本会移除绝大多数组件中的深色样式，通过变量生成深色主题，从而精简样式定义。也会提供更友好的主题定制方式。</p>
    </blockquote>
    <h2 class="ux-heading">兼容性</h2>
    <p> UXCool 兼容所有现代浏览器和IE10+.</p>
    <p>
      对于IE系列浏览器和其它低版本现代浏览器,需要提供<a href="https://github.com/paulmillr/es6-shim">es6-shim</a>等Polyfills的支持
    </p>
    <p>
      如果使用babel,则推荐使用babel-polyfill来替换上面的shim
    </p>
     <blockquote>
        不要同时使用<a href="https://babeljs.io/docs/usage/polyfill/">babel-polyfill</a>和<a href="https://github.com/paulmillr/es6-shim">es6-shim</a>
    </blockquote>
    <h2 class="ux-heading">小贴士</h2>
    <p>button组件之间可能会存在间隙, 这是由于空白字符占位, 可以通过设置vue-loader的<code>options.preserveWhitespace=false</code>在编译时将空白字符移除</p>
  </article>
</template>

<script>
  export default {};

</script>
