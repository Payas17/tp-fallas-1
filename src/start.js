const config = require("../babel.config");
require("@babel/register")(config);
const { app } = require("./index.js");
const { logger } = require("./libs");

app.listen(3500, () => logger.info("Running on http://localhost:3500"));

module.exports = require("./index.js");
