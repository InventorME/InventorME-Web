const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use("/api",
        createProxyMiddleware({ target: "https://3cv3j619jg.execute-api.us-east-2.amazonaws.com/test/inventorme-items" })
    );
};