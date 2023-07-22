import { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const name = 'import-to-const'
const config: RollupOptions = {
    input: 'index.ts',
    output: [
        {
            file: `dist/${name}.mjs`,
            format: 'esm',
        },
        {
            file: `dist/${name}.js`,
            format: 'cjs',
        },
    ],
    plugins: [typescript()],
}

export default config
