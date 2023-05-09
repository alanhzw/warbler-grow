module.exports = {
  // eslintrc.js 文件所在的目录为 root 目录
  // eslint 规则将对这个目录以及该目录下的所有文件起作用
  root: true,
  // 让 Vue3.2 中的这些全局函数能正常使用
  globals: {
    defineProps: 'readonly',
    defineExpose: 'readonly',
    defineEmits: 'readonly',
    withDefaults: 'readonly',
  },
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  // 继承别人写好的规则
  extends: ['plugin:vue/vue3-essential', 'standard-with-typescript'],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
  },
  // 插件的作用是对规则进行补充
  plugins: ['vue'],
  // 自定义的规则, 重写继承的规则
  rules: {
    // 关闭函数名后面必须有空格的验证
    'space-before-function-paren': 0,
    // 关闭强制不变的变量使用 const, 因为自动格式化 有时候会把 let 变成 const
    'perfer-const': 0,
    // 允许行尾分号
    semi: 0,
    // 允许尾后逗号
    'comma-dangle': 0,
  },
};
