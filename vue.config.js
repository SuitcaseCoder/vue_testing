module.exports = {
  devServer: {
    proxy: {
      "^/api":
       {
        target: "https://api.github.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" },
        secure: false
      },
    },
  },
};


// I think I need to create an /edit endpoint that gets called whenever the edit button gets clicked BEFFORE the editContent function gets called. 
// "/edit": {
//   "target": 'https://github.com', // for example
//   "pathRewrite": { '^/login': '' },
//   "changeOrigin": true,
//   "secure": false
//   },

