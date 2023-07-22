# rollup-plugin-import-to-const
将 import 导入变量替换为 const 命名变量 的 rollup 插件。
```js
import { computed } from 'vue'
↓
const { computed } = Vue
```
## 使用
安装
```sh
npm i -D rollup-plugin-import-to-const
# or
pnpm i -D rollup-plugin-import-to-const
```
引入
```js
import importToConst from 'rollup-plugin-import-to-const'

const config = {
  external: [
      'vue',
      'element-plus',
  ],
  output: {
      globals: {
          vue: 'Vue', // import { computed } from 'vue' => const { computed } = Vue
          'element-plus': 'ElementPlus', // import { ElRate } from 'element-plus' => const { ElRate } = ElementPlus
      },
  },
  plugins: [
      // other plugins...
      importToConst({
          'foo': 'Foo', // import { example } from 'foo' => const { example } = Foo
      }),
  ]
}
```
插件会根据 `output.globals` 上的变量映射规则以及传入插件的映射规则去替换代码中的变量。比如上面的示例，最后得到的映射规则为：
```js
{
    vue: 'Vue',
    'element-plus': 'ElementPlus',
    'foo': 'Foo',
}
```
通常情况下不需要向插件传递参数，让它根据 `output.globals` 上的变量映射规则去替换变量即可。
