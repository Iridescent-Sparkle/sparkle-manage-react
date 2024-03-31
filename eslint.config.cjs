const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  react: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
