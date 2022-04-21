/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-04-21 14:02:51
 * @LastEditTime: 2022-04-21 15:02:38
 * @FilePath: \warbler-grow\架构师课程练习\脚手架练习\test-cli-0174\bin\ejs\index.js
 */

const ejs = require('ejs')
const path = require('path')


const html = '<div><%= user.name %></div>'

const options = {}
const data = {
  user: {
    name: '一尾流莺'
  }
}
const data2 = {
  user: {
    name: 'yiweiliuying'
  }
}

// 第一种用法

// 返回一个 compile  function , 用来解析 html 中的 ejs 模板
const template = ejs.compile(html, options)

// 得到一个编译后的模板
const compiledTemplate = template(data)
const compiledTemplate2 = template(data2)

// console.log('🚀🚀 ~ compiledTemplate', compiledTemplate);
// console.log('🚀🚀 ~ compiledTemplate2', compiledTemplate2);


// 第二种用法
// 区别是是否需要对同一个模板反复的使用,传入不同的 data
// const renderedTemplate = ejs.render(html, data, options)
// console.log('🚀🚀 ~ renderedTemplate', renderedTemplate);

// 第三种用法

ejs.renderFile(path.resolve(__dirname, 'template.html'), data, options, (err, file) => {
  console.log('🚀🚀 ~ file', file);
})