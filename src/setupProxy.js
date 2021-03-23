const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
      ["/users", "/posts", "/avatars"],
      { target: "https://virtual-chat-server.herokuapp.com", changeOrigin: true }
    )
  );
};