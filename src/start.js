const config = require("../babel.config");
require("@babel/register")(config);
const { app } = require("./index.js");
const { logger } = require("./libs");

const PORT = 3500;

app.listen(PORT, () => logger.info(`Running on http://localhost:${PORT}`));

module.exports = require("./index.js");
