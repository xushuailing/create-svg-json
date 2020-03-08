# reant-native 使用自定义 svg 脚本说明

> 制作svg

1. 把下载的 `svg` 图片 放到 `src/assets/svg` 中
2. 在 `package.json` 中添加 `"svg": "node create-svg-json.js"` 脚本
3. 执行下面命令

```sh
yarn svg [assetsDir]

# assetsDir 可指定资源文件夹(可选)(默认路径: src/assets/svg)
```
4. 会生成一个 `svgs.js` 为svg数据
```js
// 生成的数据格式, key为svg名字, value为svg标签
{
  xxx: "",
  yyy: ""
}
```

> 使用svg

1. 安装 `react-native-svg` 依赖
```sh
yarn add react-native-svg
or
npm i react-native-svg
```
2. 引入 `react-native-svg` 依赖的 `SvgXml` 组件
```js
import { SvgXml } from 'react-native-svg';
```
3. 引入 `svgs.js` 文件
4. 使用 `SvgXml`
```jsx
import { SvgXml } from 'react-native-svg';
import Svgs from 'xxx/svgs.js';

<SvgXml width={100} height={100} xml={Svgs.xxx} />;
```
