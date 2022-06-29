module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/zti/' : '/',

  pwa: {
    themeColor: '#ff4444',
    manifestOptions: {
      background_color: '#FFFFFF',
    },
  },
}
