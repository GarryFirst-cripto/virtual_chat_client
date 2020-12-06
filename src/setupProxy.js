const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
      ["/users", "/posts", "/avatars"],
      { target: "http://VirtualChatServer-env.eba-6nfgqbpb.us-east-2.elasticbeanstalk.com", changeOrigin: true }
    )
  );
};