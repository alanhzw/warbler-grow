
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //使用 JavaScript ES6，添加了一种新的语法，用于从数组索引或对象属性创建变量，称为解构。此规则强制使用解构而不是通过成员表达式访问属性。
    'prefer-destructuring': 'warn',
    // 嵌套三元表达式会使代码更难理解。
    'no-nested-ternary': 'warn',
    // 此规则可以帮助您查找由变量和参数名称拼写错误或意外隐式全局变量（例如，var在for循环初始值设定项中遗忘关键字）导致的潜在ReferenceErrors 。
    'no-undef': 'warn',
    // 阴影是局部变量与其包含范围内的变量共享相同名称的过程
    'no-shadow': 'warn',
    // 如果一个if陈述是该else块中唯一的陈述，那么使用一个else if表格通常会更清晰。
    'no-lonely-if': 'warn',
    // 空块语句虽然不是技术上的错误，但通常是由于未完成的重构而发生的。阅读代码时会造成混淆。
    'no-empty': 'warn',
    // 在代码中任何地方声明和不使用的变量很可能是由于重构不完全导致的错误。这些变量在代码中占用空间，可能会导致读者混淆。
    'no-unused-vars': 'warn',
    // 赋值给声明为函数参数的变量可能会引起误解，并导致混淆行为，因为修改函数参数也会使arguments对象变异。通常，对函数参数的赋值是意想不到的，并且指示错误或程序员错误。
    'no-param-reassign': 'warn',
    //在 Node.js 中，使用该require()函数包含模块依赖关系，例如：
    //
    // var fs = require("fs");
    // 尽管require()可以在代码中的任何地方调用，但某些样式指南规定应该仅在模块的顶层调用它，以便更容易地识别依赖关系。例如，当它们深深嵌套在函数和其他语句中时，很难确定依赖关系：
    //
    // function foo() {
    //
    //     if (condition) {
    //         var fs = require("fs");
    //     }
    // }
    // 由于require()做了同步加载，因此在其他位置使用时可能会导致性能问题。
    //
    // 此外，ES6 模块强制要求import和export声明只能出现在模块主体的顶层。
    'global-require': 'warn',
    // 组件导入的顺序，mix以后这个需要关闭
    'import/order': 'warn',
    // 任何语言的非常长的代码行都很难阅读。为了提高可读性和可维护性，许多编码人员已经制定了将代码行限制为 X 个字符（传统上为80个字符）的约定
    'max-len': 'warn',
    // 使用类型安全的相等运算符===而!==不是常规对==等运算符被认为是好的做法!=。
    // 这样做的原因是，==和!=做强制类型转换后面的相当晦涩抽象平等比较算法。
    eqeqeq: 'warn',
    camelcase: 'warn',
    radix: 'warn',
    'import/no-named-as-default': 'warn',
    'vue/no-parsing-error': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'no-plusplus': 'warn',
    'no-useless-concat': 'warn',
    'no-return-assign': 'warn',
    'no-return-await': 'warn',
    'no-restricted-syntax': 'warn',
    'no-restricted-globals': 'warn',
    'guard-for-in': 'warn',
    'no-useless-escape': 'warn',
    'consistent-return': 'warn',
    'import/first': 'warn',
    'no-mixed-operators': 'warn',
    'import/extensions': 'warn',
    "space-before-function-paren": 0,
    'linebreak-style': 0,
  },
};
