
const express = require('express');
var compression = require('compression');
const bodyParser = require('body-parser');

const logger = require('./utils/logger');

//// configure mongo

/// Initialise the express server
const app = express();
app.use(bodyParser.json());
app.use(compression());

/// setting up routes for the app.
const routes = require("./routes");
routes.forEach(r => {
    r(app);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    logger.printLog("info" , `App is running on port ${PORT}`);
});