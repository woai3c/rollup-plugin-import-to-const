import importToConst from '../index'
import type { OutputOptions } from 'rollup'

test('importToConst', async () => {
    const sourceCode = `
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ElInput } from 'element-plus'
`

const targetCode = `
const { computed, reactive, ref } = Vue;
const { useStore } = Vuex;
const { useRoute } = VueRouter;
const { ElInput } = ElementPlus;
`
    const bundleOptions = {
        'test': { code: sourceCode }
    }

    const outputOptions = {
        globals: {
            vue: 'Vue',
            'element-plus': 'ElementPlus',
            vuex: 'Vuex',
            'vue-router': 'VueRouter'
        }
    }
    
    await importToConst().generateBundle(outputOptions as OutputOptions, bundleOptions as any)
    expect(bundleOptions.test.code).toBe(targetCode)
})
