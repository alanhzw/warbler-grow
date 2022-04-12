/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-03-22 15:45:50
 * @LastEditTime: 2022-04-12 15:35:08
 * @FilePath: \test-cli-0174\bin\inquirer.js
 */
// const inquirer = require('inquirer');

// const inquirerPrompt = require('inquirer-autocomplete-prompt');
// inquirer.registerPrompt('autocomplete', inquirerPrompt);
// inquirer
//   .prompt([
//     {
//       type: 'confirm',
//       message: '是否单身？',
//       name: 'single',
//       default: true,
//     },
//     {
//       type: 'confirm',
//       message: '是否需要女朋友？',
//       name: 'girl',
//       when: function (answers) {
//         // 当 watch 为 true 的时候才会提问当前问题
//         return answers.single;
//       },
//     },
//   ])
//   .then((answers) => {
//     console.log('🚀🚀 ~ answers', answers);
//   })
//   .catch((error) => {
//     console.log('🚀🚀 ~ error', error);
//   });


const Spinner = require('cli-spinner').Spinner
const spinners = require('cli-spinners')
var spinner = new Spinner('processing.. %s');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏');
spinner.start();