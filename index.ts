import type { OutputOptions, OutputBundle } from 'rollup'
import { parse } from 'acorn'
import MagicString from 'magic-string'

export default function importToConst() {
    return {
        name: 'import-to-const',
        async generateBundle(options: OutputOptions, bundle: OutputBundle) {
            const globalDep = (options.globals || {}) as Record<string, string>
            if (!Object.keys(globalDep).length) return

            Object.values(bundle).forEach((data) => {
                const { code } = data as { code: string }
                const ast = parse(code, {
                    ecmaVersion: 'latest',
                    sourceType: 'module',
                })

                const magicString = new MagicString(code)

                // 遍历 AST，查找 ImportDeclaration 节点
                // @ts-ignore
                ast.body.forEach((node) => {
                    if (node.type === 'ImportDeclaration') {
                        const { source, specifiers, start, end } = node
                        const { value } = source
                        let replaceValue = ''

                        if (!globalDep[value]) return

                        // 找到需要外部化的依赖，将其替换为全局变量
                        replaceValue = globalDep[value]

                        // 将 import { computed } from 'vue'; 替换为 const { computed } = Vue;
                        if (specifiers.length > 0) {
                            if (specifiers.length === 1 && specifiers[0].local.name === replaceValue) {
                                return magicString.overwrite(start, end, '')
                            }

                            const requireStatement = `const { ${specifiers
                                .map((specifier: { imported: { name: any } }) => {
                                    if (specifier.imported?.name === replaceValue) return ''
                                    return specifier.imported?.name
                                })
                                .filter(Boolean)
                                .join(', ')} } = ${replaceValue};`

                            magicString.overwrite(start, end, requireStatement)
                        }
                    }
                })

                // @ts-ignore
                data.code = magicString.toString()
            })
        },
    }
}
