module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      },
    },
  },
};
