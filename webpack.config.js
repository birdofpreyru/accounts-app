require('./node_modules/coffee-script/register')
const filter = require('lodash/filter')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin

if (process.env.TRAVIS_BRANCH === 'master') process.env.ENV = 'PROD'
if (process.env.TRAVIS_BRANCH === 'dev') process.env.ENV = 'DEV'
if (process.env.TRAVIS_BRANCH === 'qa') process.env.ENV = 'QA'


if (process.env.ENV === 'DEV') {
  process.env.ZENDESK_DOMAIN = 'topcoder.zendesk.com'
}
else if (process.env.ENV === 'QA') {
  process.env.ZENDESK_DOMAIN = 'topcoder.zendesk.com'
}
else if (process.env.ENV === 'PROD') {
  process.env.ZENDESK_DOMAIN = 'topcoder.zendesk.com'
}
else {
   // for local dev
  process.env.ZENDESK_DOMAIN = 'kohata.zendesk.com'
}

const config = require('appirio-tech-webpack-config')({
  dirname: __dirname,
  entry: {
    app: './app/index'
  },
  template: './app/index.jade',
  favicon: './app/images/favicon.ico'
})

config.plugins = config.plugins.filter( (plugin) => !(plugin instanceof CompressionPlugin) && !(plugin instanceof UglifyJsPlugin) )

console.log(config.plugins)

module.exports = config