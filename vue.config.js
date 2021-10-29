module.exports = {
  devServer: {
    proxy: {
      "^/api":
       {
        target: "https://api.github.com",
        // target: "https://jsonplaceholder.typicode.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
      },
    },
  },
};
