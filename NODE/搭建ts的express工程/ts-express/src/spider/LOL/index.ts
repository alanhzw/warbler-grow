/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-10 15:41:55
 * @LastEditTime: 2021-09-10 16:25:32
 * @FilePath: \ts-express\src\spider\LOL\index.ts
 */

const axios = require('axios')
const cheerio = require('cheerio')
const download = require('download')
const superagent = require('superagent')

const targetUrl = 'https://pvp.qq.com/web201605/wallpaper.shtml###'
module.exports = async () => {
  superagent
    .get(targetUrl)
    .then((superagentRes) => {
      console.log('🚀🚀~ superagentRes:', superagentRes.text)
      const $ = cheerio.load(superagentRes.text)
      const title = $('.p_newhero_item').attr('src')
      console.log('🚀🚀~ title:', title)
    })
    .catch((error) => {
      console.log('🚀🚀~ error:', error)
    })
}
export {}
