module.exports = {
  // eslintrc.js 文件所在的目录为 root 目录
  // eslint 规则将对这个目录以及该目录下的所有文件起作用
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  // 继承别人写好的规则
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    project: ['tsconfig.json'],
  },
  rules: {
    // 关闭函数名后面必须有空格的验证
    '@typescript-eslint/space-before-function-paren': 0,
    // 关闭强制不变的变量使用 const, 因为自动格式化 有时候会把 let 变成 const
    '@typescript-eslint/perfer-const': 0,
    // 允许行尾分号
    semi: 0,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    // 允许尾后逗号
    'comma-dangle': 0,
    '@typescript-eslint/comma-dangle': 0,
    // 允许函数返回值不填写类型
    '@typescript-eslint/explicit-function-return-type': 0,
    // 允许 class 只包含 static 属性
    '@typescript-eslint/no-extraneous-class': 0,
    // 允许使用require
    '@typescript-eslint/no-var-requires': 0,
    // 关闭缩进验证,使用 prittier 的规范
    '@typescript-eslint/indent': 0,
    // 允许 any
    '@typescript-eslint/restrict-template-expressions': 0,
    // 允许出现已经定义却未使用的属性
    '@typescript-eslint/no-unused-vars': 0,
    // 不知道干啥的
    '@typescript-eslint/no-confusing-void-expression': 0,
  },
};
