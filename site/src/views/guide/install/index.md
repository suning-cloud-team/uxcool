# UXCool

## 支持环境

* 现代浏览器和 IE10 及以上(需要 polyfills)

## 安装

### 使用 npm 或者 yarn 安装

推荐使用 npm 或 yarn 方式进行开发.

UXCool 以`@suning/uxcool`发布于 snpm 上,并且使用 sass 作为 css 开发环境,所以在安装之前需要对 npm 作一些设置.

```bash
npm config set registry=https://registry.npm.taobao.org/

npm config set @suning:registry=http://snpm.cnsuning.com

npm config set SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
```

下面可以安装 UXCool 了

```bash
npm install @suning/uxcool --save
```

```bash
yarn add @suning/uxcool
```

## 浏览器引入

在浏览器中使用`script`和 `link`标签直接引入文件, 并使用全局变脸`uxcool`.

snpm 发布包内`@suning/uxcool/dist`目录下提供了`uxcool.js`,`uxcool.css`和`uxcool.min.js`, `uxcool.min.css`文件

> 不推荐使用已构建文件,无法快速获得 bug 修复,且无法按需加载

## 示例

```javascript
import Vue from 'vue';
import UxCool from '@suning/uxcool';

Vue.use(UxCool);
```

引入样式:

```javascript
import '@suning/uxcool/dist/uxcool.css';
```

#### 按需加载

```javascript
import '@suning/uxcool/es/select/style/css';
import { UxSelect, UxOption, UxOptionGroup } from '@suning/uxcool/es/select';
```
