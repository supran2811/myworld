
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const responseTime = require('response-time');

const logger = require('./utils/logger');

//// configure mongo

/// Initialise the express server
const app = express();
app.use(bodyParser.json());
app.use(compression());

app.use(morgan('tiny'));

app.use(
    responseTime((_req, res, time) => {
        res.setHeader('X-Response-Time', time.toFixed(2) + 'ms');
    })
);

/// setting up routes for the app.
const routes = require("./routes");
routes.forEach(r => {
    r(app);
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        logger.printLog("info", `App is running on port ${PORT}`);
    });
}

module.exports = app;