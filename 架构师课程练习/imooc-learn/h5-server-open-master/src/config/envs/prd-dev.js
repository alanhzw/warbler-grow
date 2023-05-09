const devConf = require('./dev')

Object.assign(devConf.redisConf, {
  host: 'docker-host',
  port: '6378'
})

Object.assign(devConf.mongodbConf, {
  host: 'docker-host',
  port: '27016'
})

Object.assign(devConf.mysqlConfig, {
  host: 'docker-host',
  port: '3305'
})
module.exports = devConf