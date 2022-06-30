module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/zti/' : '/',

  pwa: {
    themeColor: '#FF4444',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#000000',
    },
  },
}
