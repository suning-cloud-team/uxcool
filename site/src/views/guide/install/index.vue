<template>
  <article class="doc">

    <div class="mume markdown-preview   ">
      <h1 class="ux-heading"
          >UXCool</h1>
      <h2 class="ux-heading"
          id="%E6%94%AF%E6%8C%81%E7%8E%AF%E5%A2%83">支持环境</h2>

       <p>现代浏览器和 IE10 及以上(需要 polyfills)</p>
      <h2 class="ux-heading">安装</h2>

      <h3 class="ux-heading">使用 npm 或者 yarn 安装</h3>
      <p>推荐使用 npm 或 yarn 方式进行开发.</p>
      <p>UXCool 以
        <code>@suning/uxcool</code>发布于 snpm 上,并且使用 sass 作为 css 开发环境,所以在安装之前需要对 npm 作一些设置.</p>
      <ux-code >
npm config set registry=http://snpm.cnsuning.com
npm config set @suning:registry=http://snpm.cnsuning.com
// 如未用到sass则无需此配置
npm config set SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
      </ux-code>
      <blockquote>
        <p>若 npm 配置了 proxy 或 http-proxy 则需先移除</p>
      </blockquote>
      <p>下面可以安装 UXCool 了</p>
      <ux-code>npm install @suning/uxcool --save</ux-code>
      <ux-code>yarn add @suning/uxcool </ux-code>
      <h3 class="ux-heading">浏览器引入</h3>
      <p>在浏览器中使用
        <code>script</code>和
        <code>link</code>标签直接引入文件, 并使用全局变量
        <code>uxcool</code>.</p>
      <p>snpm 发布包内
        <code>@suning/uxcool/dist</code>目录下提供了
        <code>uxcool.js</code>,
        <code>uxcool.css</code>和
        <code>uxcool.min.js</code>,
        <code>uxcool.min.css</code>文件</p>
      <blockquote>
        <p>不推荐使用已构建文件,这样无法快速获得 bug 修复,且无法按需加载!</p>
      </blockquote>
      <h2 class="ux-heading" >示例</h2>

      <ux-code>
import Vue from &apos;vue&apos;;
import  UxCool from &apos;@suning/uxcool&apos;;

Vue.use(UxCool);
    </ux-code>
      <p>引入样式:</p>
      <ux-code>
import &apos;@suning/uxcool/dist/uxcool.css&apos;;
      </ux-code>
      <h3 class="ux-heading" >按需加载</h3>
      <ux-code>
import &apos;@suning/uxcool/es/select/style/css&apos;;
import { UxSelect,  UxOption, UxOptionGroup } from &apos;@suning/uxcool/es/select&apos;;
      </ux-code>
    </div>
  </article>
</template>

<script>
  export default {};
</script>
