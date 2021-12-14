/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-03 14:09:20
 * @LastEditTime: 2020-12-28 14:29:40
 * @FilePath: \SNActivity\babel.config.js
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
};
