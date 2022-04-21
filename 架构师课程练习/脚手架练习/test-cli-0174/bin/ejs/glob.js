const glob = require('glob')

glob('**/*.js', {
  ignore: ['node_modules/**', 'webpack.config.js']
}, (err, file) => {
  console.log('🚀🚀 ~ err', err);
  console.log('🚀🚀 ~ file', file);
})