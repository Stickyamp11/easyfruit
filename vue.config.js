
// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // options...
  devServer: {
    proxy: 'http://localhost:3000'
  }
})