# rollup-plugin-import-to-const

将 import 导入变量替换为 const 命名变量的 rollup 插件，主要用于在前端项目中加载 esm 格式的远程组件。较常见的使用场景可能是低代码平台加载远程组件。

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
      importToConst(),
  ]
}
```

插件会根据 `output.globals` 上的变量映射规则去替换代码中的变量。
