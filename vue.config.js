module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/zti/' : '/',

  pwa: {
    themeColor: '#FF4444',
    msTileColor: '#FFFFFF',
    manifestOptions: {
      background_color: '#FFFFFF',
    },
  },
}
