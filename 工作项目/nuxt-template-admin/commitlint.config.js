module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'type-enum': [2, 'always', [
      'feat', // 新增功能
      'fix', // bug修复
      'docs', // 文档更新
      'style', // 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑
      'refactor', // 重构
      'perf', // 性能、体验优化
      'test', // 新增测试代码
      'build', // 构建
      'ci', // 持续集成相关的提交
      'chore', // 构建过程或辅助工具的变动
      'revert', // 回滚
    ]],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
};
