// 注册全局组件与指令
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// import kebabCase from 'lodash/kebabCase'

const requireComponent = require.context(
  // 组件目录的相对路径
  '../components/core',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式 //Base
  /[A-Z]\w+\.(vue|js)$/
)

export default ({ app, router, Vue }) => {
  // 注册组件
  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名
    // 移除名称末尾的 Component
    const componentName = upperFirst(
      camelCase(
        // 剥去文件名开头的 `'./` 和结尾的扩展名
        fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
      )
    ).replace('Component', '')
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    let componentDef = componentConfig.default || componentConfig
    // 全局注册组件
    Vue.component(
      componentName,
      componentDef
    )
  })
}
