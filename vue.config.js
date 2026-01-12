process.env.VUE_APP_TITLE = require('./conf/app').app.title;

const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '/assets': path.resolve(__dirname, 'public/assets')
      }
    }
  }
});
