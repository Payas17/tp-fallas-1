const config = require("../babel.config");
require("@babel/register")(config);
const { app } = require("./index.js");

app.listen(3500, () => console.log("Running on http://localhost:3500"));

module.exports = require("./index.js");