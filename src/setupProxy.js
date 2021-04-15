const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/api",
        createProxyMiddleware({ target: "https://secret-ocean-49799.herokuapp.com/http://localhost:5000" })
    );
};